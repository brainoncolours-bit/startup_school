import React from 'react';
import './Blog.css';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: '10 Essential Tips for First-Time Founders',
      excerpt: 'Starting your first company can be overwhelming. Here are the key lessons we wish we knew before launching...',
      author: 'Sarah Johnson',
      date: 'January 20, 2026',
      category: 'Startup Basics',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'How to Validate Your Startup Idea',
      excerpt: 'Before investing time and money, learn how to test if your idea has real market potential...',
      author: 'Michael Chen',
      date: 'January 18, 2026',
      category: 'Product Development',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'The Art of Pitching to Investors',
      excerpt: 'Master the techniques that make investors excited about your startup and ready to write a check...',
      author: 'David Rodriguez',
      date: 'January 15, 2026',
      category: 'Fundraising',
      readTime: '8 min read'
    },
    {
      id: 4,
      title: 'Building a Strong Company Culture',
      excerpt: 'Your culture defines your company. Learn how to create an environment where teams thrive...',
      author: 'Emily Watson',
      date: 'January 12, 2026',
      category: 'Leadership',
      readTime: '6 min read'
    },
    {
      id: 5,
      title: 'Growth Hacking Strategies That Work',
      excerpt: 'Discover proven tactics to accelerate your startup\'s growth without breaking the bank...',
      author: 'Alex Turner',
      date: 'January 10, 2026',
      category: 'Marketing',
      readTime: '10 min read'
    },
    {
      id: 6,
      title: 'From Idea to MVP in 30 Days',
      excerpt: 'A step-by-step guide to building your minimum viable product quickly and efficiently...',
      author: 'Rachel Green',
      date: 'January 8, 2026',
      category: 'Product Development',
      readTime: '9 min read'
    }
  ];

  return (
    <div className="blog-container">
      <section className="blog-hero">
        <h1>Our Blog</h1>
        <p className="blog-subtitle">
          Insights, tips, and stories from the startup world
        </p>
      </section>

      <section className="blog-content">
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <article key={post.id} className="blog-card">
              <div className="blog-card-header">
                <span className="blog-category">{post.category}</span>
                <span className="blog-read-time">{post.readTime}</span>
              </div>
              <h2>{post.title}</h2>
              <p className="blog-excerpt">{post.excerpt}</p>
              <div className="blog-card-footer">
                <div className="blog-author">
                  <span className="author-avatar">👤</span>
                  <div>
                    <p className="author-name">{post.author}</p>
                    <p className="blog-date">{post.date}</p>
                  </div>
                </div>
                <button className="btn-read-more">Read More →</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blog;
