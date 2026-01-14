"use client";

import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, useInView } from "framer-motion";
import SpotlightCard from "@/components/SpotlightCard";
import Image from "next/image"; // Pastikan import Image
import {
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiTarget,
  FiActivity,
} from "react-icons/fi";

// --- SUB-COMPONENT: CAREER ITEM ---
const CareerItem = ({ job, index }: { job: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px", amount: 0.3 });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      className="relative pl-8 md:pl-12"
    >
      {/* --- TIMELINE DOT (ANIMATED) --- */}
      <div
        className={`absolute -left-[5px] top-0 w-3 h-3 rounded-full border-2 transition-all duration-500 ease-in-out z-10
          ${
            isInView
              ? "bg-primary border-primary ring-4 ring-primary/20 scale-125"
              : "bg-[#121212] border-white ring-4 ring-[#121212]"
          }
        `}
      ></div>

      {/* --- CARD --- */}
      <SpotlightCard
        className={`p-6 md:p-8 rounded-2xl transition-colors duration-500 
          ${isInView ? "border-white/30 bg-[#1E1E1E]/80" : "border-white/5"} 
        `}
      >
        {/* HEADER: LOGO + ROLE + COMPANY */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          
          {/* 1. COMPANY LOGO (NEW) */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden p-2">
              {/* Cek apakah ada properti logo di data job, jika tidak pakai inisial */}
              {job.logo ? (
                <div className="relative w-full h-full">
                   <Image 
                     src={job.logo} 
                     alt={`${job.company} Logo`}
                     fill
                     className="object-contain"
                   />
                </div>
              ) : (
                <span className="text-xl font-bold text-gray-500">
                  {job.company.charAt(0)}
                </span>
              )}
            </div>
          </div>

          {/* 2. ROLE & COMPANY INFO */}
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
              <div>
                <h3
                  className={`text-xl font-bold transition-colors duration-500 
                    ${isInView ? "text-primary" : "text-white"}
                  `}
                >
                  {job.role}
                </h3>
                <p className="text-gray-400 font-medium text-sm mt-1">
                  {job.company}
                </p>
              </div>

              {/* Date & Type */}
              <div className="flex flex-col items-start md:items-end gap-1 mt-2 md:mt-0">
                <div className="flex items-center gap-2 text-xs text-gray-400 bg-black/20 px-3 py-1 rounded-full border border-white/10">
                  <FiCalendar /> {job.date}
                </div>
                <span className="text-xs text-gray-400 font-medium">
                  {job.type}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="text-gray-300 text-sm mb-8 border-b border-white/5 pb-6 leading-relaxed">
          {job.desc}
        </p>

        {/* COLUMNS: Responsibilities & Impact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FiActivity className="text-gray-500" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Responsibilities
              </h4>
            </div>
            <ul className="space-y-3">
              {job.responsibilities.map((res: string, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-3 pl-1 text-sm text-gray-400"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-600 flex-shrink-0"></span>
                  <span className="leading-relaxed">{res}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <FiTarget className="text-gray-500" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Impact & Achievements
              </h4>
            </div>
            <ul className="space-y-3">
              {job.impacts.map((imp: string, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm pl-1 text-gray-400"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-600 flex-shrink-0"></span>
                  <span className="leading-relaxed">{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

// --- MAIN COMPONENT ---
export default function Career() {
  const { t } = useLanguage();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full min-h-screen p-6 md:p-10 pb-20 space-y-12">
      {/* HEADER */}
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

      {/* TIMELINE CONTAINER */}
      <div className="relative border-l border-white/10 ml-3 md:ml-6 space-y-12 pb-20">
        {t.career.items.map((job: any, index: number) => (
          <CareerItem key={index} job={job} index={index} />
        ))}

        {/* Spacer */}
        <div className="h-[6vh]" />
      </div>
    </div>
  );
}