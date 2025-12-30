
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-400 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 text-center max-w-5xl">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-sm font-medium mb-8 animate-fade-in">
          <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
          <span>Next-Generation Digital Agency</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
          Professional Website <br />
          <span className="gradient-text">Development Services</span> <br />
          for Growing Businesses
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          We build fast, secure, and scalable digital solutions that drive results. From bespoke web apps to AI-powered platforms, our expert team transforms your vision into a digital masterpiece.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-xl shadow-blue-200 transition-all hover:-translate-y-1 active:scale-95">
            Get a Free Quote
          </a>
          <a href="#services" className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 hover:border-blue-600 text-slate-800 rounded-xl font-bold text-lg transition-all hover:bg-slate-50 active:scale-95">
            Explore Services
          </a>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold">100+</span>
            <span className="text-sm">Projects Delivered</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold">99.9%</span>
            <span className="text-sm">Uptime Guarantee</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold">24/7</span>
            <span className="text-sm">Expert Support</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold">5.0</span>
            <span className="text-sm">Client Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
