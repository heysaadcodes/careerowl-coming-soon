"use client";
import { useState, useEffect } from "react";

export default function PlayfulAnimation() {
  const [timeLeft, setTimeLeft] = useState({
    days: 75,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [hootCount, setHootCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Career Owl Colors
  const colors = {
    primary: "#78355e",
    secondary: "#bdff00",
    accent: "#bdff00",
    background:
      "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
    cardBg: "rgba(255, 255, 255, 0.95)",
    text: {
      primary: "#78355e",
      secondary: "#64748b",
      white: "#ffffff",
    },
  };

  // Countdown Timer
  useEffect(() => {
    const now = new Date();
    const launchDate = new Date("2026-01-01T00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (distance < 0) {
        clearInterval(interval);
      }
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(interval);
  }, []);

  // Owl Eye Tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const leftPupil = document.getElementById("leftPupil");
      const rightPupil = document.getElementById("rightPupil");

      const leftEye = document.querySelector(".owl-eye.left");
      const rightEye = document.querySelector(".owl-eye.right");

      if (!leftEye || !rightEye) return;

      const leftRect = leftEye.getBoundingClientRect();
      const rightRect = rightEye.getBoundingClientRect();

      const leftX = e.clientX - (leftRect.left + leftRect.width / 2);
      const leftY = e.clientY - (leftRect.top + leftRect.height / 2);
      const rightX = e.clientX - (rightRect.left + rightRect.width / 2);
      const rightY = e.clientY - (rightRect.top + rightRect.height / 2);

      const maxMove = 8; // Increased for more movement
      const leftMoveX = Math.max(-maxMove, Math.min(maxMove, leftX / 8));
      const leftMoveY = Math.max(-maxMove, Math.min(maxMove, leftY / 8));
      const rightMoveX = Math.max(-maxMove, Math.min(maxMove, rightX / 8));
      const rightMoveY = Math.max(-maxMove, Math.min(maxMove, rightY / 8));

      if (leftPupil)
        leftPupil.style.transform = `translate(${leftMoveX}px, ${leftMoveY}px)`;
      if (rightPupil)
        rightPupil.style.transform = `translate(${rightMoveX}px, ${rightMoveY}px)`;
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Owl-themed Messages
  const messages = [
    "This egg is still warming up! Check back in {days} days when we officially hatch! 🦉",
    "Hoot hoot! Not yet, friend. This little one needs {days} more days of cozy nest time! 🥚",
    "Patience, young owl! These eggs need {days} days before they're ready to hatch! 🌙",
    "Whooo's excited? We are! But this egg needs {days} more days in the nest! 🦉",
    "Night shift in progress! This egg will hatch in {days} days. Worth the wait! 🌟",
    "Parliament in session! Official hatch date: {days} days away. Stay tuned! 📅",
    "Shhh! Genius in the making. Check back in {days} days! 🧠",
    "This egg is under owl-thority! Hatch countdown: {days} days! 🛡️",
    "Wise things take time! This one needs {days} more days of incubation! ⏰",
  ];

  const getDaysRemaining = () => {
    return timeLeft.days;
  };

  const handleEggClick = (messageIndex) => {
    const days = getDaysRemaining();
    const message = messages[messageIndex].replace("{days}", days);

    // Add bounce animation to the clicked egg
    setIsAnimating(true);
    const egg = document.querySelectorAll(".egg")[messageIndex];
    egg.style.animation = "eggBounce 0.6s ease";

    setTimeout(() => {
      egg.style.animation = "";
      setPopupMessage(message);
      setShowPopup(true);
      setIsAnimating(false);
    }, 600);
  };

  const handleMamaOwlClick = () => {
    // Add hop animation
    const owl = document.querySelector(".mama-owl");
    owl.style.animation = "owlHop 0.5s ease";

    setTimeout(() => {
      owl.style.animation = "";
    }, 500);

    setHootCount((prev) => {
      const newCount = prev + 1;
      if (newCount === 3) {
        const days = getDaysRemaining();
        setPopupMessage(
          `Hoot hoot! 🦉 Mama Owl says: "Thanks for being patient! Something amazing is hatching in ${days} days. Get ready for a wise new adventure!"`
        );
        setShowPopup(true);
        return 0;
      }
      return newCount;
    });
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage("");
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: colors.background, height: "100vh" }}
    >
      {/* Animated stars */}
      <div className="stars absolute inset-0">
        {Array.from({ length: 200 }).map(
          (
            _,
            i // More stars
          ) => (
            <div
              key={i}
              className="star absolute w-0.5 h-0.5 bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${1 + Math.random() * 3}s`, // Faster twinkling
              }}
            />
          )
        )}
      </div>

      {/* Floating particles */}
      <div className="particles absolute inset-0">
        {Array.from({ length: 50 }).map(
          (
            _,
            i // More particles
          ) => (
            <div
              key={i}
              className="particle absolute w-1 h-1 rounded-full animate-float-fast"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `rgba(189, 255, 0, ${0.4 + Math.random() * 0.5})`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${8 + Math.random() * 8}s`, // Faster floating
              }}
            />
          )
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Countdown Timer - Top */}
        <div className="countdown-section flex-shrink-0 pt-8 lg:pt-12">
          <div className="countdown flex justify-center gap-3 lg:gap-6 px-4">
            {[
              { value: timeLeft.days, label: "Days" },
              { value: timeLeft.hours, label: "Hours" },
              { value: timeLeft.minutes, label: "Minutes" },
              { value: timeLeft.seconds, label: "Seconds" },
            ].map((item, index) => (
              <div
                key={item.label}
                className="countdown-item bg-white/90 backdrop-blur-lg p-4 lg:p-6 rounded-2xl min-w-[70px] lg:min-w-[100px] text-center shadow-2xl border border-white/20 transition-all duration-500 hover:scale-110 hover:-translate-y-2 hover:rotate-3 hover:shadow-2xl"
                style={{
                  boxShadow: "0 20px 40px rgba(120, 53, 94, 0.3)",
                }}
              >
                <span
                  className="countdown-number text-2xl lg:text-3xl font-black block leading-none mb-1 lg:mb-2 animate-pulse-slow"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary} 0%, #9d4edd 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {String(item.value).padStart(2, "0")}
                </span>
                <span
                  className="countdown-label text-xs font-semibold uppercase tracking-wider"
                  style={{ color: colors.text.secondary }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Scene - Centered */}
        <div className="scene-section flex-1 flex items-center justify-center px-4">
          <div
            className="nest-scene relative w-full max-w-4xl rounded-3xl p-6 lg:p-8 backdrop-blur-lg border border-white/20 shadow-2xl animate-glow"
            style={{
              background:
                "linear-gradient(135deg, rgba(186, 230, 253, 0.2) 0%, rgba(224, 242, 254, 0.3) 50%, rgba(240, 249, 255, 0.15) 100%)",
              minHeight: "400px",
              boxShadow: "0 0 60px rgba(189, 255, 0, 0.2)",
            }}
          >
            {/* Moon */}
            <div className="moon absolute top-6 right-6 lg:top-8 lg:right-12 w-16 h-16 lg:w-24 lg:h-24 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full shadow-2xl shadow-yellow-200/80 animate-float-glow" />

            {/* Decorative clouds */}
            <div className="scene-cloud cloud1 absolute top-4 left-4 lg:top-6 lg:left-8 w-20 h-8 lg:w-28 lg:h-12 bg-white/90 rounded-full shadow-lg animate-float-fast" />
            <div className="scene-cloud cloud2 absolute top-8 right-16 lg:top-12 lg:right-24 w-16 h-6 lg:w-24 lg:h-10 bg-white/80 rounded-full shadow-lg animate-float-slower" />

            {/* Branch */}
            <div
              className="branch absolute bottom-32 lg:bottom-40 left-4 lg:left-8 w-40 lg:w-60 h-3 rounded-lg shadow-lg animate-branch-sway"
              style={{
                background: "linear-gradient(90deg, #5d4037 0%, #795548 100%)",
              }}
            />

            {/* Mama Owl */}
            <div
              className="mama-owl absolute top-8 left-4 lg:top-12 lg:left-12 w-24 lg:w-36 cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-3 active:scale-105 z-20 drop-shadow-2xl"
              onClick={handleMamaOwlClick}
              style={{
                filter: "drop-shadow(0 10px 30px rgba(189, 255, 0, 0.4))",
              }}
            >
              <div
                className="owl-body relative w-full h-24 lg:h-36 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, #8b5d3e 0%, #6d4c41 100%)",
                }}
              >
                <div
                  className="owl-wing left absolute -left-3 lg:-left-4 top-4 lg:top-6 w-6 lg:w-8 h-10 lg:h-14 rounded-l-full animate-wing-flap"
                  style={{
                    background:
                      "linear-gradient(135deg, #795548 0%, #5d4037 100%)",
                  }}
                />
                <div
                  className="owl-wing right absolute -right-3 lg:-right-4 top-4 lg:top-6 w-6 lg:w-8 h-10 lg:h-14 rounded-r-full animate-wing-flap"
                  style={{
                    background:
                      "linear-gradient(135deg, #795548 0%, #5d4037 100%)",
                  }}
                />

                <div className="owl-belly absolute bottom-3 lg:bottom-5 left-1/2 transform -translate-x-1/2 w-3/5 h-3/5 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 shadow-inner" />

                <div className="owl-eye left absolute top-6 lg:top-8 left-5 lg:left-7 w-5 lg:w-7 h-5 lg:h-7 bg-white rounded-full border-2 border-gray-900 shadow-inner owl-blink">
                  <div
                    id="leftPupil"
                    className="owl-pupil absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 lg:w-3.5 h-2.5 lg:h-3.5 bg-black rounded-full transition-all duration-150" // Faster tracking
                  />
                </div>
                <div className="owl-eye right absolute top-6 lg:top-8 right-5 lg:right-7 w-5 lg:w-7 h-5 lg:h-7 bg-white rounded-full border-2 border-gray-900 shadow-inner owl-blink">
                  <div
                    id="rightPupil"
                    className="owl-pupil absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 lg:w-3.5 h-2.5 lg:h-3.5 bg-black rounded-full transition-all duration-150"
                  />
                </div>

                <div className="owl-beak absolute top-10 lg:top-14 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 lg:border-l-5 border-r-3 lg:border-r-5 border-t-5 lg:border-t-7 border-transparent border-t-amber-500 drop-shadow-sm" />

                <div className="owl-feet absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-4 lg:gap-6">
                  <div className="owl-foot w-1.5 lg:w-2 h-4 lg:h-6 bg-amber-500 rounded-sm" />
                  <div className="owl-foot w-1.5 lg:w-2 h-4 lg:h-6 bg-amber-500 rounded-sm" />
                </div>
              </div>
            </div>

            {/* Nest */}
            <div
              className="nest absolute bottom-16 lg:bottom-24 left-1/2 transform -translate-x-1/2 w-72 lg:w-96 h-16 lg:h-24 rounded-full shadow-2xl"
              style={{
                background:
                  "radial-gradient(ellipse at center, #8d6e63 0%, #6d4c41 100%)",
              }}
            />

            {/* Eggs Container */}
            <div className="eggs-container absolute bottom-24 lg:bottom-32 left-1/2 transform -translate-x-1/2 w-64 lg:w-80 h-20 lg:h-24 z-10">
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className={`egg absolute cursor-pointer transition-all duration-500 hover:scale-150 hover:rotate-12 hover:z-20 ${getEggStyle(index)}`}
                  onClick={() => handleEggClick(index)}
                  style={{
                    left: `${getEggPosition(index).x}px`,
                    top: `${getEggPosition(index).y}px`,
                    transform: `scale(${getEggPosition(index).scale})`,
                    width: "50px",
                    height: "65px",
                    filter: "drop-shadow(0 5px 15px rgba(0,0,0,0.3))",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="info-section flex-shrink-0 pb-8 lg:pb-12 text-center">
          <h1 className="text-2xl lg:text-4xl font-black text-white mb-2 animate-bounce-slow">
            Career Owl
          </h1>
          <p className="text-lg lg:text-xl text-gray-300 animate-pulse">
            Hatching Soon 🦉
          </p>
        </div>
      </div>

      {/* Message Popup - Fixed to come from center */}
      {showPopup && (
        <>
          <div
            className="overlay fixed inset-0 bg-black/80 backdrop-blur-lg z-50 animate-fade-in-fast"
            onClick={closePopup}
          />
          <div className="message-popup fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl p-6 lg:p-8 max-w-sm lg:max-w-md w-11/12 shadow-2xl border border-white/50 backdrop-blur-sm z-50 animate-pop-up-center">
            <h3
              className="text-xl lg:text-2xl font-black mb-4 text-center"
              style={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, #9d4edd 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              🥚 Hang on a minute!
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6 text-sm lg:text-base text-center">
              {popupMessage}
            </p>
            <button
              onClick={closePopup}
              className="w-full py-3 px-6 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg animate-pulse-slow"
              style={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, #9d4edd 100%)`,
                boxShadow: "0 8px 25px rgba(120, 53, 94, 0.4)",
              }}
            >
              Got it!
            </button>
          </div>
        </>
      )}

      <style jsx>{`
        .stars {
          pointer-events: none;
        }

        .particles {
          pointer-events: none;
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes float-fast {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translateY(-150px) translateX(30px) scale(1.1);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-300px) translateX(-30px) scale(1);
            opacity: 0;
          }
        }

        @keyframes pop-up-center {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.3) rotate(-10deg);
          }
          70% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.1) rotate(5deg);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
          }
        }

        @keyframes eggBounce {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
          }
          25% {
            transform: scale(1.3) rotate(-8deg);
          }
          50% {
            transform: scale(1.1) rotate(8deg);
          }
          75% {
            transform: scale(1.2) rotate(-4deg);
          }
        }

        @keyframes owlHop {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes wing-flap {
          0%,
          100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(-5deg);
          }
        }

        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 60px rgba(189, 255, 0, 0.2);
          }
          50% {
            box-shadow: 0 0 80px rgba(189, 255, 0, 0.4);
          }
        }

        @keyframes branch-sway {
          0%,
          100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(1deg);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-twinkle {
          animation: twinkle 3s infinite;
        }

        .animate-float-fast {
          animation: float-fast linear infinite;
        }

        .animate-float-glow {
          animation:
            float 6s ease-in-out infinite,
            glow 4s ease-in-out infinite;
        }

        .animate-fade-in-fast {
          animation: fadeIn 0.2s ease;
        }

        .animate-pop-up-center {
          animation: pop-up-center 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }

        .animate-wing-flap {
          animation: wing-flap 3s ease-in-out infinite;
        }

        .animate-branch-sway {
          animation: branch-sway 8s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes blink {
          0%,
          98%,
          100% {
            transform: scaleY(1);
          }
          99% {
            transform: scaleY(0.1);
          }
        }

        .owl-blink {
          animation: blink 3s ease-in-out infinite; // Faster blinking
        }

        .egg {
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          box-shadow:
            0 10px 30px rgba(0, 0, 0, 0.4),
            inset 0 -4px 10px rgba(0, 0, 0, 0.2),
            inset 0 4px 10px rgba(255, 255, 255, 0.9);
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .egg::before {
          content: "";
          position: absolute;
          top: 18%;
          left: 22%;
          width: 18px;
          height: 13px;
          background: radial-gradient(
            ellipse at center,
            rgba(255, 255, 255, 0.95),
            transparent
          );
          border-radius: 50%;
          transform: rotate(-25deg);
          filter: blur(0.8px);
        }

        @media (min-width: 1024px) {
          .egg {
            width: 60px;
            height: 78px;
          }

          .egg::before {
            width: 22px;
            height: 16px;
          }
        }
      `}</style>
    </div>
  );

  // Helper functions
  function getEggStyle(index) {
    const eggStyles = [
      "bg-gradient-to-br from-pink-100 to-pink-300 shadow-pink-400/60",
      "bg-gradient-to-br from-blue-100 to-blue-300 shadow-blue-400/60",
      "bg-gradient-to-br from-yellow-100 to-yellow-300 shadow-yellow-400/60",
      "bg-gradient-to-br from-green-100 to-green-300 shadow-green-400/60",
      "bg-gradient-to-br from-purple-100 to-purple-300 shadow-purple-400/60",
      "bg-gradient-to-br from-orange-100 to-orange-300 shadow-orange-400/60",
      "bg-gradient-to-br from-cyan-100 to-cyan-300 shadow-cyan-400/60",
      "bg-gradient-to-br from-rose-100 to-rose-300 shadow-rose-400/60",
      "bg-gradient-to-br from-emerald-100 to-emerald-300 shadow-emerald-400/60",
    ];
    return eggStyles[index];
  }

  function getEggPosition(index) {
    const positions = [
      { x: 25, y: 25, scale: 1 },
      { x: 85, y: 15, scale: 1 },
      { x: 145, y: 30, scale: 1 },
      { x: 205, y: 10, scale: 1 },
      { x: 265, y: 25, scale: 1 },
      { x: 55, y: 50, scale: 0.9 },
      { x: 115, y: 55, scale: 0.88 },
      { x: 175, y: 57, scale: 0.92 },
      { x: 235, y: 52, scale: 0.87 },
    ];

    // Adjust for mobile
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      return positions.map((pos) => ({
        ...pos,
        x: pos.x * 0.6,
        y: pos.y * 0.6,
      }))[index];
    }

    return positions[index];
  }
}
