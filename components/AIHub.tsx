
import React, { useState, useRef, useEffect } from 'react';
import { geminiService, audioUtils } from '../services/geminiService';

const AIHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'image' | 'video' | 'chat' | 'voice'>('image');
  
  // Audio Refs for Live
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const liveSessionRef = useRef<any>(null);
  const [isLive, setIsLive] = useState(false);

  // States
  const [imagePrompt, setImagePrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);
  const [videoPrompt, setVideoPrompt] = useState('');
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [chatHistory, setChatHistory] = useState<{role: string, text: string}[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const startLiveConsultation = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const inputContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });

      const sessionPromise = geminiService.connectLive({
        onopen: () => {
          setIsLive(true);
          const source = inputContext.createMediaStreamSource(stream);
          const processor = inputContext.createScriptProcessor(4096, 1, 1);
          processor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const pcmBlob = audioUtils.createBlob(inputData);
            sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
          };
          source.connect(processor);
          processor.connect(inputContext.destination);
        },
        onmessage: async (msg: any) => {
          const base64 = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
          if (base64 && audioContextRef.current) {
            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioContextRef.current.currentTime);
            const buffer = await audioUtils.decodeAudioData(audioUtils.decode(base64), audioContextRef.current, 24000, 1);
            const source = audioContextRef.current.createBufferSource();
            source.buffer = buffer;
            source.connect(audioContextRef.current.destination);
            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += buffer.duration;
            sourcesRef.current.add(source);
          }
          if (msg.serverContent?.interrupted) {
            sourcesRef.current.forEach(s => s.stop());
            sourcesRef.current.clear();
          }
        },
        onerror: (e) => console.error("Live Error:", e),
        onclose: () => setIsLive(false)
      });
      liveSessionRef.current = await sessionPromise;
    } catch (e) {
      console.error(e);
      alert("Could not start microphone session.");
    }
  };

  const stopLiveConsultation = () => {
    setIsLive(false);
    // Cleanup nodes
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
  };

  const handleGenerateImage = async () => {
    if (!imagePrompt) return;
    setIsGeneratingImg(true);
    setGeneratedImage(null);
    try {
      const img = await geminiService.generateImage(imagePrompt);
      setGeneratedImage(img);
    } catch (e) {
      alert("Something went wrong. Please check your prompt or API status.");
    } finally {
      setIsGeneratingImg(false);
    }
  };

  const handleSendMessage = async () => {
    if (!chatMessage) return;
    const msg = chatMessage;
    setChatMessage('');
    setChatHistory(p => [...p, { role: 'user', text: msg }]);
    setIsThinking(true);
    try {
      const chat = await geminiService.startChatWithThinking();
      const resp = await chat.sendMessage({ message: msg });
      setChatHistory(p => [...p, { role: 'model', text: resp.text || '' }]);
    } catch (e) {
      setChatHistory(p => [...p, { role: 'model', text: "I'm having trouble thinking right now. Let's try again in a second." }]);
    } finally {
      setIsThinking(false);
    }
  };

  const quickPrompts = [
    "Modern tech landing page layout",
    "Futuristic mobile app dashboard",
    "Creative agency portfolio concept",
    "Cyberpunk SaaS interface"
  ];

  return (
    <section id="ai-lab" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest rounded-full mb-4">Interactive Demo</div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Experience Our Innovation Lab</h2>
          <p className="text-lg text-slate-500">Test drive the same AI engines we integrate into our client projects. Experience real-time strategy, design, and motion.</p>
        </div>

        <div className="max-w-6xl mx-auto bg-[#f8fafc] rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl flex flex-col lg:flex-row min-h-[700px]">
          {/* Sidebar - Mobile Responsive */}
          <div className="lg:w-80 bg-slate-900 p-8 flex flex-col gap-2">
            <h4 className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-6 px-4">AI Capabilities</h4>
            {[
              { id: 'image', icon: 'fa-wand-sparkles', label: 'Design Engine', desc: 'Concept art & layouts' },
              { id: 'video', icon: 'fa-film', label: 'Motion Studio', desc: 'AI-generated clips' },
              { id: 'chat', icon: 'fa-brain', label: 'Strategic AI', desc: 'Thinking model' },
              { id: 'voice', icon: 'fa-microphone', label: 'Voice Brainstorm', desc: 'Real-time consult' },
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`group flex items-center gap-4 p-5 rounded-2xl transition-all text-left ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${activeTab === tab.id ? 'bg-white/20' : 'bg-slate-800 group-hover:bg-slate-700'}`}>
                  <i className={`fas ${tab.icon} text-lg`}></i>
                </div>
                <div>
                  <div className="font-bold text-sm">{tab.label}</div>
                  <div className={`text-[10px] opacity-60 ${activeTab === tab.id ? 'text-white' : 'text-slate-500'}`}>{tab.desc}</div>
                </div>
              </button>
            ))}
            
            <div className="mt-auto p-6 bg-slate-800/50 rounded-3xl border border-slate-700/50">
               <div className="flex items-center gap-3 mb-3">
                 <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                   <i className="fas fa-info-circle text-blue-400 text-xs"></i>
                 </div>
                 <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Quick Tip</span>
               </div>
               <p className="text-[11px] text-slate-500 leading-relaxed">
                 Use the design engine to visualize your next landing page. Try prompt: "High-end luxury car dealership UI".
               </p>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 md:p-12 bg-white relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 overflow-hidden">
               {(isGeneratingImg || isGeneratingVideo || isThinking) && <div className="h-full bg-blue-600 animate-[pulse_1.5s_infinite]"></div>}
            </div>

            {activeTab === 'image' && (
              <div className="h-full flex flex-col animate-reveal">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-black flex items-center gap-3">
                    Visual Design Engine
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] rounded uppercase font-bold tracking-tighter">Pro 3.0</span>
                  </h3>
                  <button onClick={() => {setImagePrompt(''); setGeneratedImage(null);}} className="text-slate-400 hover:text-red-500 text-sm font-bold transition-colors">Clear</button>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 flex-1">
                  <div className="space-y-6">
                    <div className="relative">
                      <textarea 
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                        placeholder="Describe the mood, layout, and style of your dream website..."
                        className="w-full h-40 p-6 bg-slate-50 border border-slate-100 rounded-[2rem] focus:ring-4 ring-blue-50 focus:outline-none text-slate-700 transition-all resize-none"
                      />
                      {imagePrompt.length > 0 && (
                        <div className="absolute bottom-4 right-6 text-[10px] font-bold text-slate-300 uppercase tracking-widest">Prompt Ready</div>
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3 px-2">Try these ideas</span>
                      <div className="flex flex-wrap gap-2">
                        {quickPrompts.map(qp => (
                          <button key={qp} onClick={() => setImagePrompt(qp)} className="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-slate-100 rounded-full text-xs text-slate-600 transition-all">
                            {qp}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={handleGenerateImage}
                      disabled={isGeneratingImg || !imagePrompt}
                      className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-bold text-lg hover:bg-blue-600 transition-all shadow-xl disabled:opacity-50 group overflow-hidden relative"
                    >
                      <span className="relative z-10">{isGeneratingImg ? 'Rendering Masterpiece...' : 'Generate Design Concept'}</span>
                      {isGeneratingImg && <div className="absolute inset-0 bg-blue-600 animate-pulse"></div>}
                    </button>
                  </div>

                  <div className="bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center relative min-h-[350px]">
                    {isGeneratingImg ? (
                      <div className="text-center">
                        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest animate-pulse">Consulting Pixel Brain...</p>
                      </div>
                    ) : generatedImage ? (
                      <div className="group relative w-full h-full">
                        <img src={generatedImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Generated" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                          <a href={generatedImage} download className="p-4 bg-white rounded-full text-slate-900 hover:scale-110 transition-all"><i className="fas fa-download"></i></a>
                          <button onClick={() => setGeneratedImage(null)} className="p-4 bg-white rounded-full text-red-500 hover:scale-110 transition-all"><i className="fas fa-trash"></i></button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center px-8">
                        <div className="w-20 h-20 bg-white rounded-3xl shadow-lg flex items-center justify-center mx-auto mb-6 text-slate-200 text-3xl">
                          <i className="fas fa-image"></i>
                        </div>
                        <p className="text-slate-500 font-bold mb-2">Visualizer is ready</p>
                        <p className="text-slate-400 text-xs">Type a prompt to generate high-fidelity concepts.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'chat' && (
              <div className="h-full flex flex-col animate-reveal">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-black">AI Strategy Thinking</h3>
                  <button onClick={() => setChatHistory([])} className="text-slate-400 hover:text-red-500 text-sm font-bold transition-colors">Reset Chat</button>
                </div>

                <div className="flex-1 bg-slate-50 rounded-[2rem] border border-slate-100 mb-6 p-6 overflow-y-auto space-y-4 max-h-[450px]">
                  {chatHistory.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center px-12 opacity-40">
                      <i className="fas fa-comments text-5xl mb-6"></i>
                      <p className="text-lg font-bold">Brainstorm your next project</p>
                      <p className="text-sm">Ask about tech stacks, market trends, or user journey optimization.</p>
                    </div>
                  ) : (
                    chatHistory.map((m, i) => (
                      <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-5 rounded-3xl max-w-[85%] text-sm font-medium leading-relaxed ${m.role === 'user' ? 'bg-slate-900 text-white rounded-br-none' : 'bg-white shadow-sm text-slate-800 rounded-bl-none border border-slate-100'}`}>
                          {m.text}
                        </div>
                      </div>
                    ))
                  )}
                  {isThinking && (
                    <div className="flex justify-start">
                      <div className="bg-blue-50 p-5 rounded-3xl rounded-bl-none text-blue-600 text-sm font-bold flex gap-3 items-center border border-blue-100">
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></div>
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                        </div>
                        Synthesizing strategy...
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef}></div>
                </div>

                <div className="flex gap-3">
                  <input 
                    type="text" 
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask a strategic question..."
                    className="flex-1 p-5 bg-slate-50 border border-slate-100 rounded-full focus:outline-none focus:ring-4 ring-blue-50 transition-all font-medium"
                  />
                  <button onClick={handleSendMessage} disabled={!chatMessage || isThinking} className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-50">
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'voice' && (
              <div className="h-full flex flex-col items-center justify-center text-center animate-reveal">
                <div className={`relative mb-12`}>
                   <div className={`w-40 h-40 rounded-full flex items-center justify-center transition-all duration-700 ${isLive ? 'bg-blue-600 scale-110 shadow-[0_0_80px_rgba(59,130,246,0.6)]' : 'bg-slate-100 border-2 border-slate-200'}`}>
                      {isLive ? (
                        <div className="flex items-center gap-1.5">
                           {[1, 2, 3, 4, 5].map(i => (
                             <div key={i} className="w-2 bg-white rounded-full animate-[bounce_1s_infinite]" style={{ height: `${Math.random() * 40 + 20}px`, animationDelay: `${i * 0.1}s` }}></div>
                           ))}
                        </div>
                      ) : (
                        <i className="fas fa-microphone text-5xl text-slate-300"></i>
                      )}
                   </div>
                   {isLive && (
                     <div className="absolute -top-4 -right-4 px-4 py-1.5 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full animate-pulse">
                       Live
                     </div>
                   )}
                </div>

                <div className="max-w-md mx-auto mb-10">
                  <h3 className="text-3xl font-black mb-4">{isLive ? "I'm Listening..." : "Start a Voice Session"}</h3>
                  <p className="text-slate-500 leading-relaxed">
                    {isLive 
                      ? "Describe your project vision aloud. Our AI is analyzing your words and will respond with creative strategy."
                      : "Experience hands-free brainstorming. Talk directly to our strategic AI brain about your digital goals."}
                  </p>
                </div>

                <div className="flex flex-col gap-4 w-full max-w-xs">
                  <button 
                    onClick={isLive ? stopLiveConsultation : startLiveConsultation}
                    className={`group relative overflow-hidden px-10 py-5 rounded-[2rem] font-black text-lg transition-all ${isLive ? 'bg-slate-100 text-slate-600' : 'bg-slate-900 text-white hover:shadow-2xl hover:shadow-blue-200 active:scale-95'}`}
                  >
                    <span className="relative z-10">{isLive ? 'End Consultation' : 'Begin Voice Session'}</span>
                    {!isLive && <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>}
                  </button>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Uses Microphone Permission</p>
                </div>
              </div>
            )}

            {activeTab === 'video' && (
              <div className="h-full flex flex-col animate-reveal">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-black">Motion Graphics Studio</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Server Online</span>
                  </div>
                </div>

                <div className="space-y-6 flex-1">
                  <textarea 
                    value={videoPrompt}
                    onChange={(e) => setVideoPrompt(e.target.value)}
                    placeholder="Describe a cinematic scene (e.g. Floating abstract UI elements with liquid metallic textures)..."
                    className="w-full h-32 p-6 bg-slate-50 border border-slate-100 rounded-[2rem] focus:outline-none focus:ring-4 ring-blue-50 transition-all font-medium text-slate-700 resize-none"
                  />
                  <button 
                    onClick={async () => {
                      if(!videoPrompt) return;
                      setIsGeneratingVideo(true);
                      setGeneratedVideo(null);
                      try {
                        const v = await geminiService.generateVideo(videoPrompt);
                        setGeneratedVideo(v);
                      } catch(e) {
                        alert("Video generation failed. Please try a simpler prompt.");
                      } finally {
                        setIsGeneratingVideo(false);
                      }
                    }}
                    disabled={isGeneratingVideo || !videoPrompt}
                    className="w-full py-5 bg-blue-600 text-white rounded-[1.5rem] font-bold text-lg shadow-xl hover:shadow-blue-200 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isGeneratingVideo ? 'Rendering Creative (May take 2 mins)...' : 'Render High-Quality Video'}
                  </button>

                  <div className="mt-4 bg-slate-900 rounded-[2.5rem] aspect-video overflow-hidden flex items-center justify-center border-8 border-white shadow-2xl group relative">
                    {generatedVideo ? (
                      <video src={generatedVideo} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-8">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 text-white/30 text-2xl">
                          <i className="fas fa-play"></i>
                        </div>
                        <p className="text-white/40 font-bold text-xs uppercase tracking-[0.2em]">Video Preview</p>
                      </div>
                    )}
                    {isGeneratingVideo && (
                      <div className="absolute inset-0 bg-slate-900/80 flex flex-col items-center justify-center text-white p-12 text-center">
                         <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                         <p className="text-sm font-bold uppercase tracking-[0.3em] mb-2 animate-pulse">Computing Light & Motion</p>
                         <p className="text-xs text-slate-500">Frontier Veo engine is crafting your pixels...</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIHub;
