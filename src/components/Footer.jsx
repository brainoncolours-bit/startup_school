import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto w-full">
      <div className="max-w-7xl mx-auto px-5 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h3 className="text-2xl mb-5 text-white">🚀 Startup School</h3>
          <p className="text-gray-300 leading-relaxed mb-5">Empowering entrepreneurs to build successful startups</p>
          <div className="flex gap-4">
            <a href="#" aria-label="Twitter" className="text-2xl transition-transform hover:-translate-y-1">🐦</a>
            <a href="#" aria-label="LinkedIn" className="text-2xl transition-transform hover:-translate-y-1">💼</a>
            <a href="#" aria-label="Facebook" className="text-2xl transition-transform hover:-translate-y-1">📘</a>
            <a href="#" aria-label="Instagram" className="text-2xl transition-transform hover:-translate-y-1">📷</a>
          </div>
        </div>

        <div>
          <h4 className="text-xl mb-5 text-white">Quick Links</h4>
          <ul className="list-none p-0">
            <li className="mb-3 text-gray-300"><a href="/" className="text-gray-300 no-underline transition-colors hover:text-indigo-400">Home</a></li>
            <li className="mb-3 text-gray-300"><a href="/about" className="text-gray-300 no-underline transition-colors hover:text-indigo-400">About Us</a></li>
            <li className="mb-3 text-gray-300"><a href="/courses" className="text-gray-300 no-underline transition-colors hover:text-indigo-400">Courses</a></li>
            <li className="mb-3 text-gray-300"><a href="/blog" className="text-gray-300 no-underline transition-colors hover:text-indigo-400">Blog</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl mb-5 text-white">Resources</h4>
          <ul className="list-none p-0">
            <li className="mb-3 text-gray-300"><a href="#" className="text-gray-300 no-underline transition-colors hover:text-indigo-400">Documentation</a></li>
            <li className="mb-3 text-gray-300"><a href="#" className="text-gray-300 no-underline transition-colors hover:text-indigo-400">Help Center</a></li>
            <li className="mb-3 text-gray-300"><a href="#" className="text-gray-300 no-underline transition-colors hover:text-indigo-400">Community</a></li>
            <li className="mb-3 text-gray-300"><a href="#" className="text-gray-300 no-underline transition-colors hover:text-indigo-400">Newsletter</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl mb-5 text-white">Contact</h4>
          <ul className="list-none p-0">
            <li className="mb-3 text-gray-300">📧 hello@startupschool.com</li>
            <li className="mb-3 text-gray-300">📞 +1 (555) 123-4567</li>
            <li className="mb-3 text-gray-300">📍 San Francisco, CA</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-gray-300">
        <p>&copy; 2026 Startup School. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
