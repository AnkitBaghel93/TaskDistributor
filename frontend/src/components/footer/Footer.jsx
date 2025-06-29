import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
   const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll smoothly to top
  };
  return (
    <footer className="bg-gradient-to-r from-blue-800 via-blue-900 to-purple-900 text-white py-10 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">CSTech InfoSolutions</h2>
          <p className="text-sm leading-6">
            Empowering productivity through automation and smart task distribution. We simplify your workflow with intuitive dashboards, real-time updates, and seamless team collaboration.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" onClick={scrollToTop} className="hover:text-blue-300">Home</Link></li>
            <li><Link to="/about-us" onClick={scrollToTop} className="hover:text-blue-300">About Us</Link></li>
            <li><Link to="/add-agent" onClick={scrollToTop} className="hover:text-blue-300">Add Agent</Link></li>
            <li><Link to="/dashboard" onClick={scrollToTop} className="hover:text-blue-300">Dashboard</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="text-sm space-y-2">
            <li>Email: <a href="mailto:info@cstech.com" className="hover:text-blue-300">info@cstech.com</a></li>
            <li>Phone: +91 98765 43210</li>
            <li>Address: Tech Park, New Delhi, India</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-400"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-400"><FaTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-400"><FaLinkedinIn /></a>
            <a href="mailto:info@cstech.com" className="hover:text-blue-400"><FaEnvelope /></a>
          </div>
        </div>
      </div>

      <div className="text-center mt-10 text-sm border-t border-blue-700 pt-4">
        &copy; {new Date().getFullYear()} CSTech InfoSolutions. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
