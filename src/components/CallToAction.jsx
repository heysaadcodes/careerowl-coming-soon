import React, { useState } from 'react';
import EarlyAccessModal from './EarlyAccessModal';

const CallToAction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="w-full px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="mt-16 text-center bg-gradient-to-r from-[#78355e] to-[#9d4577] rounded-3xl p-12 shadow-xl">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Experience the Future of Hiring?
            </h3>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              Join thousands of employers and job seekers who are already waiting for our launch
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#bdff00] hover:bg-[#a8e600] text-gray-900 font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
            >
              Get Early Access
            </button>
          </div>
        </div>
      </div>

      {/* Early Access Modal */}
      <EarlyAccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default CallToAction;