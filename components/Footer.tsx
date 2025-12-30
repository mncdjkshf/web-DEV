
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <i className="fas fa-bolt text-white text-sm"></i>
              </div>
              <span className="text-xl font-bold tracking-tight">NEXUS <span className="text-blue-600">DIGITAL</span></span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              We create digital masterpieces that help businesses thrive in the digital era. Innovation, excellence, and speed are our core values.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Services</h4>
            <ul className="space-y-4 text-slate-500">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Web Design</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Full-Stack Development</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">E-commerce Solutions</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">SEO & Performance</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-4 text-slate-500">
              <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Our Process</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Subscribe</h4>
            <p className="text-slate-500 mb-6 text-sm">Get the latest digital trends in your inbox.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email address" className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-600" />
              <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-all"><i className="fas fa-paper-plane"></i></button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-sm">© 2024 Nexus Digital Agency. All rights reserved.</p>
          <div className="flex gap-8 text-sm text-slate-400">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
