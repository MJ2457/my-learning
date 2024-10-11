import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-bold mb-2">Learning Funnel</h3>
            <p className="text-sm">Empowering your learning journey.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-md font-semibold mb-2">Quick Links</h4>
            <ul className="text-sm">
              <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
              <li><Link to="/about" className="hover:text-gray-300">About</Link></li>
              <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-md font-semibold mb-2">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                Twitter
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                LinkedIn
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                GitHub
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; {currentYear} Learning Funnel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
