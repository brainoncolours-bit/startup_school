import React from 'react';

const Home = () => {
  return (
    <div className="w-full">
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-24 px-5 text-center">
        <div>
          <h1 className="text-5xl mb-5 font-bold">Welcome to Startup School</h1>
          <p className="text-xl mb-10 opacity-90">
            Learn the fundamentals of building and scaling a successful startup
          </p>
          <div className="flex gap-5 justify-center flex-wrap">
            <button className="px-10 py-4 text-base border-0 rounded-lg cursor-pointer font-semibold transition-all bg-white text-indigo-600 hover:-translate-y-0.5 hover:shadow-xl">Get Started</button>
            <button className="px-10 py-4 text-base border-2 rounded-lg cursor-pointer font-semibold transition-all bg-transparent text-white border-white hover:-translate-y-0.5 hover:shadow-xl">Learn More</button>
          </div>
        </div>
      </section>

      <section className="py-20 px-5 max-w-6xl mx-auto">
        <h2 className="text-center text-4xl mb-12 text-gray-800">Why Choose Startup School?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md transition-all hover:-translate-y-1 hover:shadow-xl text-center">
            <h3 className="text-2xl mb-4 text-indigo-600">📚 Expert Courses</h3>
            <p className="text-gray-600 leading-relaxed">Learn from industry experts and successful founders</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md transition-all hover:-translate-y-1 hover:shadow-xl text-center">
            <h3 className="text-2xl mb-4 text-indigo-600">🚀 Real-World Projects</h3>
            <p className="text-gray-600 leading-relaxed">Build actual products and gain practical experience</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md transition-all hover:-translate-y-1 hover:shadow-xl text-center">
            <h3 className="text-2xl mb-4 text-indigo-600">🤝 Community Support</h3>
            <p className="text-gray-600 leading-relaxed">Connect with fellow entrepreneurs and mentors</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md transition-all hover:-translate-y-1 hover:shadow-xl text-center">
            <h3 className="text-2xl mb-4 text-indigo-600">💡 Innovative Ideas</h3>
            <p className="text-gray-600 leading-relaxed">Transform your ideas into successful businesses</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
