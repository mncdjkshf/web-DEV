
import React from 'react';

const Portfolio: React.FC = () => {
  const projects = [
    { title: "Fintech Dashboard", category: "Web App", img: "https://picsum.photos/seed/project1/600/400" },
    { title: "Luxury Retail Store", category: "E-commerce", img: "https://picsum.photos/seed/project2/600/400" },
    { title: "HealthTech Platform", category: "SaaS", img: "https://picsum.photos/seed/project3/600/400" },
    { title: "Real Estate Portal", category: "Full-Stack", img: "https://picsum.photos/seed/project4/600/400" },
  ];

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4">Our Work</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold">Featured Projects</h3>
          </div>
          <p className="text-slate-600 max-w-sm">
            Take a look at some of the digital experiences we've crafted for our global clients.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <div key={i} className="group relative rounded-3xl overflow-hidden bg-slate-100 aspect-video">
              <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <span className="text-blue-400 font-semibold mb-2">{p.category}</span>
                <h4 className="text-white text-2xl font-bold">{p.title}</h4>
                <button className="mt-4 text-white flex items-center gap-2 font-medium hover:text-blue-400 transition-colors">
                  View Case Study <i className="fas fa-arrow-right text-sm"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
