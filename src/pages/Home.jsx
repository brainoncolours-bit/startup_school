import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Startup School</h1>
          <p className="hero-subtitle">
            Learn the fundamentals of building and scaling a successful startup
          </p>
          <div className="cta-buttons">
            <button className="btn-primary">Get Started</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Why Choose Startup School?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>📚 Expert Courses</h3>
            <p>Learn from industry experts and successful founders</p>
          </div>
          <div className="feature-card">
            <h3>🚀 Real-World Projects</h3>
            <p>Build actual products and gain practical experience</p>
          </div>
          <div className="feature-card">
            <h3>🤝 Community Support</h3>
            <p>Connect with fellow entrepreneurs and mentors</p>
          </div>
          <div className="feature-card">
            <h3>💡 Innovative Ideas</h3>
            <p>Transform your ideas into successful businesses</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
