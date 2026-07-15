// FILE: frontend/src/pages/Home.jsx

import React, { useEffect, useMemo } from "react";
import SEO from '../components/common/SEO';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  RocketLaunchIcon,
  CalendarIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  UserIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import Button from "../components/common/Button";
import StatsCard from "../components/common/StatsCard";
import FeatureCard from "../components/common/FeatureCard";
import LoanProductCard from "../components/common/LoanProductCard";
import TestimonialCard from "../components/common/TestimonialCard";
import FAQItem from "../components/common/FAQItem";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { fetchHomepageData } from "../store/homeSlice";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const Home = () => {
  const dispatch = useDispatch();
  const [heroRef, isHeroVisible] = useIntersectionObserver();
  const [statsRef, isStatsVisible] = useIntersectionObserver();

  // Redux state
  const {
    hero,
    stats,
    features,
    steps,
    testimonials,
    faqs,
    loanProducts,
    loading,
    error,
  } = useSelector((state) => state.home);

  // For now, we'll use a mock auth state
  const isAuthenticated = false;

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchHomepageData());
  }, [dispatch]);

  // Stats data with icons - Memoized to recalculate dynamically when stats load
  const statsData = useMemo(() => {
    if (!stats) return [];

    console.log("Raw stats data received from backend:", stats);

    return [
      {
        number: stats.customers || "10,000+",
        label: stats.customersLabel || "Happy Customers",
        icon: <UserIcon className="w-6 h-6" />,
      },
      {
        number: (() => {
          const val = stats.disbursed;
          if (!val) return "₦50 Billion";
          
          // Match the numeric part (including decimals/commas) and any text scale (like Billion/Million/B/M)
          const match = String(val).match(/([\d.,]+)[^\da-zA-Z]*(Billion|Million|Thousand|M|B|K)?/i);
          
          if (match) {
            const number = match[1];
            const scale = match[2] ? ` ${match[2]}` : "";
            return `₦${number}${scale}`;
          }

          // Fallback if regex parsing completely fails
          return String(val);
        })(),
        label: stats.disbursedLabel || "Disbursed to Date",
        icon: <CurrencyDollarIcon className="w-6 h-6" />,
      },
      {
        number: stats.approvalRate || "98%",
        label: stats.approvalRateLabel || "Approval Rate",
        icon: <ShieldCheckIcon className="w-6 h-6" />,
      },
      {
        number: stats.processingTime || "24-Hour",
        label: stats.processingTimeLabel || "Average Processing",
        icon: <CalendarIcon className="w-6 h-6" />,
      },
    ];
  }, [stats]);

  // Features icons mapping
  const featureIcons = {
    RocketLaunchIcon: RocketLaunchIcon,
    CalendarIcon: CalendarIcon,
    ShieldCheckIcon: ShieldCheckIcon,
    LockClosedIcon: LockClosedIcon,
  };

  // Loan product icons mapping
  const productIcons = {
    UserIcon: UserIcon,
    BriefcaseIcon: BriefcaseIcon,
    CurrencyDollarIcon: CurrencyDollarIcon,
    AcademicCapIcon: AcademicCapIcon,
  };

  // ========================================================
  // SCHEMAS DEFINED BEFORE THE RETURN STATEMENT
  // ========================================================
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LoanFlow",
    "description": "LoanFlow is a fintech platform providing fast, flexible, and affordable loans to individuals and businesses across Nigeria.",
    "url": "https://loanflow.com",
    "logo": "https://loanflow.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+2348000000000",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://facebook.com/loanflow",
      "https://twitter.com/loanflow",
      "https://linkedin.com/company/loanflow"
    ]
  };

  const financialProductSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": "LoanFlow Loans",
    "description": "Personal and business loans with competitive rates",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "NGN",
      "availability": "https://schema.org/InStock"
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="animate-pulse space-y-12">
            {/* Hero skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                <div className="flex gap-4">
                  <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                  <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                </div>
              </div>
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            </div>

            {/* Stats skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Get Fast & Flexible Loans Online"
        description="Apply for personal, business, and salary advance loans with competitive rates. Get approved within 24 hours. Trusted by 10,000+ customers."
        schema={[organizationSchema, financialProductSchema]}
      />
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="min-h-screen bg-gray-50 dark:bg-gray-900"
      >
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          variants={fadeInUp}
          className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 py-20 lg:py-28"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="space-y-6">
                <motion.h1
                  variants={fadeInUp}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
                >
                  {hero?.heading ||
                    "Get Fast, Flexible Loans When You Need Them Most"}
                </motion.h1>
                <motion.p
                  variants={fadeInUp}
                  className="text-lg text-blue-100 leading-relaxed"
                >
                  {hero?.subheading ||
                    "Apply in minutes, get approval within 24 hours, and access funds to grow your business or handle personal needs"}
                </motion.p>
                <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                  <Link to={isAuthenticated ? "/dashboard" : "/auth/register"}>
                    <Button
                      variant="primary"
                      size="lg"
                      className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg transition-all duration-200 border-none"
                    >
                      {isAuthenticated ? "Go to Dashboard" : "Apply Now"}
                    </Button>
                  </Link>
                  <a href="#features">
                    <Button
                      variant="ghost"
                      size="lg"
                      className="text-white border border-white hover:bg-white/10"
                    >
                      Learn More
                    </Button>
                  </a>
                </motion.div>
              </div>

              {/* Image */}
              <motion.div variants={fadeInUp} className="flex justify-center">
                <div className="w-full max-w-md">
                  <img
                    src={hero?.imageUrl || "/assets/hero-banner.webp"}
                    alt="LoanFlow Hero"
                    className="w-full h-auto rounded-xl shadow-2xl"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
        </motion.section>

        {/* Trust Stats Section */}
        <motion.section
          ref={statsRef}
          variants={fadeInUp}
          className="py-16 bg-white dark:bg-gray-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {statsData.map((stat, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <StatsCard
                    number={stat.number}
                    label={stat.label}
                    icon={stat.icon}
                    delay={index * 300}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          id="features"
          variants={fadeInUp}
          className="py-16 bg-gray-50 dark:bg-gray-900"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.h2
                variants={fadeInUp}
                className="text-3xl font-bold text-gray-900 dark:text-white"
              >
                Why Choose LoanFlow?
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-gray-600 dark:text-gray-400 mt-2"
              >
                We make borrowing simple, fast, and transparent
              </motion.p>
            </div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {features &&
                features.map((feature, index) => {
                  const IconComponent =
                    featureIcons[feature.icon] || RocketLaunchIcon;
                  return (
                    <motion.div key={index} variants={fadeInUp}>
                      <FeatureCard
                        icon={<IconComponent className="w-6 h-6" />}
                        title={feature.title}
                        description={feature.description}
                        color={feature.color || "blue"}
                      />
                    </motion.div>
                  );
                })}
            </motion.div>
          </div>
        </motion.section>

        {/* How It Works Section */}
        <motion.section
          variants={fadeInUp}
          className="py-16 bg-white dark:bg-gray-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.h2
                variants={fadeInUp}
                className="text-3xl font-bold text-gray-900 dark:text-white"
              >
                How It Works
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-gray-600 dark:text-gray-400 mt-2"
              >
                Get your loan in three simple steps
              </motion.p>
            </div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {steps &&
              steps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-2xl font-bold mx-auto mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {step.description}
                  </p>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Loan Products Section */}
      <motion.section
        variants={fadeInUp}
        className="py-16 bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold text-gray-900 dark:text-white"
            >
              Our Loan Products
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-600 dark:text-gray-400 mt-2"
            >
              Find the perfect loan for your needs
            </motion.p>
          </div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {loanProducts &&
              loanProducts.map((product, index) => (
                <motion.div key={product._id} variants={fadeInUp}>
                  <LoanProductCard product={product} />
                </motion.div>
              ))}
          </motion.div>

          <div className="text-center mt-8">
            <Link to="/loan-products">
              <Button variant="outline" size="md">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        variants={fadeInUp}
        className="py-16 bg-white dark:bg-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold text-gray-900 dark:text-white"
            >
              What Our Customers Say
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-600 dark:text-gray-400 mt-2"
            >
              Real stories from real people
            </motion.p>
          </div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials &&
              testimonials.map((testimonial, index) => (
                <motion.div key={testimonial._id} variants={fadeInUp}>
                  <TestimonialCard testimonial={testimonial} />
                </motion.div>
              ))}
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        variants={fadeInUp}
        className="py-16 bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold text-gray-900 dark:text-white"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-600 dark:text-gray-400 mt-2"
            >
              Get answers to common questions
            </motion.p>
          </div>

          <motion.div
            variants={staggerContainer}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm divide-y divide-gray-200 dark:divide-gray-700"
          >
            {faqs &&
              faqs.map((faq, index) => (
                <motion.div key={faq._id || index} variants={fadeInUp}>
                  <FAQItem
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={index === 0}
                  />
                </motion.div>
              ))}
          </motion.div>

          <div className="text-center mt-8">
            <Link to="/faq">
              <Button variant="ghost" size="md">
                View All FAQs
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        variants={fadeInUp}
        className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold text-white mb-4"
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto"
          >
            Join thousands of satisfied customers who have achieved their goals
            with LoanFlow
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link to={isAuthenticated ? "/dashboard" : "/auth/register"}>
              <Button
                variant="ghost"
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 font-semibold px-8 py-3 rounded-lg shadow-md"
              >
                {isAuthenticated ? "Go to Dashboard" : "Get Started Today"}
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  </>
  );
};

export default Home;