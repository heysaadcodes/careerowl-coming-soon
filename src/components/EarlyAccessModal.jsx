"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Turnstile from "./Turnstile";

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
  const [eggs, setEggs] = useState([]);
  const [turnstileToken, setTurnstileToken] = useState("");

  // Generate eggs when modal opens
  useEffect(() => {
    if (isOpen) {
      const newEggs = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        // Start from random positions at the top
        initialX: Math.random() * window.innerWidth,
        initialY: -50 - Math.random() * 100,
        // Random properties for variety
        size: 20 + Math.random() * 20,
        rotation: Math.random() * 360,
        delay: Math.random() * 4, // Stagger the falling
        duration: 3 + Math.random() * 2,
        // Egg color variations
        color: getEggColor(i),
        // Infinite animation properties
        repeatDelay: 1 + Math.random() * 3,
      }));
      setEggs(newEggs);
    }
  }, [isOpen]);

  // Auto-close success message after 10 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [success, onClose]);

  // Egg color variations like in the HTML version
  const getEggColor = (index) => {
    const colors = [
      { bg: "from-[#ffeef0] to-[#ffc1cc]", shadow: "rgba(255, 182, 193, 0.3)" },
      { bg: "from-[#e0f7ff] to-[#93d5f5]", shadow: "rgba(147, 197, 253, 0.3)" },
      { bg: "from-[#fffbeb] to-[#fde68a]", shadow: "rgba(253, 224, 71, 0.3)" },
      { bg: "from-[#ecfdf5] to-[#86efac]", shadow: "rgba(134, 239, 172, 0.3)" },
      { bg: "from-[#f5f3ff] to-[#c4b5fd]", shadow: "rgba(196, 181, 253, 0.3)" },
      { bg: "from-[#fffbeb] to-[#fbbf24]", shadow: "rgba(251, 191, 36, 0.3)" },
      { bg: "from-[#e0f2fe] to-[#38bdf8]", shadow: "rgba(56, 189, 248, 0.3)" },
      { bg: "from-[#fce7f3] to-[#f9a8d4]", shadow: "rgba(249, 168, 212, 0.3)" },
      { bg: "from-[#f0fdf4] to-[#bbf7d0]", shadow: "rgba(187, 247, 208, 0.3)" },
    ];
    return colors[index % colors.length];
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!turnstileToken) {
      setError("Please complete the security verification");
      setLoading(false);
      return;
    }

    try {
      const verifyResponse = await fetch("/api/verify-turnstile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: turnstileToken }),
      });

      const verifyResult = await verifyResponse.json();

      if (!verifyResponse.ok || !verifyResult.success) {
        throw new Error("Security verification failed");
      }

      const response = await fetch("/api/early-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Submission failed");
      }

      setSuccess(true);
      setFormData({
        name: "",
        company: "",
        email: "",
        focusIndustry: "",
      });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTurnstileVerify = (token) => {
    setTurnstileToken(token);
    setError(""); // Clear any previous errors
  };

  const handleTurnstileError = () => {
    setError("Security verification failed. Please try again.");
    setTurnstileToken("");
  };

  const handleTurnstileExpire = () => {
    setTurnstileToken("");
    setError("Security check expired. Please verify again.");
  };

  const handleCloseSuccess = () => {
    setSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Interactive Eggs - Infinite falling from top to bottom */}
      <div className="absolute inset-0 overflow-hidden">
        {eggs.map((egg) => (
          <motion.div
            key={egg.id}
            className="absolute cursor-grab active:cursor-grabbing"
            drag
            dragElastic={0.05}
            dragMomentum={false}
            style={{
              width: egg.size,
              height: egg.size * 1.3,
            }}
            initial={{
              x: egg.initialX,
              y: egg.initialY,
              rotate: 0,
              scale: 0.8,
            }}
            animate={{
              x: egg.initialX + (Math.random() - 0.5) * 100, // Slight horizontal drift
              y: window.innerHeight + 100,
              rotate: 180 + Math.random() * 180,
              scale: 1,
            }}
            transition={{
              type: "tween",
              ease: "easeInOut",
              duration: egg.duration,
              delay: egg.delay,
              repeat: Infinity,
              repeatDelay: egg.repeatDelay,
              repeatType: "loop",
            }}
            whileHover={{
              scale: 1.2,
              rotate: egg.rotation + 15,
              transition: { type: "spring", stiffness: 400, damping: 10 },
            }}
            whileTap={{ scale: 0.9 }}
            whileDrag={{ scale: 1.1, rotate: 0 }}
          >
            {/* Proper Egg Shape */}
            <div
              className={`
                w-full h-full rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] 
                bg-gradient-to-br ${egg.color.bg}
                border border-white/40
                shadow-lg relative
              `}
              style={{
                boxShadow: `
                  0 6px 16px ${egg.color.shadow},
                  inset 0 -2px 6px rgba(0, 0, 0, 0.08),
                  inset 0 2px 6px rgba(255, 255, 255, 0.6)
                `,
              }}
            >
              {/* Egg shine effect */}
              <div
                className="absolute top-[18%] left-[22%] bg-white/70 rounded-full transform -rotate-25 blur-[0.5px]"
                style={{
                  width: `${egg.size * 0.35}px`,
                  height: `${egg.size * 0.2}px`,
                }}
              ></div>

              {/* Subtle yolk effect */}
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-yellow-200/25 to-orange-200/25 rounded-full opacity-30"
                style={{
                  width: `${egg.size * 0.5}px`,
                  height: `${egg.size * 0.5}px`,
                }}
              ></div>

              {/* Very subtle crack details */}
              <div className="absolute top-1/3 left-1/4 w-1/2 h-0.5 bg-gray-300/15 transform -rotate-12"></div>
              <div className="absolute top-2/3 left-1/4 w-1/2 h-0.5 bg-gray-300/15 transform rotate-12"></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Content - Always visible */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          delay: 0.3,
        }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative z-10 border border-gray-100 backdrop-blur-sm"
      >
        <div className="p-6">
          <div className="text-center mb-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Get Early Access
            </h2>
            <p className="text-gray-600 mt-1">
              Be the first to experience our new platform.
            </p>
          </div>

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 relative"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseSuccess}
                className="absolute top-3 right-3 text-green-600 hover:text-green-800 transition-colors"
                aria-label="Close success message"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Success Content */}
              <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="text-left">
                  <h3 className="text-green-800 font-semibold text-lg mb-1">
                    Thank You for Your Interest!
                  </h3>
                  <p className="text-green-700 text-sm">
                    Thanks for submitting your details. You have been added to
                    the list of early access participants, and will be contacted
                    by email closer to the time of our launch.
                  </p>
                  <div className="mt-2 text-green-600 text-xs">
                    <p>This message will auto-close in 10 seconds</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </motion.div>
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

                <div className="py-3">
                  <Turnstile
                    onVerify={handleTurnstileVerify}
                    onError={handleTurnstileError}
                    onExpire={handleTurnstileExpire}
                    theme="light"
                    size="normal"
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
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
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
      </motion.div>
    </div>
  );
};

export default EarlyAccessModal;
