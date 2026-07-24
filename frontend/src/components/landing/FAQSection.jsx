import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

const faqs = [
  {
    q: 'How do students register on the Placement Portal?',
    a: 'Students can click the "Register Free" button on the top right, select the Student role, fill in their full name, email, roll number, and academic CGPA details. Registration is completely free.',
  },
  {
    q: 'Can companies directly post job openings?',
    a: 'Yes! Recruiters and HR managers can register under the "Company" role. Once verified by the portal admin, companies can create job postings, set eligibility criteria (min CGPA, batch, branches), and review applications.',
  },
  {
    q: 'How does the AI Resume Checker work?',
    a: 'The built-in AI tool scans uploaded PDF resumes against target job descriptions, checking for formatting consistency, technical keywords, ATS readability, and section completeness.',
  },
  {
    q: 'Is my academic data and resume kept private?',
    a: 'Absolutely. We enforce encrypted JWT authentication and strict role-based authorization so that your resume and personal data are only accessible to verified companies you explicitly apply to.',
  },
  {
    q: 'What happens if a student does not meet the minimum CGPA requirement for a job?',
    a: 'The smart matching system automatically checks candidate CGPA before allowing application submission. If a student does not meet the minimum criteria set by the employer, the system provides helpful feedback.',
  },
  {
    q: 'Are off-campus placement drives also listed on the portal?',
    a: 'Yes! Placement cell administrators post both on-campus pooled drives and off-campus recruitment drives under the Placement Drives section.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            Frequently Asked Questions
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            Got Questions? <span className="gradient-text">We've Got Answers</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Everything you need to know about navigating the placement portal, applying for jobs, and managing company profiles.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`rounded-20 border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-blue-300 shadow-md shadow-blue-500/5'
                    : 'bg-white/80 hover:bg-white border-slate-200/80 shadow-xs'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-bold text-slate-900 text-base sm:text-lg">
                    {faq.q}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                      isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-0 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 mt-2 pt-4 font-normal">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
