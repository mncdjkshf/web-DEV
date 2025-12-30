
import React from 'react';

const ContactForm: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-[40px] shadow-2xl shadow-slate-200 overflow-hidden flex flex-col lg:flex-row">
          <div className="lg:w-1/3 bg-blue-600 p-12 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-white">Let's start your project.</h3>
              <p className="text-blue-100 mb-10 leading-relaxed">
                Ready to build something amazing? Fill out the form and our team will get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <span>hello@nexusdigital.agency</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <i className="fas fa-phone"></i>
                  </div>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <i className="fas fa-location-dot"></i>
                  </div>
                  <span>Silicon Valley, CA</span>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              <a href="#" className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-white hover:text-blue-600 transition-all"><i className="fab fa-twitter"></i></a>
              <a href="#" className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-white hover:text-blue-600 transition-all"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-white hover:text-blue-600 transition-all"><i className="fab fa-instagram"></i></a>
            </div>
          </div>

          <div className="lg:w-2/3 p-8 md:p-12 relative min-h-[600px]">
            {/* Embedded Google Form */}
            <iframe 
              src="https://docs.google.com/forms/d/e/1FAIpQLSe-XyG99y17NToz2iN3rM_t5_Vf_pE8k8r7M8k_g-h5r5M-5A/viewform?embedded=true" 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              marginHeight={0} 
              marginWidth={0}
              className="absolute inset-0 w-full h-full"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
