import React from 'react';
import { motion } from 'motion/react';
import { ABOUT_PARAGRAPHS, TECHNICAL_SKILLS, PERSONAL_INFO } from '../data/portfolio';

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto max-w-[1200px] px-6 py-20 sm:px-10 sm:py-28 lg:px-12 lg:py-32 border-t border-[#DEDDD7]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12 items-start">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="lg:col-span-5"
        >
          <h2
            id="about-heading"
            className="text-[clamp(1.85rem,3.2vw,2.75rem)] font-normal tracking-[-0.03em] text-[#171717] leading-[1.15]"
          >
            A little about me
          </h2>

          <div className="mt-8 pt-6 border-t border-[#DEDDD7] hidden lg:block max-w-[36ch]">
            <p className="text-[13px] font-medium text-[#171717]">
              Objective
            </p>
            <p className="mt-2 text-[14px] leading-[1.6] text-[#737373]">
              {PERSONAL_INFO.objective}
            </p>
          </div>
        </motion.div>

        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE_OUT_EXPO }}
            className="space-y-6"
          >
            {ABOUT_PARAGRAPHS.map((paragraph, index) => (
              <p
                key={index}
                className={`${
                  index === 0
                    ? 'text-[18px] sm:text-[20px] leading-[1.6] text-[#171717] font-normal'
                    : 'text-[16px] sm:text-[17px] leading-[1.7] text-[#737373]'
                } max-w-[62ch]`}
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.16, ease: EASE_OUT_EXPO }}
            className="mt-14 sm:mt-16 pt-10 border-t border-[#DEDDD7]"
          >
            <h3 className="text-[14px] font-medium text-[#171717] mb-6">
              Technical skills
            </h3>

            <dl className="divide-y divide-[#DEDDD7] border-t border-b border-[#DEDDD7]">
              {TECHNICAL_SKILLS.map((group) => (
                <div
                  key={group.category}
                  className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-12 gap-y-1.5 sm:gap-x-6 items-baseline"
                >
                  <dt className="sm:col-span-4 text-[14px] font-medium text-[#171717]">
                    {group.category}
                  </dt>
                  <dd className="sm:col-span-8 text-[15px] leading-[1.6] text-[#737373]">
                    {group.items.join(', ')}.
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
