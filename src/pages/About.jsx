import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About Startup School</h1>
        <p className="about-subtitle">
          Empowering the next generation of entrepreneurs
        </p>
      </section>

      <section className="about-content">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            Startup School is dedicated to providing world-class education and resources
            to aspiring entrepreneurs. We believe that anyone with passion and dedication
            can build a successful business.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2020, Startup School emerged from the vision to democratize
            entrepreneurship education. We've helped thousands of founders turn their
            ideas into reality.
          </p>
        </div>

        <div className="about-section">
          <h2>What We Offer</h2>
          <ul className="offering-list">
            <li>Comprehensive online courses</li>
            <li>One-on-one mentorship programs</li>
            <li>Networking opportunities with investors</li>
            <li>Access to exclusive startup resources</li>
            <li>Community of like-minded entrepreneurs</li>
          </ul>
        </div>

        <div className="team-section">
          <h2>Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">👨‍💼</div>
              <h3>John Doe</h3>
              <p>Founder & CEO</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👩‍💼</div>
              <h3>Jane Smith</h3>
              <p>Head of Education</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👨‍🏫</div>
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
