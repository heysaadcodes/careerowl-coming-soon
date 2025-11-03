"use client";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiUser, FiTag, FiCalendar, FiArrowLeftCircle } from "react-icons/fi";
import blogsData from "@/data/blogs.json";
import CallToAction from "@/components/CallToAction";
import Image from "next/image";
import Head from "next/head";

const BlogDetailPage = () => {
  const params = useParams();
  const slug = params.slug;

  // Find the current blog
  const blog = blogsData.blogs.find((b) => b.slug === slug);
  const fullUrl = `https://thecareerowl.ca/blogs/${slug}`;

  // Generate structured data for the blog
  const generateStructuredData = () => {
    const structuredData = [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "CareerOwl Ltd.",
        legalName: "CareerOwl Ltd.",
        url: "https://thecareerowl.ca/new-owl-logo.svg",
        foundingDate: "1999",
        address: {
          "@type": "PostalAddress",
          addressCountry: "CA",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "media relations",
            email: "press@thecareerowl.ca",
            availableLanguage: ["en-CA", "fr-CA"],
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "CareerOwl",
        url: "https://thecareerowl.ca/",
        inLanguage: "en-CA",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://thecareerowl.ca/search?q={query}",
          "query-input": "required name=query",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "PressRelease",
        headline: blog.title,
        alternativeHeadline:
          blog.description || blog.content[0]?.text?.substring(0, 100) + "...",
        description:
          blog.description || blog.content[0]?.text?.substring(0, 160) + "...",
        articleSection: blog.category,
        inLanguage: "en-CA",
        isAccessibleForFree: true,
        datePublished: new Date(blog.date).toISOString(),
        dateModified: new Date(blog.date).toISOString(),
        url: fullUrl,
        mainEntityOfPage: fullUrl,
        publisher: {
          "@type": "Organization",
          name: "CareerOwl Ltd.",
          logo: {
            "@type": "ImageObject",
            url: "https://thecareerowl.ca/new-owl-logo.svg",
          },
          url: "https://thecareerowl.ca/",
        },
        image: [
          {
            "@type": "ImageObject",
            url: `https://thecareerowl.ca${blog.image}`,
            width: 1200,
            height: 630,
          },
        ],
        author: {
          "@type": "Organization",
          name: blog.author || "CareerOwl Ltd.",
        },
        about: [
          {
            "@type": "Thing",
            name: blog.category,
          },
          {
            "@type": "Thing",
            name: "Career development",
          },
          {
            "@type": "Thing",
            name: "Canadian job market",
          },
        ],
        keywords: `${blog.category}, CareerOwl, Canadian job board, career development, ${blog.tags?.join(", ") || ""}`,
        articleBody:
          blog.content
            .map((section) => section.text)
            .join(" ")
            .substring(0, 500) + "...",
      },
    ];

    // Add FAQ structured data for specific blog posts
    if (blog.slug === "careerowl-relaunch-press-statement") {
      structuredData.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is CareerOwl closing?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. The legacy non-profit site reached end of life in 2025. CareerOwl continues under CareerOwl Ltd. with a refreshed platform and features.",
            },
          },
          {
            "@type": "Question",
            name: "Who owns CareerOwl now?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "CareerOwl Ltd. is the official owner and steward of the CareerOwl brand.",
            },
          },
          {
            "@type": "Question",
            name: "When is the new CareerOwl launching?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Public launch is planned for January 2026. Early Access sign-ups are available at thecareerowl.ca.",
            },
          },
          {
            "@type": "Question",
            name: "What will the new platform include?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "AI-driven job matching aligned to Canada's NOC, integrated job descriptions, Job Bank wage benchmarks to support LMIA compliance, and dashboards for employers and recruiters.",
            },
          },
          {
            "@type": "Question",
            name: "Is CareerOwl Canadian-owned and operated?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. CareerOwl Ltd. is Canadian-owned and committed to supporting opportunities across all provinces and territories.",
            },
          },
        ],
      });
    }

    return structuredData;
  };

  const structuredData = generateStructuredData();

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Blog Not Found
          </h1>
          <Link href="/blogs" className="text-[#78355e] hover:underline">
            Return to Blogs
          </Link>
        </div>
      </div>
    );
  }

  // Get related blogs (next and previous)
  const currentIndex = blogsData.blogs.findIndex((b) => b.slug === slug);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <>
      <Head>
        <title>{blog.title} | CareerOwl</title>
        <meta
          name="description"
          content={
            blog.description || blog.content[0]?.text?.substring(0, 160) + "..."
          }
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={fullUrl} />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={blog.title} />
        <meta
          property="og:description"
          content={
            blog.description || blog.content[0]?.text?.substring(0, 160) + "..."
          }
        />
        <meta property="og:image" content={blog.image} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="CareerOwl" />
        <meta property="og:locale" content="en_CA" />

        {/* Additional OG Tags for Articles */}
        <meta
          property="article:published_time"
          content={new Date(blog.date).toISOString()}
        />
        <meta
          property="article:modified_time"
          content={new Date(blog.date).toISOString()}
        />
        <meta property="article:author" content={blog.author} />
        <meta property="article:section" content={blog.category} />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta
          name="twitter:description"
          content={
            blog.description || blog.content[0]?.text?.substring(0, 160) + "..."
          }
        />
        <meta name="twitter:image" content={blog.image} />
        <meta name="twitter:site" content="@careerowl" />

        {/* Additional Meta Tags */}
        <meta name="author" content={blog.author} />
        <meta
          name="keywords"
          content={`career, ${blog.category}, ${blog.tags?.join(", ") || ""}, Canadian jobs`}
        />

        {/* Structured Data */}
        {structuredData.map((data, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        ))}
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 pt-8 flex items-center justify-between">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-black hover:text-gray-800 font-semibold transition-colors"
          >
            <FiArrowLeftCircle className="w-6 h-6" />
            <span className="hidden lg:block">Back to Blogs</span>
          </Link>
          <Image
            src="/careerowl-logo-hor.svg"
            alt="The Career Owl"
            width={150}
            height={30}
            className="h-8 w-auto"
            priority
          />
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
          <div className="relative h-28 sm:h-80 lg:h-96 bg-gradient-to-br from-[#78355e] to-[#9d4577] rounded-2xl overflow-hidden mb-12 shadow-xl">
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
                case "heading":
                  return (
                    <h2
                      key={index}
                      className="text-3xl sm:text-4xl font-bold text-gray-800 mt-12 mb-6 first:mt-0"
                    >
                      {section.text}
                    </h2>
                  );
                case "subheading":
                  return (
                    <h3
                      key={index}
                      className="text-2xl sm:text-3xl font-bold text-[#78355e] mt-8 mb-4"
                    >
                      {section.text}
                    </h3>
                  );
                case "paragraph":
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
        </div>

        {/* Final CTA */}
        <CallToAction />
      </div>
    </>
  );
};

export default BlogDetailPage;
