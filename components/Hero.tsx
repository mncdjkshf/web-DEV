
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden bg-white">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-[60%] h-[70%] bg-gradient-to-br from-blue-50/50 to-purple-50/50 blur-3xl -z-10 rounded-full translate-x-1/3 -translate-y-1/4"></div>
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-3/5 text-left z-10">
            <div className="inline-flex items-center space-x-3 px-4 py-1.5 bg-blue-50/80 border border-blue-100 rounded-full mb-8 animate-reveal">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">Digital Evolution 2024</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[0.95] text-slate-900 animate-reveal" style={{ animationDelay: '0.1s' }}>
              Websites that <br />
              <span className="gradient-text italic">Work</span> harder <br />
              than you do.
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-xl leading-relaxed animate-reveal" style={{ animationDelay: '0.2s' }}>
              Stop settling for basic. We engineer conversion-focused digital platforms infused with frontier AI that turn visitors into lifelong fans.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 animate-reveal" style={{ animationDelay: '0.3s' }}>
              <a href="#contact" className="btn-hover-effect flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg">
                Let's Talk Business <i className="fas fa-arrow-right text-sm"></i>
              </a>
              <a href="#ai-lab" className="btn-hover-effect flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold text-lg hover:border-blue-600">
                <i className="fas fa-microchip text-blue-600"></i> Try AI Demo
              </a>
            </div>

            <div className="mt-12 flex items-center gap-6 animate-reveal" style={{ animationDelay: '0.4s' }}>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} className="w-10 h-10 rounded-full border-2 border-white" src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                ))}
              </div>
              <div className="text-sm">
                <p className="font-bold text-slate-900">500+ Projects Launched</p>
                <div className="flex text-yellow-400 text-[10px] gap-0.5">
                  {[1, 2, 3, 4, 5].map(i => <i key={i} className="fas fa-star"></i>)}
                  <span className="text-slate-400 ml-1 font-medium">Verified Reviews</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-2/5 relative animate-reveal hidden lg:block" style={{ animationDelay: '0.4s' }}>
            <div className="relative">
              {/* Abstract Glass Card Display */}
              <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white/50 relative z-10 floating">
                <div className="flex justify-between items-start mb-8">
                  <div className="space-y-2">
                    <div className="w-32 h-3 bg-blue-100 rounded-full"></div>
                    <div className="w-20 h-3 bg-slate-50 rounded-full"></div>
                  </div>
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
                    <i className="fas fa-chart-line"></i>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-48 bg-slate-50/50 rounded-3xl flex items-center justify-center overflow-hidden border border-slate-100">
                     <div className="grid grid-cols-5 items-end gap-2 px-4 w-full h-32">
                        {[40, 70, 55, 90, 65].map((h, i) => (
                          <div key={i} className="bg-blue-600/20 rounded-t-lg transition-all duration-1000" style={{ height: `${h}%` }}></div>
                        ))}
                     </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1 h-10 bg-slate-100 rounded-xl"></div>
                    <div className="w-10 h-10 bg-slate-900 rounded-xl"></div>
                  </div>
                </div>
              </div>
              
              {/* Accent Elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-500 rounded-full mix-blend-multiply opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="text-[10px] font-bold uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-slate-900 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
