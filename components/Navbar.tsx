
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#portfolio' },
    { label: 'AI Lab', href: '#ai-lab' },
    { label: 'Process', href: '#process' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? 'glass py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center space-x-3 group">
          <div className="relative w-10 h-10 md:w-12 md:h-12">
             <svg viewBox="0 0 100 100" className="w-full h-full transform transition-transform duration-500 group-hover:rotate-12">
               <defs>
                 <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                   <stop offset="0%" stopColor="#3b82f6" />
                   <stop offset="100%" stopColor="#8b5cf6" />
                 </linearGradient>
               </defs>
               <path d="M20,20 L80,20 L80,80 L20,80 Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-200" />
               <rect x="30" y="30" width="40" height="40" rx="10" className="logo-gradient shadow-lg" />
               <path d="M50,15 L50,30 M85,50 L70,50 M50,85 L50,70 M15,50 L30,50" stroke="url(#logo-grad)" strokeWidth="4" strokeLinecap="round" />
             </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tighter leading-none text-slate-900">NEXUS</span>
            <span className="text-[10px] font-bold tracking-[0.4em] text-blue-600 uppercase">Studio</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="group relative text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-[0.2em]">
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a href="#contact" className="px-6 py-2.5 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-slate-100 hover:shadow-blue-100">
            Start Project
          </a>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-2xl text-slate-900 p-2">
          <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars-staggered'}`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 transition-all duration-500 overflow-hidden ${mobileMenuOpen ? 'max-h-[500px] py-8 px-6 shadow-2xl' : 'max-h-0 py-0 opacity-0'}`}>
         <div className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-black text-slate-900 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="w-full py-4 bg-slate-900 text-white rounded-2xl text-center font-bold text-lg">
              Get Started
            </a>
         </div>
      </div>
    </nav>
  );
};

export default Navbar;
