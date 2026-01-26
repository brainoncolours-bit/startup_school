import React from 'react';

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: 'Startup Fundamentals',
      description: 'Learn the basics of starting and running a successful startup',
      duration: '8 weeks',
      level: 'Beginner',
      price: '$99'
    },
    {
      id: 2,
      title: 'Product Development',
      description: 'Build products that customers love and pay for',
      duration: '10 weeks',
      level: 'Intermediate',
      price: '$149'
    },
    {
      id: 3,
      title: 'Growth & Marketing',
      description: 'Master growth strategies and marketing techniques',
      duration: '6 weeks',
      level: 'Intermediate',
      price: '$129'
    },
    {
      id: 4,
      title: 'Fundraising Essentials',
      description: 'Learn how to raise capital and pitch to investors',
      duration: '5 weeks',
      level: 'Advanced',
      price: '$199'
    },
    {
      id: 5,
      title: 'Scaling Your Startup',
      description: 'Strategies for scaling from 0 to 100 and beyond',
      duration: '12 weeks',
      level: 'Advanced',
      price: '$249'
    },
    {
      id: 6,
      title: 'Legal & Finance',
      description: 'Navigate the legal and financial aspects of startups',
      duration: '6 weeks',
      level: 'Intermediate',
      price: '$149'
    }
  ];

  return (
    <div className="w-full">
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20 px-5 text-center">
        <h1 className="text-5xl mb-4">Our Courses</h1>
        <p className="text-xl opacity-90 max-w-3xl mx-auto">
          Choose from our comprehensive curriculum designed for every stage of your startup journey
        </p>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl p-8 shadow-md transition-all flex flex-col hover:-translate-y-1 hover:shadow-2xl">
            <div className="flex justify-between items-center mb-5">
              <span className="bg-gray-100 px-4 py-1 rounded-full text-sm font-semibold text-indigo-600">{course.level}</span>
              <span className="text-2xl font-bold text-indigo-600">{course.price}</span>
            </div>
            <h3 className="text-2xl text-gray-800 mb-4">{course.title}</h3>
            <p className="text-gray-600 leading-relaxed mb-5 flex-grow">{course.description}</p>
            <div className="flex justify-between items-center mt-auto pt-5 border-t border-gray-200">
              <span className="text-gray-600 text-sm">⏱️ {course.duration}</span>
              <button className="bg-indigo-600 text-white border-0 px-6 py-2 rounded-lg cursor-pointer font-semibold transition-all hover:bg-indigo-700">Enroll Now</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Courses;
