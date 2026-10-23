import React from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolio';

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const Hero: React.FC = () => {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative mx-auto max-w-[1200px] px-6 pt-16 pb-20 sm:px-10 sm:pt-24 sm:pb-28 lg:px-12 lg:pt-32 lg:pb-36"
    >
      {/* Editorial Asymmetric Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12 items-end">
        {/* Main Typographic Column */}
        <div className="lg:col-span-9">
          {/* Small Introductory Line */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            className="text-[12px] sm:text-[13px] font-medium tracking-[0.14em] uppercase text-[#737373] mb-6 sm:mb-8"
          >
            {PERSONAL_INFO.roleLine}
          </motion.p>

          {/* Dominant Expressive Headline with Deliberate Line Break */}
          <h1 className="font-normal tracking-[-0.035em] text-[#171717] text-[clamp(2.35rem,5.4vw,4.65rem)] leading-[1.06] text-balance">
            <motion.span
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: EASE_OUT_EXPO }}
              className="block"
            >
              {PERSONAL_INFO.headlineLine1}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16, ease: EASE_OUT_EXPO }}
              className="block text-[#171717]"
            >
              {PERSONAL_INFO.headlineLine2}
            </motion.span>
          </h1>
        </div>

        {/* Asymmetric Supporting Column & Actions */}
        <div className="lg:col-span-7 lg:col-start-5 pt-2 sm:pt-6">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease: EASE_OUT_EXPO }}
            className="text-[17px] sm:text-[19px] leading-[1.65] text-[#171717]/85 font-normal max-w-[56ch]"
          >
            {PERSONAL_INFO.heroIntro}
          </motion.p>

          {/* Two Understated Text-Based Actions */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease: EASE_OUT_EXPO }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2 py-2 text-[15px] font-medium text-[#171717] border-b border-[#171717] hover:border-[#52634F] hover:text-[#52634F] transition-colors duration-200 whitespace-nowrap shrink-0"
            >
              <span>Explore my work</span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </a>

            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 py-2 text-[15px] font-normal text-[#737373] border-b border-transparent hover:border-[#737373] hover:text-[#171717] transition-colors duration-200 whitespace-nowrap shrink-0"
            >
              <span>Get in touch</span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom Editorial Footnote Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.42, ease: EASE_OUT_EXPO }}
        className="mt-20 sm:mt-28 pt-6 border-t border-[#DEDDD7] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[13px] text-[#737373]"
      >
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-[#171717] font-medium">{PERSONAL_INFO.locationShort}</span>
          {PERSONAL_INFO.showAvailability && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-[#52634F] font-medium">{PERSONAL_INFO.availability}</span>
            </>
          )}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-8">
          <span className="hidden md:inline text-[#737373]">
            B.Tech Information Technology · SVCE
          </span>
          <a
            href="#work"
            className="group inline-flex items-center gap-1.5 text-[#737373] hover:text-[#171717] transition-colors whitespace-nowrap shrink-0"
          >
            <span>Scroll</span>
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 group-hover:translate-y-0.5"
            >
              ↓
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  );
};
