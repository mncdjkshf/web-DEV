
import React from 'react';

const serviceData = [
  {
    title: "Web Design & Development",
    description: "Stunning, high-performance websites built with the latest technologies like React, Next.js, and Tailwind.",
    icon: "fa-laptop-code"
  },
  {
    title: "Full-Stack Applications",
    description: "Robust, enterprise-grade web applications with secure backends and scalable cloud infrastructure.",
    icon: "fa-layer-group"
  },
  {
    title: "E-commerce Solutions",
    description: "Custom online stores that drive conversions, featuring seamless payments and inventory management.",
    icon: "fa-cart-shopping"
  },
  {
    title: "UI/UX Design",
    description: "User-centric designs that prioritize intuitive navigation and aesthetic appeal to keep users engaged.",
    icon: "fa-pen-nib"
  },
  {
    title: "Website Maintenance",
    description: "Continuous monitoring, updates, and security patches to ensure your site stays fresh and protected.",
    icon: "fa-shield-halved"
  },
  {
    title: "SEO Optimization",
    description: "Strategic search engine optimization to boost your visibility and bring more organic traffic to your business.",
    icon: "fa-arrow-trend-up"
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4">Our Expertise</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold mb-6">World-Class Web Solutions</h3>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            We provide comprehensive digital services to help businesses scale and succeed in the modern digital landscape.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceData.map((service, index) => (
            <div key={index} className="group p-8 border border-slate-100 rounded-3xl hover:bg-blue-50 hover:border-blue-100 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-100">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <i className={`fas ${service.icon} text-2xl`}></i>
              </div>
              <h4 className="text-xl font-bold mb-4">{service.title}</h4>
              <p className="text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
