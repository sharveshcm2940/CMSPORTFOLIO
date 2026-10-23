import React from 'react';
import { motion } from 'motion/react';
import {
  EXPERIENCE_LIST,
  ACHIEVEMENTS_LIST,
  EDUCATION_INFO,
  CERTIFICATIONS_LIST,
} from '../data/portfolio';

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const ExperienceSection: React.FC = () => {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="mx-auto max-w-[1200px] px-6 py-20 sm:px-10 sm:py-28 lg:px-12 lg:py-32 border-t border-[#DEDDD7]"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        className="mb-16 sm:mb-20"
      >
        <h2
          id="experience-heading"
          className="text-[clamp(1.85rem,3.2vw,2.75rem)] font-normal tracking-[-0.03em] text-[#171717] leading-[1.15]"
        >
          Experience & recognition
        </h2>
      </motion.div>

      <div className="divide-y divide-[#DEDDD7] border-t border-b border-[#DEDDD7]">
        {/* EXPERIENCE */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-x-12 items-start"
        >
          <div className="lg:col-span-4">
            <h3 className="text-[14px] font-medium text-[#737373]">
              Experience
            </h3>
          </div>

          <div className="lg:col-span-8 space-y-10">
            {EXPERIENCE_LIST.map((exp) => (
              <div key={`${exp.company}-${exp.role}`}>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h4 className="text-[19px] sm:text-[21px] font-normal tracking-[-0.02em] text-[#171717]">
                    {exp.role}{' '}
                    <span className="text-[#737373]">— {exp.company}</span>
                  </h4>
                  <span className="text-[13.5px] text-[#737373] tabular-nums shrink-0">
                    {exp.period}
                  </span>
                </div>

                <ul className="mt-5 space-y-2.5">
                  {exp.highlights.map((item) => (
                    <li
                      key={item}
                      className="text-[15px] leading-[1.65] text-[#737373] flex items-start gap-3"
                    >
                      <span aria-hidden="true" className="text-[#52634F] select-none">
                        —
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ACHIEVEMENTS */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-x-12 items-start"
        >
          <div className="lg:col-span-4">
            <h3 className="text-[14px] font-medium text-[#737373]">
              Achievements
            </h3>
          </div>

          <div className="lg:col-span-8 divide-y divide-[#DEDDD7]">
            {ACHIEVEMENTS_LIST.map((achievement) => (
              <div
                key={achievement.title}
                className="py-6 first:pt-0 last:pb-0"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="text-[18px] font-normal tracking-[-0.015em] text-[#171717]">
                    {achievement.title}
                  </h4>
                  <span className="text-[13.5px] font-medium text-[#52634F]">
                    {achievement.distinction}
                  </span>
                </div>
                {achievement.description && (
                  <p className="mt-2 text-[15px] leading-[1.6] text-[#737373] max-w-[58ch]">
                    {achievement.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* EDUCATION */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-x-12 items-start"
        >
          <div className="lg:col-span-4">
            <h3 className="text-[14px] font-medium text-[#737373]">
              Education
            </h3>
          </div>

          <div className="lg:col-span-8">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <h4 className="text-[18px] sm:text-[20px] font-normal tracking-[-0.015em] text-[#171717]">
                {EDUCATION_INFO.institution}
              </h4>
              <span className="text-[13.5px] text-[#737373] tabular-nums shrink-0">
                {EDUCATION_INFO.period}
              </span>
            </div>

            <p className="mt-2 text-[15px] text-[#171717]/85">
              {EDUCATION_INFO.degree}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13.5px] text-[#737373] tabular-nums">
              <span>Current semester: {EDUCATION_INFO.semester}</span>
              <span aria-hidden="true">·</span>
              <span>CGPA: {EDUCATION_INFO.cgpa}</span>
            </div>
          </div>
        </motion.div>

        {/* CERTIFICATIONS */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-x-12 items-start"
        >
          <div className="lg:col-span-4">
            <h3 className="text-[14px] font-medium text-[#737373]">
              Certifications
            </h3>
          </div>

          <div className="lg:col-span-8">
            <ul className="space-y-3">
              {CERTIFICATIONS_LIST.map((cert) => (
                <li
                  key={`${cert.issuer}-${cert.subject}`}
                  className="text-[15px] leading-[1.6] text-[#171717] flex flex-wrap items-baseline gap-x-2"
                >
                  <span className="font-medium">{cert.issuer}</span>
                  <span aria-hidden="true" className="text-[#737373]">
                    —
                  </span>
                  <span className="text-[#737373]">{cert.subject}.</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
