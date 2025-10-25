"use client";
import React, { useState, useEffect } from "react";
import { FiInstagram, FiFacebook, FiLinkedin, FiYoutube } from "react-icons/fi";
import EarlyAccessModal from "../components/EarlyAccessModal";
import Features from "../components/Features";
import RecentBlogs from "../components/RecentBlogs";
import CallToAction from "../components/CallToAction";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  const socialLinks = [
    { icon: FiLinkedin, href: "https://www.linkedin.com/company/careerowl", label: "LinkedIn", color: "bg-[#78355e]" },
    { icon: FiFacebook, href: "https://www.facebook.com/careerowl.ca", label: "Facebook", color: "bg-[#78355e]" },
    { icon: FiInstagram, href: "https://www.instagram.com/careerowl.ca/", label: "Instagram", color: "bg-[#78355e]" },
    { icon: FiYoutube, href: "https://www.youtube.com/@careerowl-ca", label: "YouTube", color: "bg-[#78355e]" },
  ];

  return (
    <>
      <div className="w-full min-h-screen lg:h-screen flex lg:flex-row flex-col-reverse relative lg:overflow-hidden">
        {/* Left Side - White Background Content */}
        <div className="lg:w-[45%] w-full h-full bg-white flex items-center justify-center py-8 sm:py-10">
          <div className="w-full max-w-xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">

            {/* Logo Evolution Section */}
            <div className="text-center mb-4">
              <div className="flex justify-center items-center gap-4 sm:gap-6 lg:gap-7 xl:gap-8 mb-3 sm:mb-4 lg:mb-5">
                {/* Old Logo */}
                <div className="text-center flex-shrink-0">
                  <div className="bg-gray-100 rounded-2xl p-3 sm:p-4 lg:p-4 xl:p-5 border border-gray-200 shadow-sm mb-2 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 flex items-center justify-center">
                    <img
                      src="/old-owl-logo.png"
                      alt="Old Career Owl Logo"
                      className="mx-auto object-contain w-full h-full" />
                  </div>
                  <span className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-800 font-bold block">Then</span>
                </div>

                {/* Evolution Arrow */}
                <div className="flex flex-col items-center justify-center flex-shrink-0">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 bg-[#bdff00] rounded-full flex items-center justify-center mb-1">
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-gray-800 transform rotate-45"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm lg:text-base xl:text-lg text-gray-700 font-bold block">Evolving</span>
                </div>

                {/* New Logo */}
                <div className="text-center flex-shrink-0">
                  <div className="bg-gray-100 rounded-2xl p-3 sm:p-4 lg:p-4 xl:p-5 border border-gray-200 shadow-sm mb-2 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 flex items-center justify-center">
                    <img
                      src="/new-owl-logo.svg"
                      alt="New Career Owl Logo"
                      className="mx-auto object-contain w-full h-full" />
                  </div>
                  <span className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-800 font-bold block">Now</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm sm:text-base lg:text-lg xl:text-xl max-w-md lg:max-w-lg mx-auto px-2">
                We're evolving to serve you better! Our new identity reflects our commitment to
                innovative career solutions and growth. In the mean while <br /><Link href="/playful" className="text-[#78355e] font-semibold underline">Play in the Owl's Nest</Link>.
              </p>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-gray-800 text-center mb-5 sm:mb-6 leading-tight whitespace-nowrap">
              Hatching <span className="text-[#78355e]">Soon!</span>
            </h1>

            {/* Timer */}
            <div className="flex justify-center items-center gap-1.5 sm:gap-2 lg:gap-3 xl:gap-4 mb-6">
              {[
                { value: timeLeft.days, label: 'Days' },
                { value: timeLeft.hours, label: 'Hours' },
                { value: timeLeft.minutes, label: 'Minutes' },
                { value: timeLeft.seconds, label: 'Seconds' }
              ].map((item, index) => (
                <div key={item.label} className="flex items-center">
                  <div className="text-center">
                    <div className="bg-gray-100 text-[#2563eb] text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold rounded-xl px-2 sm:px-3 lg:px-4 xl:px-5 py-2 sm:py-2.5 lg:py-3 xl:py-4 min-w-[50px] sm:min-w-[55px] lg:min-w-[65px] xl:min-w-[80px] 2xl:min-w-[95px] border border-gray-200 shadow-sm">
                      {item.value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-gray-600 text-xs sm:text-sm lg:text-base xl:text-lg mt-1.5 sm:mt-2 font-semibold">
                      {item.label}
                    </div>
                  </div>
                  {index < 3 && (
                    <div className="text-gray-400 text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold mx-1 sm:mx-1.5 lg:mx-2 xl:mx-2.5">
                      :
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="w-full flex items-center justify-center mb-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#bdff00] hover:bg-[#a8e600] text-gray-900 text-sm sm:text-base lg:text-lg xl:text-xl font-bold px-6 sm:px-8 lg:px-10 xl:px-12 h-[45px] sm:h-[48px] lg:h-[52px] xl:h-[58px] 2xl:h-[64px] flex justify-center items-center rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-md text-nowrap cursor-pointer"
              >
                Get early access
              </button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-3 sm:gap-4 lg:gap-5 xl:gap-6 items-center mt-6">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <div
                    key={social.label}
                    className={`rounded-full cursor-pointer transform hover:scale-110 transition-all duration-300 border border-gray-200 shadow-lg ${social.color} p-2.5 sm:p-3 lg:p-3.5 xl:p-4 flex items-center justify-center`}
                    onClick={() => window.open(social.href, '_blank')}
                  >
                    <IconComponent
                      className="text-white w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side - Image Section */}
        <div className="lg:w-[55%] w-full lg:h-full h-80 sm:h-96 relative overflow-hidden">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-bl from-transparent via-transparent to-white/10 z-10"></div>

          {/* Background Image */}
          <img
            src="/owl-bg.jpeg"
            alt="Career Owl Background"
            className="absolute inset-0 w-full h-full object-cover lg:object-right-bottom" />

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

          <Image
            src="/new-owl-logo.svg"
            alt="Owl"
            width={250}
            height={250}
            objectFit="cover"
            className="absolute lg:w-[150px] lg:h-[150px] w-[100px] h-[100px] lg:hidden block top-0 left-2"
          />

          <Image
            src="/owl-white-logo.svg"
            alt="Owl"
            width={250}
            height={250}
            objectFit="cover"
            className="absolute lg:w-[150px] lg:h-[150px] lg:bottom-10 lg:right-20 hidden lg:block"
          />

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
          onClose={() => setIsModalOpen(false)} />
      </div>

      {/* Features Section */}
      <Features />
      {/* Recent Blogs Section */}
      <RecentBlogs />
      {/* Call To Action Section */}
      <CallToAction />
    </>
  );
};

export default Page;