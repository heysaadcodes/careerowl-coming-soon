"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FiInstagram } from "react-icons/fi";

const Page = () => {
  const router = useRouter();
  const videoRef = useRef(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [videoError, setVideoError] = useState(false);

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

  useEffect(() => {
    // Ensure video plays and loops with error handling
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed, using fallback:", error);
        setVideoError(true);
      });
    }
  }, []);

  const handleVideoError = () => {
    setVideoError(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email");
      setMessageType("error");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address");
      setMessageType("error");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Thank you! You've been added to our early access list.");
        setMessageType("success");
        setEmail(""); // Clear the input
      } else {
        setMessage(data.error || "Something went wrong. Please try again.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Network error. Please check your connection and try again.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col relative overflow-hidden">
      {/* Video Background with Fallback */}
      {!videoError ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onError={handleVideoError}
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/careerowl.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          style={{
            background: "linear-gradient(135deg, #78355e 0%, #5a2a4a 50%, #3d1c32 100%)"
          }}
        />
      )}

      {/* Overlay for better readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10"></div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-4">

        {/* Main Content Container with Glassmorphism */}
        <div className="glass-card rounded-3xl px-2 py-6 lg:p-12 backdrop-blur-lg border border-white/20 shadow-2xl flex flex-col items-center">
          {/* Hatching Soon Heading */}
          <Image
            src={"/careerowl-logo.png"}
            alt="Career Owl Logo"
            width={150}
            height={150}
            className="drop-shadow-lg mb-4"
            priority
          />
          <h1 className="text-4xl lg:text-7xl font-bold text-white text-center mb-8 lg:mb-12 drop-shadow-lg">
            Hatching <span className="text-[#bdff00]">Soon!</span>
          </h1>

          {/* Timer with Glassmorphism */}
          <div className="flex justify-center items-center gap-2 lg:gap-6 mb-12">
            {[
              { value: timeLeft.days, label: 'Days' },
              { value: timeLeft.hours, label: 'Hours' },
              { value: timeLeft.minutes, label: 'Minutes' },
              { value: timeLeft.seconds, label: 'Seconds' }
            ].map((item, index) => (
              <div key={item.label} className="flex items-center">
                <div className="text-center">
                  <div className="glass-timer text-white text-2xl lg:text-4xl font-bold rounded-xl px-4 py-3 lg:px-6 lg:py-4 min-w-[70px] lg:min-w-[90px] border border-white/20 shadow-lg">
                    {item.value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-white text-sm lg:text-base mt-2 font-medium drop-shadow">
                    {item.label}
                  </div>
                </div>
                {index < 3 && (
                  <div className="text-white text-xl lg:text-3xl font-bold mx-1 lg:mx-3 drop-shadow">
                    :
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Email Form with Glassmorphism */}
          <form
            onSubmit={handleSubmit}
            className="glass-form flex w-full lg:w-[600px] mx-auto font-normal text-white h-[64px] lg:h-[78px] justify-between items-center px-2 rounded-full border border-white/20 shadow-lg"
          >
            <input
              type="email"
              placeholder="Your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent placeholder:text-white/80 border-none text-[16px] lg:text-[18px] outline-none w-full px-2"
              disabled={isLoading}
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#bdff00] hover:bg-[#a8e600] text-[#1B1F3B] text-[16px] lg:text-[18px] font-semibold px-6 h-[48px] lg:h-[58px] flex justify-center items-center rounded-full ml-2 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg text-nowrap cursor-pointer"
            >
              {isLoading ? "Saving..." : "Get early access"}
            </button>
          </form>

          {/* Message display */}
          {message && (
            <div
              className={`text-center mt-6 text-[16px] font-medium ${messageType === "success" ? "text-[#bdff00]" : "text-red-300"} drop-shadow`}
            >
              {message}
            </div>
          )}

          {/* Social Links with Glassmorphism */}
          <div className="flex justify-center gap-4 lg:gap-6 items-center mt-10">
            {[
              { icon: "/link.svg", href: "https://www.linkedin.com/", alt: "LinkedIn" },
              { icon: "/x.svg", href: "https://x.com/", alt: "X" },
              { icon: "/main.svg", href: "mailto:support@thecareerowl.ca", alt: "Email" },
            ].map((social) => (
              <div
                key={social.alt}
                className="glass-social rounded-full cursor-pointer transform hover:scale-110 transition-all duration-300 border border-white/20 shadow-lg"
                onClick={() => router.push(social.href)}
              >
                <Image
                  src={social.icon}
                  alt={social.alt}
                  width={54}
                  height={54}
                  className="filter brightness-0 invert"
                />
              </div>
            ))}
            <div
              className="glass-social rounded-full p-3 cursor-pointer transform hover:scale-110 transition-all duration-300 border shadow-lg border-white flex justify-center items-center"
              onClick={() => router.push("https://www.instagram.com")}
            >
              <FiInstagram
                className="text-white"
                size={32}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;