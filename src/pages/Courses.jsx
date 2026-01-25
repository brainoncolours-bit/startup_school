import React from 'react';
import './Courses.css';

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
    <div className="courses-container">
      <section className="courses-hero">
        <h1>Our Courses</h1>
        <p className="courses-subtitle">
          Choose from our comprehensive curriculum designed for every stage of your startup journey
        </p>
      </section>

      <section className="courses-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <div className="course-header">
              <span className="course-level">{course.level}</span>
              <span className="course-price">{course.price}</span>
            </div>
            <h3>{course.title}</h3>
            <p className="course-description">{course.description}</p>
            <div className="course-footer">
              <span className="course-duration">⏱️ {course.duration}</span>
              <button className="btn-enroll">Enroll Now</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Courses;
