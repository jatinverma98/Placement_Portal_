import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import CursorGlow from '../components/landing/CursorGlow';
import ScrollProgress from '../components/landing/ScrollProgress';
import StickyNavbar from '../components/landing/StickyNavbar';
import HeroSection from '../components/landing/HeroSection';
import TrustedCompanies from '../components/landing/TrustedCompanies';
import FeaturesSection from '../components/landing/FeaturesSection';
import StatsSection from '../components/landing/StatsSection';
import SuccessStories from '../components/landing/SuccessStories';
import LatestJobs from '../components/landing/LatestJobs';
import TimelineSection from '../components/landing/TimelineSection';
import WhyChooseUs from '../components/landing/WhyChooseUs';
import TopRecruiters from '../components/landing/TopRecruiters';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import FAQSection from '../components/landing/FAQSection';
import NewsletterSection from '../components/landing/NewsletterSection';
import CallToAction from '../components/landing/CallToAction';
import LandingFooter from '../components/landing/LandingFooter';
import AuthModal from '../components/auth/AuthModal';

const LandingPage = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [authModal, setAuthModal] = useState({
    isOpen: false,
    initialTab: 'login',
  });
  const location = useLocation();

  const openAuthModal = (tab = 'login') => {
    setAuthModal({ isOpen: true, initialTab: tab });
  };

  const closeAuthModal = () => {
    setAuthModal({ ...authModal, isOpen: false });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const authTab = params.get('auth');
    if (authTab === 'login' || authTab === 'register') {
      setAuthModal({ isOpen: true, initialTab: authTab });
    }
  }, [location.search]);


  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Initial page loading reveal transition
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 300);

    return () => {
      lenis.destroy();
      clearTimeout(timer);
    };
  }, []);

  if (pageLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 rounded-20 border-4 border-blue-500 border-t-transparent animate-spin mb-4" />
        <span className="font-heading font-bold text-lg tracking-wider">Placement<span className="text-blue-500">Portal</span></span>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {/* Reading Progress Indicator Bar */}
      <ScrollProgress />

      {/* Mouse Follower Light Glow */}
      <CursorGlow />

      {/* Auth Modal Overlay */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={closeAuthModal}
        initialTab={authModal.initialTab}
      />

      {/* 1. Sticky Navbar */}
      <StickyNavbar onOpenAuth={openAuthModal} />

      {/* 2. Hero Section */}
      <HeroSection onOpenAuth={openAuthModal} />

      {/* 3. Trusted Companies */}
      <TrustedCompanies />

      {/* 4. Why Choose Us */}
      <WhyChooseUs onOpenAuth={openAuthModal} />

      {/* 5. Features Grid */}
      <FeaturesSection />

      {/* 6. Platform Statistics */}
      <StatsSection />

      {/* 7. Placement Process Timeline */}
      <TimelineSection />

      {/* 8. Featured Jobs */}
      <LatestJobs onOpenAuth={openAuthModal} />

      {/* 9. Top Recruiters */}
      <TopRecruiters onOpenAuth={openAuthModal} />

      {/* 10. Student Success Stories */}
      <SuccessStories />

      {/* 11. Testimonials Carousel */}
      <TestimonialsSection />

      {/* 12. FAQ */}
      <FAQSection />

      {/* 13. Call To Action Banner */}
      <CallToAction onOpenAuth={openAuthModal} />

      {/* 14. Newsletter Card */}
      <NewsletterSection />

      {/* 15. Corporate Footer */}
      <LandingFooter onOpenAuth={openAuthModal} />
    </div>
  );
};

export default LandingPage;
