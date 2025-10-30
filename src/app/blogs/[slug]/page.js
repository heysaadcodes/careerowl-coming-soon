"use client";
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FiUser, FiTag, FiArrowLeft, FiArrowRight, FiCalendar, FiArrowLeftCircle } from 'react-icons/fi';
import blogsData from '@/data/blogs.json';
import CallToAction from '@/components/CallToAction';
import Image from 'next/image';

const BlogDetailPage = () => {
  const params = useParams();
  const slug = params.slug;

  // Find the current blog
  const blog = blogsData.blogs.find(b => b.slug === slug);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Blog Not Found</h1>
          <Link href="/blogs" className="text-[#78355e] hover:underline">
            Return to Blogs
          </Link>
        </div>
      </div>
    );
  }

  // Get related blogs (next and previous)
  const currentIndex = blogsData.blogs.findIndex(b => b.slug === slug);
  const previousBlog = currentIndex > 0 ? blogsData.blogs[currentIndex - 1] : null;
  const nextBlog = currentIndex < blogsData.blogs.length - 1 ? blogsData.blogs[currentIndex + 1] : null;

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 pt-8 flex items-center justify-between">
        <Link href="/blogs" className="inline-flex items-center gap-2 text-black hover:text-gray-800 font-semibold transition-colors">
          <FiArrowLeftCircle className="w-6 h-6" />
          <span className='hidden lg:block'>Back to Blogs</span>
        </Link>
        <Image src="/careerowl-logo-hor.svg" alt="The Career Owl" width={150} height={30} className="h-8 w-auto" priority />
        <div></div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Category Badge */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 bg-[#78355e] text-white px-4 py-2 rounded-full text-sm font-bold">
            <FiTag className="w-4 h-4" />
            {blog.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
          {blog.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <FiUser className="w-5 h-5 text-[#2563eb]" />
            <span className="font-medium">{blog.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiCalendar className="w-5 h-5 text-[#2563eb]" />
            <span>{formatDate(blog.date)}</span>
          </div>
        </div>

        {/* Featured Image/Banner */}
        <div className="relative h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-[#78355e] to-[#9d4577] rounded-2xl overflow-hidden mb-12 shadow-xl">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover object-center"
              width={1024}
              height={786}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>

        {/* Blog Content */}
        <article className="prose prose-lg max-w-none">
          {blog.content.map((section, index) => {
            switch (section.type) {
              case 'heading':
                return (
                  <h2
                    key={index}
                    className="text-3xl sm:text-4xl font-bold text-gray-800 mt-12 mb-6 first:mt-0"
                  >
                    {section.text}
                  </h2>
                );
              case 'subheading':
                return (
                  <h3
                    key={index}
                    className="text-2xl sm:text-3xl font-bold text-[#78355e] mt-8 mb-4"
                  >
                    {section.text}
                  </h3>
                );
              case 'paragraph':
                return (
                  <p
                    key={index}
                    className="text-gray-900 leading-relaxed mb-6 text-lg"
                  >
                    {section.text}
                  </p>
                );
              default:
                return null;
            }
          })}
        </article>

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Enjoyed this article?
            </h3>
            <p className="text-gray-600 mb-6">
              Share it with your network or explore more insights from CareerOwl&trade;.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/blogs"
                className="bg-[#78355e] hover:bg-[#9d4577] text-white font-bold px-6 py-3 rounded-full transition-all duration-300"
              >
                Read More Articles
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related/Navigation Blogs */}
      {(previousBlog || nextBlog) && (
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Continue Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Previous Blog */}
            {previousBlog && (
              <Link
                href={`/blogs/${previousBlog.slug}`}
                className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#2563eb] transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <FiArrowLeft className="w-4 h-4" />
                  <span>Previous Article</span>
                </div>
                <h4 className="text-lg font-bold text-gray-800 group-hover:text-[#2563eb] transition-colors line-clamp-2">
                  {previousBlog.title}
                </h4>
              </Link>
            )}

            {/* Next Blog */}
            {nextBlog && (
              <Link
                href={`/blogs/${nextBlog.slug}`}
                className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#2563eb] transition-all duration-300 hover:shadow-lg md:text-right"
              >
                <div className="flex items-center gap-2 justify-end text-sm text-gray-500 mb-3">
                  <span>Next Article</span>
                  <FiArrowRight className="w-4 h-4" />
                </div>
                <h4 className="text-lg font-bold text-gray-800 group-hover:text-[#2563eb] transition-colors line-clamp-2">
                  {nextBlog.title}
                </h4>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Final CTA */}
      <CallToAction />
    </div>
  );
};

export default BlogDetailPage;