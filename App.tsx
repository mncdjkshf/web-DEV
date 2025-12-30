
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Portfolio from './components/Portfolio';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AIHub from './components/AIHub';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Process Step Section */}
        <section id="process" className="py-24 bg-slate-50 border-t border-slate-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4">Our Workflow</h2>
              <h3 className="text-4xl font-extrabold mb-6">Four Steps to Success</h3>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 relative">
              {/* Connector line for desktop */}
              <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-slate-200 -z-0"></div>
              
              {[
                { step: "01", title: "Discovery", desc: "We gather requirements and understand your business goals." },
                { step: "02", title: "Design & Dev", desc: "Our team crafts the visuals and builds the logic." },
                { step: "03", title: "Testing", desc: "Rigorous quality assurance ensures zero defects." },
                { step: "04", title: "Deployment", desc: "We launch and provide continuous optimization." }
              ].map((s, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center relative z-10 hover:-translate-y-2 transition-transform">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-6">
                    {s.step}
                  </div>
                  <h4 className="font-bold text-xl mb-3">{s.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Services />
        <WhyChooseUs />
        <Portfolio />
        
        {/* Interactive AI Hub Section */}
        <AIHub />
        
        <ContactForm />
      </main>

      <Footer />

      {/* Persistent Call to Action (Floating on mobile) */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <a href="#contact" className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl animate-bounce">
          <i className="fas fa-comment-dots text-xl"></i>
        </a>
      </div>
    </div>
  );
}

export default App;
