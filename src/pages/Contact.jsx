import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="w-full">
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20 px-5 text-center">
        <h1 className="text-5xl mb-4">Get in Touch</h1>
        <p className="text-xl opacity-90">
          Have questions? We'd love to hear from you.
        </p>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-5 grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16">
        <div>
          <h2 className="text-3xl text-gray-800 mb-8">Contact Information</h2>
          <div className="flex items-start mb-8 gap-5">
            <span className="text-3xl min-w-[50px] h-[50px] flex items-center justify-center bg-gray-100 rounded-lg">📧</span>
            <div>
              <h3 className="text-gray-800 mb-2 text-lg">Email</h3>
              <p className="text-gray-600 leading-relaxed">hello@startupschool.com</p>
            </div>
          </div>
          <div className="flex items-start mb-8 gap-5">
            <span className="text-3xl min-w-[50px] h-[50px] flex items-center justify-center bg-gray-100 rounded-lg">📞</span>
            <div>
              <h3 className="text-gray-800 mb-2 text-lg">Phone</h3>
              <p className="text-gray-600 leading-relaxed">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="flex items-start mb-8 gap-5">
            <span className="text-3xl min-w-[50px] h-[50px] flex items-center justify-center bg-gray-100 rounded-lg">📍</span>
            <div>
              <h3 className="text-gray-800 mb-2 text-lg">Address</h3>
              <p className="text-gray-600 leading-relaxed">123 Startup Street<br />San Francisco, CA 94102</p>
            </div>
          </div>
          <div className="flex items-start mb-8 gap-5">
            <span className="text-3xl min-w-[50px] h-[50px] flex items-center justify-center bg-gray-100 rounded-lg">🕒</span>
            <div>
              <h3 className="text-gray-800 mb-2 text-lg">Business Hours</h3>
              <p className="text-gray-600 leading-relaxed">Monday - Friday: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl text-gray-800 mb-8">Send us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2 text-gray-800 font-semibold">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full py-3 px-4 border-2 border-gray-300 rounded-lg text-base font-sans transition-colors focus:outline-none focus:border-indigo-600"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-gray-800 font-semibold">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
                className="w-full py-3 px-4 border-2 border-gray-300 rounded-lg text-base font-sans transition-colors focus:outline-none focus:border-indigo-600"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="subject" className="block mb-2 text-gray-800 font-semibold">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What is this about?"
                className="w-full py-3 px-4 border-2 border-gray-300 rounded-lg text-base font-sans transition-colors focus:outline-none focus:border-indigo-600"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block mb-2 text-gray-800 font-semibold">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Your message..."
                className="w-full py-3 px-4 border-2 border-gray-300 rounded-lg text-base font-sans transition-colors focus:outline-none focus:border-indigo-600"
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white border-0 py-3 px-8 rounded-lg text-lg cursor-pointer font-semibold transition-colors hover:bg-indigo-700">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
