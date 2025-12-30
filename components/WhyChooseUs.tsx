
import React from 'react';

const WhyChooseUs: React.FC = () => {
  const reasons = [
    { title: "Mobile-First Design", desc: "Perfect experience on every screen size." },
    { title: "Blazing Fast Delivery", desc: "We launch your MVP in record time." },
    { title: "Scalable Infrastructure", desc: "Built to handle your growth from 1 to 1M." },
    { title: "Affordable Premium", desc: "Enterprise quality at competitive pricing." }
  ];

  return (
    <section id="why-us" className="py-24 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[150px] opacity-20 -mr-20 -mt-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-4">Value Proposition</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold mb-8">Why Nexus Digital stands out from the rest.</h3>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              We don't just build websites; we build business tools. Our focus is on conversion, security, and long-term performance.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8">
              {reasons.map((r, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">{r.title}</h4>
                    <p className="text-slate-500 text-sm">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative">
             <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
               <img src="https://picsum.photos/seed/agency/800/600" alt="Team Work" className="w-full h-auto" />
             </div>
             <div className="absolute -bottom-8 -left-8 bg-blue-600 p-8 rounded-2xl shadow-xl hidden md:block">
               <p className="text-4xl font-extrabold">10+</p>
               <p className="text-blue-100">Years Industry Expertise</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
