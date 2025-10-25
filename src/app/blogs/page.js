"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FiClock, FiUser, FiTag, FiArrowRight, FiSearch, FiArrowLeft, FiArrowLeftCircle } from 'react-icons/fi';
import blogsData from '@/data/blogs.json';
import CallToAction from '@/components/CallToAction';
import Image from 'next/image';

const BlogsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get unique categories
  const categories = ['All', ...new Set(blogsData.blogs.map(blog => blog.category))];

  // Filter blogs based on search and category
  const filteredBlogs = blogsData.blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#78355e] to-[#9d4577] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white hover:text-gray-200 font-semibold transition-colors">
            <FiArrowLeftCircle className="w-6 h-6" />
            <span>Home</span>
          </Link>
        </div>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            CareerOwl&trade; Blog
          </h1>
          <p className="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
            Insights, updates, and stories about the future of hiring
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:border-[#bdff00] transition-all"
            />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${selectedCategory === category
                ? 'bg-[#78355e] text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-[#2563eb]'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-10">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#2563eb] transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                {/* Blog Image */}
                <div className="relative h-48 bg-gradient-to-br from-[#78355e] to-[#9d4577] overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      width={500}
                      height={300}
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
                    {/* <div className="flex items-center gap-1">
                      <FiClock className="w-4 h-4" />
                      <span>{blog.readTime}</span>
                    </div> */}
                    <div className="flex items-center gap-1">
                      <FiUser className="w-4 h-4" />
                      <span>{blog.author}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#2563eb] transition-colors line-clamp-2">
                    {blog.title}
                  </h2>

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
        )}
      </div>

      {/* CTA Section */}
      <CallToAction />
    </div >
  );
};

export default BlogsPage;