import React from 'react';

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
    <div className="w-full">
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20 px-5 text-center">
        <h1 className="text-5xl mb-4">Our Blog</h1>
        <p className="text-xl opacity-90">
          Insights, tips, and stories from the startup world
        </p>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl p-8 shadow-md transition-all flex flex-col hover:-translate-y-1 hover:shadow-2xl">
              <div className="flex justify-between items-center mb-5">
                <span className="bg-gray-100 px-4 py-1 rounded-full text-sm font-semibold text-indigo-600">{post.category}</span>
                <span className="text-gray-400 text-sm">{post.readTime}</span>
              </div>
              <h2 className="text-xl text-gray-800 mb-4 leading-tight">{post.title}</h2>
              <p className="text-gray-600 leading-relaxed mb-5 flex-grow">{post.excerpt}</p>
              <div className="flex justify-between items-center pt-5 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">👤</span>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{post.author}</p>
                    <p className="text-gray-500 text-xs">{post.date}</p>
                  </div>
                </div>
                <button className="bg-indigo-600 text-white border-0 px-5 py-2 rounded-lg cursor-pointer font-medium transition-colors hover:bg-indigo-700">Read More →</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blog;
