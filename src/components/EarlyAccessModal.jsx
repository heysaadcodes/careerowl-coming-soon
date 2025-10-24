"use client";
import React, { useState } from "react";

const EarlyAccessModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    focusIndustry: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch('/api/early-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed');
      }

      // Success!
      setSuccess(true);
      setFormData({
        name: "",
        company: "",
        email: "",
        focusIndustry: "",
      });

      // Close modal after 2 seconds
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);

    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full transform transition-all">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Get Early Access
          </h2>
          <p className="text-gray-700 mb-6">
            Be the first to experience our new platform.
          </p>

          {success ? (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Successfully registered! Thank you.
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-900 mb-1"
                  >
                    Full Name <span className="text-red-500 mr-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#78355e] focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-semibold text-gray-900 mb-1"
                  >
                    Company Name <span className="text-red-500 mr-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#78355e] focus:border-transparent transition-all"
                    placeholder="Enter your company name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-900 mb-1"
                  >
                    Email Address <span className="text-red-500 mr-1">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#78355e] focus:border-transparent transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="focusIndustry"
                    className="block text-sm font-semibold text-gray-900 mb-1"
                  >
                    Focus Industry <span className="text-red-500 mr-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="focusIndustry"
                    name="focusIndustry"
                    value={formData.focusIndustry}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#78355e] focus:border-transparent transition-all"
                    placeholder="Enter your focus industry"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={loading}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-800 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all cursor-pointer rounded-full disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-[#bdff00] text-gray-900 font-semibold hover:bg-[#a8e600] transition-all shadow-sm cursor-pointer rounded-full disabled:opacity-50 flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EarlyAccessModal;