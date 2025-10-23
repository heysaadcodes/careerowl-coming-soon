import React from 'react';
import { 
  FiBriefcase, 
  FiUsers, 
  FiTrendingUp, 
  FiFileText, 
  FiTarget, 
  FiShield,
  FiCheckCircle,
  FiZap,
  FiAward,
  FiEye,
  FiMessageSquare,
  FiBarChart2
} from 'react-icons/fi';

const Features = () => {
  const employerFeatures = [
    {
      icon: FiZap,
      title: "Quick Job Posting",
      description: "Post jobs in minutes with guided tools and NOC wage insights for accurate compensation."
    },
    {
      icon: FiUsers,
      title: "Smart Applicant Tracking",
      description: "Manage applications effortlessly with built-in tracking and real-time status updates."
    },
    {
      icon: FiTrendingUp,
      title: "Boost Your Reach",
      description: "Promote jobs with banners, featured listings, and strategic sponsorship options."
    },
    {
      icon: FiBriefcase,
      title: "Multi-User Dashboards",
      description: "Collaborate seamlessly with team roles and customizable permissions."
    },
    {
      icon: FiAward,
      title: "Recruiter Mode",
      description: "Post on behalf of multiple clients with professional dual branding capabilities."
    },
    {
      icon: FiMessageSquare,
      title: "Direct Communication",
      description: "Connect with candidates directly and schedule interviews without hassle."
    },
    {
      icon: FiBarChart2,
      title: "Performance Analytics",
      description: "Track job performance, applicant flow, and ROI with detailed insights."
    }
  ];

  const applicantFeatures = [
    {
      icon: FiFileText,
      title: "Smart Resume Builder",
      description: "Create or upload multiple resume versions tailored to different opportunities."
    },
    {
      icon: FiTarget,
      title: "AI Match Scoring",
      description: "Get powered match scores and actionable tips to improve your applications."
    },
    {
      icon: FiEye,
      title: "Stand Out Features",
      description: "Add photos or video resumes to make your application memorable and unique."
    },
    {
      icon: FiCheckCircle,
      title: "Application Tracker",
      description: "Monitor all applications, status updates, and employer feedback in one dashboard."
    },
    {
      icon: FiTrendingUp,
      title: "Skill Gap Insights",
      description: "Receive personalized recommendations to strengthen your profile and close skill gaps."
    },
    {
      icon: FiShield,
      title: "Privacy Options",
      description: "Apply anonymously with privacy controls and fairness features built-in."
    }
  ];

  const platformFeatures = [
    {
      icon: FiShield,
      title: "Verified Accounts",
      description: "Trust and safety through verified employer and recruiter verification."
    },
    {
      icon: FiCheckCircle,
      title: "Fraud Protection",
      description: "Advanced detection tools to protect applicants from scams and fraudulent listings."
    },
    {
      icon: FiUsers,
      title: "Accessible Platform",
      description: "Fully compliant with accessibility standards for inclusive job searching."
    },
    {
      icon: FiFileText,
      title: "Resources & Guides",
      description: "Access blogs, guides, and expert advice for hiring tips and career growth."
    },
    {
      icon: FiTrendingUp,
      title: "Transparent Pricing",
      description: "Affordable, straightforward pricing with no hidden fees or surprises."
    }
  ];

  const FeatureCard = ({ icon: Icon, title, description, accentColor }) => (
    <div className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#2563eb] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className={`w-12 h-12 ${accentColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-6 h-6 text-gray-800" />
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 mt-8 sm:mt-12 lg:mt-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-gray-800 mb-4">
            Powerful Features for <br /><span className="text-[#78355e]">Everyone</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A comprehensive platform designed to connect talent with opportunity seamlessly
          </p>
        </div>

        {/* For Employers & Recruiters */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-[#2563eb] text-white px-6 py-3 rounded-full font-bold text-lg inline-flex items-center gap-2 shadow-lg">
              <FiBriefcase className="w-5 h-5" />
              For Employers & Recruiters
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employerFeatures.map((feature, index) => (
              <FeatureCard 
                key={index} 
                {...feature} 
                accentColor="bg-[#78355e]/10"
              />
            ))}
          </div>
        </div>

        {/* For Applicants */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-[#2563eb] text-white px-6 py-3 rounded-full font-bold text-lg inline-flex items-center gap-2 shadow-lg">
              <FiUsers className="w-5 h-5" />
              For Applicants
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applicantFeatures.map((feature, index) => (
              <FeatureCard 
                key={index} 
                {...feature} 
                accentColor="bg-[#2563eb]/10"
              />
            ))}
          </div>
        </div>

        {/* For Everyone */}
        <div>
          <div className="flex items-center justify-center mb-8">
            <div className="bg-[#2563eb] text-white px-6 py-3 rounded-full font-bold text-lg inline-flex items-center gap-2 shadow-lg">
              <FiCheckCircle className="w-5 h-5" />
              For Everyone
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformFeatures.map((feature, index) => (
              <FeatureCard 
                key={index} 
                {...feature} 
                accentColor="bg-[#78355e]/10"
              />
            ))}
          </div>
        </div>       
      </div>
    </div>
  );
};

export default Features;