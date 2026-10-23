import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { SELECTED_PROJECTS, SECONDARY_PROJECTS, ProjectItem } from '../data/portfolio';
import {
  DealFlow360Dashboard,
  LawCrmDashboard,
  ScholarHiveDashboard,
  ApartmentDashboard,
} from './LiveDashboards';

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const ProjectsSection: React.FC = () => {
  const featuredProject = SELECTED_PROJECTS[0];
  const otherSelectedProjects = SELECTED_PROJECTS.slice(1);

  const renderProjectDashboard = (projectId: string) => {
    switch (projectId) {
      case 'deal-flow-360':
        return <DealFlow360Dashboard />;
      case 'law-crm':
        return <LawCrmDashboard />;
      case 'scholarhive':
        return <ScholarHiveDashboard />;
      default:
        return null;
    }
  };

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="mx-auto max-w-[1200px] px-6 py-20 sm:px-10 sm:py-28 lg:px-12 lg:py-32 border-t border-[#DEDDD7]"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-y-4 lg:gap-x-12 items-baseline mb-16 sm:mb-24"
      >
        <div className="lg:col-span-5">
          <h2
            id="work-heading"
            className="text-[clamp(1.85rem,3.2vw,2.75rem)] font-normal tracking-[-0.03em] text-[#171717] leading-[1.15]"
          >
            Selected work
          </h2>
        </div>
        <div className="lg:col-span-7">
          <p className="text-[16px] sm:text-[17px] leading-[1.6] text-[#737373] max-w-[52ch]">
            A few things I've built across machine learning and software development.
          </p>
        </div>
      </motion.div>

      {/* PROJECT 01 — HAILMARY */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
        className="pb-16 sm:pb-20 border-b border-[#DEDDD7]"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 border-b border-[#DEDDD7]/60">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] text-[#737373]">
            <span className="text-[#171717] font-medium tabular-nums">
              {featuredProject.index}
            </span>
            <span aria-hidden="true">·</span>
            <span>{featuredProject.category}</span>
            {featuredProject.recognition && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-[#52634F] font-medium">
                  {featuredProject.recognition}
                </span>
              </>
            )}
          </div>

          <a
            href={featuredProject.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-[#171717] hover:text-[#52634F] transition-colors whitespace-nowrap shrink-0"
          >
            <span>View source ({featuredProject.repoName.split('/')[1]})</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-12 items-start">
          <div className="lg:col-span-5">
            <h3 className="text-[clamp(1.75rem,2.8vw,2.5rem)] font-normal tracking-[-0.03em] text-[#171717] leading-[1.12]">
              {featuredProject.name}
            </h3>
            <p className="mt-3 text-[13.5px] text-[#737373] leading-[1.6]">
              {featuredProject.technologies.join(' · ')}
            </p>
          </div>

          <div className="lg:col-span-7">
            <p className="text-[17px] sm:text-[19px] leading-[1.6] text-[#171717] font-normal">
              {featuredProject.description}
            </p>

            <ul className="mt-6 space-y-2.5 border-t border-[#DEDDD7] pt-5">
              {featuredProject.details.map((detail) => (
                <li
                  key={detail}
                  className="text-[15px] leading-[1.6] text-[#737373] flex items-start gap-3"
                >
                  <span aria-hidden="true" className="text-[#52634F] select-none">
                    —
                  </span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.article>

      {/* PROJECTS 02, 03, 04 */}
      <div className="divide-y divide-[#DEDDD7]">
        {otherSelectedProjects.map((project: ProjectItem) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            className="py-16 sm:py-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-x-12 items-start">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-2.5 text-[13px] text-[#737373] mb-2.5">
                  <span className="text-[#171717] font-medium tabular-nums">
                    {project.index}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{project.category}</span>
                </div>
                <h3 className="text-[26px] sm:text-[30px] font-normal tracking-[-0.025em] text-[#171717] leading-[1.2]">
                  {project.name}
                </h3>
                <p className="mt-2.5 text-[13.5px] text-[#737373]">
                  {project.technologies.join(' · ')}
                </p>

                <div className="mt-5">
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[#171717] border-b border-[#171717]/30 pb-0.5 hover:border-[#52634F] hover:text-[#52634F] transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>View source ({project.repoName.split('/')[1]})</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7">
                <p className="text-[16px] sm:text-[18px] leading-[1.65] text-[#171717]/90 max-w-[60ch]">
                  {project.description}
                </p>

                <ul className="mt-5 space-y-2 border-t border-[#DEDDD7] pt-4">
                  {project.details.map((item) => (
                    <li
                      key={item}
                      className="text-[14.5px] leading-[1.6] text-[#737373] flex items-start gap-2.5"
                    >
                      <span aria-hidden="true" className="text-[#52634F] select-none">
                        —
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {project.hasLiveDashboard && (
              <div className="mt-10">
                {renderProjectDashboard(project.id)}
              </div>
            )}
          </motion.article>
        ))}
      </div>

      {/* More Projects */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
        className="mt-6 pt-14 border-t border-[#DEDDD7]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-x-12 items-start">
          <div className="lg:col-span-5">
            <h3 className="text-[14px] font-medium text-[#737373]">
              More projects
            </h3>
          </div>
          <div className="lg:col-span-7 divide-y divide-[#DEDDD7]">
            {SECONDARY_PROJECTS.map((item) => (
              <div key={item.id} className="py-2 first:pt-0 last:pb-0">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h4 className="text-[18px] font-medium text-[#171717]">
                      {item.name}
                    </h4>
                    <span className="text-[13px] text-[#737373]">
                      {item.category}
                    </span>
                  </div>
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-[13px] font-medium text-[#171717] hover:text-[#52634F] transition-colors"
                  >
                    <span>View source ({item.repoName.split('/')[1]})</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
                <p className="mt-2 text-[15px] leading-[1.6] text-[#737373]">
                  {item.description}
                </p>

                {item.hasLiveDashboard && <ApartmentDashboard />}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
