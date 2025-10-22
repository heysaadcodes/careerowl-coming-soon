"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiInstagram, FiFacebook, FiTwitter, FiLinkedin, FiYoutube } from "react-icons/fi";
import EarlyAccessModal from "../components/EarlyAccessModal";

const Page = () => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Set your launch date here
  const launchDate = new Date('2026-01-01T00:00:00').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = launchDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        // Countdown finished
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  const socialLinks = [
    { icon: FiLinkedin, href: "https://www.linkedin.com/company/careerowl", label: "LinkedIn" },
    { icon: FiFacebook, href: "https://www.facebook.com/careerowl.ca", label: "Facebook" },
    { icon: FiInstagram, href: "https://www.instagram.com/careerowl.ca/", label: "Instagram" },
    { icon: FiYoutube, href: "https://www.youtube.com/@careerowl-ca", label: "YouTube" },    
  ];

  return (
    <div className="w-full lg:h-screen h-auto flex lg:flex-row flex-col-reverse relative lg:overflow-hidden">
      {/* Left Side - White Background Content */}
      <div className="lg:w-1/3 w-full h-full bg-white flex items-center justify-center py-12 lg:py-0">
        <div className="w-full max-w-lg mx-auto px-8">

          {/* Logo Evolution Section */}
          <div className="text-center mb-8 lg:mb-12">
            <div className="flex justify-center items-center gap-4 lg:gap-6 mb-4">
              {/* Old Logo */}
              <div className="text-center">
                <div className="bg-gray-100 rounded-2xl p-3 lg:p-4 border border-gray-200 shadow-sm mb-2 w-20 h-20 lg:w-24 lg:h-24 flex items-center justify-center">
                  <Image
                    src="/old-owl-logo.jpeg"
                    alt="Old Career Owl Logo"
                    width={60}
                    height={60}
                    className="mx-auto object-contain max-w-full max-h-full"
                  />
                </div>
                <span className="text-sm text-gray-500 font-medium">Then</span>
              </div>

              {/* Evolution Arrow */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-[#bdff00] rounded-full flex items-center justify-center mb-1">
                  <svg
                    className="w-3 h-3 lg:w-4 lg:h-4 text-gray-800 transform rotate-45"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
                <span className="text-xs text-gray-400 font-medium">Evolving</span>
              </div>

              {/* New Logo */}
              <div className="text-center">
                <div className="bg-gray-100 rounded-2xl p-3 lg:p-4 border border-gray-200 shadow-sm mb-2 w-20 h-20 lg:w-24 lg:h-24 flex items-center justify-center">
                  <Image
                    src="/new-owl-logo.svg"
                    alt="New Career Owl Logo"
                    width={60}
                    height={60}
                    className="mx-auto object-contain max-w-full max-h-full"
                  />
                </div>
                <span className="text-sm text-gray-500 font-medium">Now</span>
              </div>
            </div>

            <p className="text-gray-600 text-sm max-w-md mx-auto">
              We're evolving to serve you better! Our new identity reflects our commitment to
              innovative career solutions and growth.
            </p>
          </div>

          {/* Heading */}
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-800 text-center mb-6 lg:mb-8">
            Hatching <span className="text-[#78355e]">Soon!</span>
          </h1>

          {/* Timer */}
          <div className="flex justify-center items-center gap-2 lg:gap-4 mb-8 lg:mb-12">
            {[
              { value: timeLeft.days, label: 'Days' },
              { value: timeLeft.hours, label: 'Hours' },
              { value: timeLeft.minutes, label: 'Minutes' },
              { value: timeLeft.seconds, label: 'Seconds' }
            ].map((item, index) => (
              <div key={item.label} className="flex items-center">
                <div className="text-center">
                  <div className="bg-gray-100 text-gray-800 text-lg lg:text-2xl font-bold rounded-lg px-2 lg:px-4 py-2 lg:py-3 min-w-[50px] lg:min-w-[70px] border border-gray-200 shadow-sm">
                    {item.value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-gray-600 text-xs lg:text-sm mt-1 font-medium">
                    {item.label}
                  </div>
                </div>
                {index < 3 && (
                  <div className="text-gray-400 text-sm lg:text-xl font-bold mx-1 lg:mx-2">
                    :
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="w-full flex items-center justify-center mb-8 lg:mb-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#bdff00] hover:bg-[#a8e600] text-gray-900 text-[15px] lg:text-[16px] font-semibold px-5 h-[44px] lg:h-[52px] flex justify-center items-center rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-sm text-nowrap cursor-pointer"
            >
              Get early access
            </button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-3 lg:gap-6 items-center mt-8 lg:mt-10">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <div
                  key={social.label}
                  className="rounded-full cursor-pointer transform hover:scale-110 transition-all duration-300 border border-gray-200 shadow-lg bg-[#78355e] p-3 flex items-center justify-center"
                  onClick={() => router.push(social.href)}
                >
                  <IconComponent
                    className="text-white"
                    size={24}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      
      {/* Right Side - Image Section */}
      <div className="lg:w-2/3 w-full lg:h-full h-96 relative overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-bl from-transparent via-transparent to-white/10 z-10"></div>

        {/* Background Image */}
        <Image
          src="/owl-bg.jpg"
          alt="Career Owl Background"
          fill
          className="w-full h-full object-cover object-[center_30%] lg:object-left-bottom"
          priority
        />

        {/* Curved SVG - Only show on desktop */}
        <div className="absolute top-0 left-0 w-full h-full z-20 hidden lg:block">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="fill-white"
          >
            <path d="M0,0 C0,0 0,150 150,100 L0,100 Z" />
          </svg>
        </div>

        {/* Mobile curved bottom */}
        <div className="absolute bottom-0 left-0 w-full z-20 lg:hidden">
          <svg
            width="100%"
            height="70"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="fill-white"
          >
            <path d="M0,100 L100,100 L100,0 C100,0 50,50 0,0 Z" />
          </svg>
        </div>
      </div>

      {/* Early Access Modal */}
      <EarlyAccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Page;