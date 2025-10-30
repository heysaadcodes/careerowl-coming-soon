"use client";
import React from "react";
import Link from "next/link";
import { FiClock, FiUser, FiArrowRight } from "react-icons/fi";
import blogsData from "../data/blogs.json";

const RecentBlogs = () => {
  // Get the first 3 blogs
  const recentBlogs = blogsData.blogs.slice(0, 3);

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}

        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-gray-800 mb-4">
            Latest from <br />
            <span className="text-[#78355e]">CareerOwl&trade;</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Insights, tips, and updates about the future of hiring and career
            development
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {recentBlogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blogs/${blog.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#2563eb] transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              {/* Blog Image */}
              <div className="relative h-50 bg-gradient-to-br from-[#78355e] to-[#9d4577] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="absolute top-4 right-4 bg-[#bdff00] text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                  {blog.category}
                </div>
              </div>

              {/* Blog Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <FiUser className="w-4 h-4" />
                    <span>{blog.author}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#2563eb] transition-colors line-clamp-2">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>

                {/* Read More Link */}
                <div className="flex items-center gap-2 text-[#2563eb] font-semibold group-hover:gap-3 transition-all">
                  <span>Read More</span>
                  <FiArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Read All Button */}
        <div className="text-center">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 bg-[#bdff00] hover:bg-[#a8e600] text-gray-900 font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span>Read All Articles</span>
            <FiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecentBlogs;
