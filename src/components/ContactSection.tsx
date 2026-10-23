import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolio';

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const mailtoHref = `mailto:${encodeURIComponent(
    PERSONAL_INFO.email
  )}?subject=${encodeURIComponent(
    'Opportunity / Collaboration — C. M. Sharvesh'
  )}`;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="mx-auto max-w-[1200px] px-6 pt-20 pb-14 sm:px-10 sm:pt-28 sm:pb-16 lg:px-12 lg:pt-36 lg:pb-20 border-t border-[#DEDDD7]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12 items-start">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="lg:col-span-7"
        >
          <h2
            id="contact-heading"
            className="text-[clamp(2.15rem,4.5vw,3.75rem)] font-normal tracking-[-0.035em] text-[#171717] leading-[1.08] text-balance"
          >
            Have something worth building?
          </h2>

          <p className="mt-6 text-[16px] sm:text-[18px] leading-[1.65] text-[#737373] max-w-[52ch]">
            I'm interested in opportunities involving machine learning, software engineering, and products that solve practical problems. Feel free to reach out.
          </p>

          <div className="mt-9 sm:mt-11 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={mailtoHref}
              className="group inline-flex items-center gap-2 py-2 text-[17px] sm:text-[18px] font-medium text-[#171717] border-b border-[#171717] hover:border-[#52634F] hover:text-[#52634F] transition-colors duration-200 whitespace-nowrap shrink-0"
            >
              <span>Let's talk</span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 py-2 text-[14px] text-[#737373] hover:text-[#171717] transition-colors duration-200 whitespace-nowrap shrink-0"
            >
              <span>{copied ? 'Email copied to clipboard' : 'Copy email address'}</span>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_EXPO }}
          className="lg:col-span-5 lg:pt-2"
        >
          <dl className="divide-y divide-[#DEDDD7] border-t border-b border-[#DEDDD7]">
            <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <dt className="text-[13px] text-[#737373]">
                Email
              </dt>
              <dd>
                <a
                  href={mailtoHref}
                  className="text-[15px] text-[#171717] hover:text-[#52634F] transition-colors"
                >
                  {PERSONAL_INFO.email}
                </a>
              </dd>
            </div>

            <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <dt className="text-[13px] text-[#737373]">
                Phone
              </dt>
              <dd>
                <a
                  href={PERSONAL_INFO.phoneHref}
                  className="text-[15px] tabular-nums text-[#171717] hover:text-[#52634F] transition-colors"
                >
                  {PERSONAL_INFO.phone}
                </a>
              </dd>
            </div>

            <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <dt className="text-[13px] text-[#737373]">
                LinkedIn
              </dt>
              <dd>
                <a
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-[15px] text-[#171717] hover:text-[#52634F] transition-colors"
                >
                  <span>c-m-sharvesh</span>
                  <span
                    aria-hidden="true"
                    className="inline-block text-[13px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    ↗
                  </span>
                </a>
              </dd>
            </div>

            <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <dt className="text-[13px] text-[#737373]">
                GitHub
              </dt>
              <dd>
                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-[15px] text-[#171717] hover:text-[#52634F] transition-colors"
                >
                  <span>sharveshcm2940</span>
                  <span
                    aria-hidden="true"
                    className="inline-block text-[13px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    ↗
                  </span>
                </a>
              </dd>
            </div>
          </dl>
        </motion.div>
      </div>

      <div className="mt-20 sm:mt-28 pt-8 border-t border-[#DEDDD7] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[13px] text-[#737373]">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-[#171717] font-medium">{PERSONAL_INFO.name}</span>
          <span aria-hidden="true">·</span>
          <span>{PERSONAL_INFO.location}</span>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-6">
          <span className="tabular-nums">© {currentYear}</span>
          <a
            href="#top"
            className="text-[#737373] hover:text-[#171717] transition-colors whitespace-nowrap shrink-0"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
};
