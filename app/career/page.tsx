"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import SpotlightCard from "@/components/SpotlightCard";
import Image from "next/image";
import { FiBriefcase, FiCalendar, FiActivity, FiTarget } from "react-icons/fi";

const CareerItem = ({
  job,
  index,
  isActive,
  onInView,
}: {
  job: any;
  index: number;
  isActive: boolean;
  onInView: (index: number) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onInView(index);
        }
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [index, onInView]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp}
      className="relative pl-6 md:pl-12 transition-all duration-500"
    >
      <div
        className={`absolute -left-[7px] md:-left-[9px] top-0 w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border-2 transition-all duration-500 ease-in-out z-10 box-content
          ${
            isActive
              ? "bg-primary border-primary ring-4 ring-primary/20 scale-125 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
              : "bg-[#121212] border-white/20 ring-4 ring-[#121212] scale-100"
          }
        `}
      ></div>

      <SpotlightCard
        className={`p-5 md:p-8 rounded-2xl transition-all duration-500 
          ${
            isActive
              ? "border-white/30 bg-[#1E1E1E]/80 shadow-lg scale-[1.02]"
              : "border-white/5 opacity-80 scale-100 hover:opacity-100"
          } 
        `}
      >
        <div className="flex flex-col sm:flex-row gap-4 mb-5 md:mb-6">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center overflow-hidden bg-white/5 border border-white/5">
              {job.logo ? (
                <div className="relative w-full h-full p-1">
                  <Image
                    src={job.logo}
                    alt={`${job.company} Logo`}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <span className="text-lg md:text-xl font-bold text-gray-500">
                  {job.company.charAt(0)}
                </span>
              )}
            </div>
          </div>

          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 md:gap-2">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white transition-colors duration-500 leading-tight">
                  {job.role}
                </h3>

                <p className="text-gray-400 font-medium text-sm mt-0.5">
                  {job.company}
                </p>
              </div>

              <div className="flex flex-wrap items-center md:flex-col md:items-end gap-2 mt-2 md:mt-0">
                <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-gray-300 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                  <FiCalendar size={12} />
                  <span className="whitespace-nowrap">{job.date}</span>
                </div>
                <span className="text-[10px] md:text-xs text-gray-500 font-medium border border-white/5 px-2 py-0.5 rounded-md">
                  {job.type}
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-gray-300 text-sm mb-6 border-b border-white/5 pb-5 leading-relaxed">
          {job.desc}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FiActivity className="text-gray-500" size={16} />
              <h4 className="text-xs md:text-sm font-bold text-white uppercase tracking-wider">
                Responsibilities
              </h4>
            </div>
            <ul className="space-y-2">
              {job.responsibilities.map((res: string, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 pl-1 text-sm text-gray-400"
                >
                  <span className="mt-1.5 w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-gray-600 flex-shrink-0"></span>
                  <span className="leading-relaxed text-xs md:text-sm">
                    {res}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <FiTarget className="text-gray-500" size={16} />
              <h4 className="text-xs md:text-sm font-bold text-white uppercase tracking-wider">
                Impact
              </h4>
            </div>
            <ul className="space-y-2">
              {job.impacts.map((imp: string, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 pl-1 text-sm text-gray-400"
                >
                  <span className="mt-1.5 w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-gray-600 flex-shrink-0"></span>
                  <span className="leading-relaxed text-xs md:text-sm">
                    {imp}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

export default function Career() {
  const { t } = useLanguage();

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full min-h-screen p-4 md:p-10 pb-24 space-y-8 md:space-y-12">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="max-w-4xl pt-4"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-[#1E1E1E] border border-white/10 rounded-full text-white">
            <FiBriefcase size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{t.career.title}</h1>
            <p className="text-gray-500 text-sm">{t.career.subtitle}</p>
          </div>
        </div>
      </motion.section>

      <div className="w-full h-px bg-white/5" />

      <div className="relative border-l border-white/10 ml-2 md:ml-6 space-y-10 md:space-y-12 pb-10">
        {t.career.items.map((job: any, index: number) => (
          <CareerItem
            key={index}
            job={job}
            index={index}
            isActive={activeIndex === index}
            onInView={setActiveIndex}
          />
        ))}
      </div>
    </div>
  );
}
