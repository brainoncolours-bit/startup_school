import React from 'react';

const About = () => {
  return (
    <div className="w-full">
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20 px-5 text-center">
        <h1 className="text-5xl mb-4">About Startup School</h1>
        <p className="text-xl opacity-90">
          Empowering the next generation of entrepreneurs
        </p>
      </section>

      <section className="max-w-5xl mx-auto py-16 px-5">
        <div className="mb-12">
          <h2 className="text-3xl text-gray-800 mb-5">Our Mission</h2>
          <p className="text-lg leading-relaxed text-gray-600">
            Startup School is dedicated to providing world-class education and resources
            to aspiring entrepreneurs. We believe that anyone with passion and dedication
            can build a successful business.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl text-gray-800 mb-5">Our Story</h2>
          <p className="text-lg leading-relaxed text-gray-600">
            Founded in 2020, Startup School emerged from the vision to democratize
            entrepreneurship education. We've helped thousands of founders turn their
            ideas into reality.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl text-gray-800 mb-5">What We Offer</h2>
          <ul className="list-none p-0">
            <li className="py-3 pl-8 relative text-lg text-gray-600 before:content-['✓'] before:absolute before:left-0 before:text-indigo-600 before:font-bold before:text-xl">Comprehensive online courses</li>
            <li className="py-3 pl-8 relative text-lg text-gray-600 before:content-['✓'] before:absolute before:left-0 before:text-indigo-600 before:font-bold before:text-xl">One-on-one mentorship programs</li>
            <li className="py-3 pl-8 relative text-lg text-gray-600 before:content-['✓'] before:absolute before:left-0 before:text-indigo-600 before:font-bold before:text-xl">Networking opportunities with investors</li>
            <li className="py-3 pl-8 relative text-lg text-gray-600 before:content-['✓'] before:absolute before:left-0 before:text-indigo-600 before:font-bold before:text-xl">Access to exclusive startup resources</li>
            <li className="py-3 pl-8 relative text-lg text-gray-600 before:content-['✓'] before:absolute before:left-0 before:text-indigo-600 before:font-bold before:text-xl">Community of like-minded entrepreneurs</li>
          </ul>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl text-gray-800 mb-10 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center transition-transform hover:-translate-y-1">
              <div className="text-6xl mb-4">👨‍💼</div>
              <h3>John Doe</h3>
              <p>Founder & CEO</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center transition-transform hover:-translate-y-1">
              <div className="text-6xl mb-4">👩‍💼</div>
              <h3>Jane Smith</h3>
              <p>Head of Education</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center transition-transform hover:-translate-y-1">
              <div className="text-6xl mb-4">👨‍🏫</div>
              <h3>Mike Johnson</h3>
              <p>Lead Instructor</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
