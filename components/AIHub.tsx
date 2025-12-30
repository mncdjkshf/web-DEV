
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';

const AIHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'image' | 'video' | 'chat'>('image');
  
  // Image Generation State
  const [imagePrompt, setImagePrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');

  // Video Generation State
  const [videoPrompt, setVideoPrompt] = useState('');
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [vAspectRatio, setVAspectRatio] = useState<'16:9' | '9:16'>('16:9');

  // Chat/Thinking State
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: string, text: string}[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleGenerateImage = async () => {
    if (!imagePrompt) return;
    setIsGeneratingImg(true);
    try {
      const img = await geminiService.generateImage(imagePrompt, aspectRatio, imageSize);
      setGeneratedImage(img);
    } catch (e) {
      console.error(e);
      alert("Failed to generate image. Please ensure you have selected an API key if required.");
    } finally {
      setIsGeneratingImg(false);
    }
  };

  const handleGenerateVideo = async () => {
    if (!videoPrompt) return;
    setIsGeneratingVideo(true);
    try {
      // Check for API key logic as per guidelines for Veo
      if (typeof (window as any).aistudio?.hasSelectedApiKey === 'function') {
        const hasKey = await (window as any).aistudio.hasSelectedApiKey();
        if (!hasKey) {
          await (window as any).aistudio.openSelectKey();
        }
      }
      const vid = await geminiService.generateVideo(videoPrompt, vAspectRatio);
      setGeneratedVideo(vid);
    } catch (e) {
      console.error(e);
      alert("Video generation failed or was cancelled.");
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  const handleSendMessage = async () => {
    if (!chatMessage) return;
    const userMsg = chatMessage;
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatMessage('');
    setIsThinking(true);
    
    try {
      const chat = await geminiService.startChatWithThinking();
      const response = await chat.sendMessage({ message: userMsg });
      setChatHistory(prev => [...prev, { role: 'model', text: response.text || '' }]);
    } catch (e) {
      console.error(e);
      setChatHistory(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error while processing that." }]);
    } finally {
      setIsThinking(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isThinking]);

  return (
    <section id="ai-lab" className="py-24 bg-slate-50 border-y border-slate-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4">Innovation Lab</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold mb-6">Experience Tomorrow's Tech Today</h3>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Nexus Digital integrates state-of-the-art AI into every workflow. Try our interactive tools powered by Gemini 3 and Veo.
          </p>
        </div>

        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden min-h-[600px] flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="md:w-64 bg-slate-900 text-white p-6 flex flex-col gap-2">
            <button 
              onClick={() => setActiveTab('image')}
              className={`flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'image' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              <i className="fas fa-image"></i> Image Engine
            </button>
            <button 
              onClick={() => setActiveTab('video')}
              className={`flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'video' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              <i className="fas fa-video"></i> Video Studio
            </button>
            <button 
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'chat' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              <i className="fas fa-brain"></i> Thinking AI
            </button>
            <div className="mt-auto p-4 bg-slate-800 rounded-xl text-xs text-slate-400">
              <p>Built with Google Gemini 3 Pro and Veo 3.1</p>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-8 bg-slate-50/50">
            {activeTab === 'image' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-2 text-xl font-bold mb-4">
                  <i className="fas fa-wand-magic-sparkles text-blue-600"></i>
                  <h4>Gemini 3 Pro Image Generation</h4>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <textarea 
                      value={imagePrompt}
                      onChange={(e) => setImagePrompt(e.target.value)}
                      placeholder="A futuristic digital agency office in the style of cyberpunk architecture, cinematic lighting, 8k resolution..."
                      className="w-full h-32 p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 ring-blue-500 focus:outline-none resize-none"
                    />
                    <div className="flex flex-wrap gap-4">
                      <div className="flex-1">
                        <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Aspect Ratio</label>
                        <select 
                          value={aspectRatio}
                          onChange={(e) => setAspectRatio(e.target.value)}
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm"
                        >
                          <option>1:1</option><option>3:4</option><option>4:3</option><option>9:16</option><option>16:9</option>
                        </select>
                      </div>
                      <div className="flex-1">
                        <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Quality</label>
                        <select 
                          value={imageSize}
                          onChange={(e) => setImageSize(e.target.value as any)}
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm"
                        >
                          <option value="1K">Standard (1K)</option>
                          <option value="2K">High (2K)</option>
                          <option value="4K">Ultra (4K)</option>
                        </select>
                      </div>
                    </div>
                    <button 
                      onClick={handleGenerateImage}
                      disabled={isGeneratingImg || !imagePrompt}
                      className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg active:scale-95"
                    >
                      {isGeneratingImg ? <><i className="fas fa-spinner fa-spin mr-2"></i> Generating...</> : 'Create Image'}
                    </button>
                  </div>
                  <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center overflow-hidden aspect-square">
                    {generatedImage ? (
                      <img src={generatedImage} alt="Generated" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-8 text-slate-400">
                        <i className="far fa-image text-4xl mb-4"></i>
                        <p>Your generated masterpiece will appear here.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'video' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-2 text-xl font-bold mb-4">
                  <i className="fas fa-film text-blue-600"></i>
                  <h4>Veo Video Generation</h4>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <textarea 
                      value={videoPrompt}
                      onChange={(e) => setVideoPrompt(e.target.value)}
                      placeholder="A high-speed drone shot flying through a neon-lit futuristic city with flying cars and holographic ads..."
                      className="w-full h-32 p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 ring-blue-500 focus:outline-none resize-none"
                    />
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Orientation</label>
                      <div className="flex gap-4">
                        <button 
                          onClick={() => setVAspectRatio('16:9')}
                          className={`flex-1 py-2 px-4 rounded-lg border transition-all ${vAspectRatio === '16:9' ? 'bg-blue-100 border-blue-600 text-blue-700 font-bold' : 'bg-white border-slate-200 text-slate-600'}`}
                        >
                          Landscape (16:9)
                        </button>
                        <button 
                          onClick={() => setVAspectRatio('9:16')}
                          className={`flex-1 py-2 px-4 rounded-lg border transition-all ${vAspectRatio === '9:16' ? 'bg-blue-100 border-blue-600 text-blue-700 font-bold' : 'bg-white border-slate-200 text-slate-600'}`}
                        >
                          Portrait (9:16)
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={handleGenerateVideo}
                      disabled={isGeneratingVideo || !videoPrompt}
                      className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg"
                    >
                      {isGeneratingVideo ? <><i className="fas fa-spinner fa-spin mr-2"></i> Processing (can take minutes)...</> : 'Generate Video'}
                    </button>
                  </div>
                  <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center overflow-hidden aspect-video">
                    {generatedVideo ? (
                      <video src={generatedVideo} controls className="w-full h-full" />
                    ) : (
                      <div className="text-center p-8 text-slate-400">
                        <i className="fas fa-clapperboard text-4xl mb-4"></i>
                        <p>High-quality video preview.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'chat' && (
              <div className="flex flex-col h-[500px] animate-fade-in">
                <div className="flex items-center gap-2 text-xl font-bold mb-4">
                  <i className="fas fa-brain text-blue-600"></i>
                  <h4>Strategic Thinking AI</h4>
                </div>
                <div className="flex-1 overflow-y-auto bg-white border border-slate-200 rounded-2xl p-4 mb-4 space-y-4">
                  {chatHistory.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400">
                      <i className="fas fa-comments text-4xl mb-4"></i>
                      <p>Ask about project strategy, tech stacks, or complex logic.</p>
                    </div>
                  )}
                  {chatHistory.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-4 rounded-2xl ${m.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'}`}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {isThinking && (
                    <div className="flex justify-start">
                      <div className="bg-blue-50 text-blue-700 p-4 rounded-2xl italic flex items-center gap-3">
                        <i className="fas fa-cog fa-spin"></i> Analyzing project complexity and formulating response...
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Describe your complex technical challenge..."
                    className="flex-1 p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 ring-blue-500 focus:outline-none"
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={isThinking || !chatMessage}
                    className="p-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg px-6"
                  >
                    <i className="fas fa-paper-plane"></i>
                  </button>
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
