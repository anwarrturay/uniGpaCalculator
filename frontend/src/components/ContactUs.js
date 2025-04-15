import React from 'react';
import Header from './Header';
import { Send, ArrowRight } from 'lucide-react';
import { FAQs } from './utils/FAQs';
import { v4 as uuidv4 } from 'uuid';
const ContactUs = () => {

  const handleFeedbacks = (e) => {
    e.preventDefault();
  };

  return (
    <section>
      <Header />
      <main className="relative top-20 xl:top-32 font-Montserrat flex justify-center items-start px-4 scroll-smooth">
        <div className="flex flex-col justify-start xl:flex-row gap-12 max-w-6xl w-full">

          {/* FAQs Section */}
          <div className="w-full xl:w-1/2">
            <div className='mb-6'>
              <h1 className="font-bold text-2xl mb-2">FAQs</h1>
              <p className="text-[12px] text-[#8b8b8b]">These are the frequently asked questions from others users and to answer these questions navigate to your dashboard and tap on tips.</p>
            </div>
            <ul className="space-y-2 text-gray-700 font-medium">
              {FAQs.map(question=>(
                <li className='flex' key={uuidv4()}>
                  <ArrowRight className='mr-2'/>
                  {question}
                </li>
              ))}
            </ul>
          </div>

          {/* Vertical Divider */}
          <div className="hidden xl:flex justify-center">
            <div className="h-full w-px bg-gray-300" />
          </div>

          {/* Contact Form Section */}
          <div className="w-full xl:w-1/2">
            <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
            <p className="text-[#8b8b8b] mb-6 text-[12px]">
              We'd love to hear from you! Whether you're reporting a bug, suggesting improvements, or sharing your experience, your feedback helps us make things better.
            </p>

            <form onSubmit={handleFeedbacks} className="space-y-4 mb-3">
              <div className="flex flex-col">
                <label htmlFor="categories-issue" className="mb-1 font-medium">Category</label>
                <select id="categories-issue" className="input-field">
                  <option value="">Bug Issue</option>
                  <option value="">Performance Issue</option>
                  <option value="">System Optimization</option>
                  <option value="">Compliment</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="message" className="mb-1 font-medium">Message</label>
                <textarea
                  id="message"
                  rows="5"
                  className="input-field w-full min-h-[100px] max-h-[300px] overflow-y-auto resize-y"
                  placeholder="Type your message here"
                ></textarea>
              </div>

              <button type="submit" className="bg-[#070181] text-white px-4 py-2 rounded-md flex items-center justify-center hover:bg-gray-800 font-medium w-[300px] xs:w-[330px] sm:w-[360px]">
                Send
                <Send className="ml-2" />
              </button>
            </form>
          </div>

        </div>
      </main>
    </section>
  );
};

export default ContactUs;
