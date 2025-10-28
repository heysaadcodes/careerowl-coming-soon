import React from "react";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Horizontal Logo */}
          <div className="flex justify-center">
            <Link
              href="/"
              className="flex items-center transition-opacity hover:opacity-80"
            >
              <Image
                src="/careerowl-logo-hor.svg" // Update this path to your actual horizontal logo
                alt="The Career Owl"
                width={300}
                height={45}
                className="h-12 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Copyright and Trademark Text */}
          <div className="text-center space-y-1">
            <p className="text-gray-600 text-sm font-medium">
              © {currentYear} The CareerOwl™. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs">
              The CareerOwl™ and the CareerOwl™ logo are registered
              trademarks.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
