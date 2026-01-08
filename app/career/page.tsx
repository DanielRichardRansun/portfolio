"use client";

import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, useInView } from "framer-motion";
import SpotlightCard from "@/components/SpotlightCard";
import {
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiTarget,
  FiActivity,
} from "react-icons/fi";

// --- SUB-COMPONENT: CAREER ITEM ---
// Kita pisahkan ini agar setiap kartu punya "sensor" scroll sendiri
const CareerItem = ({ job, index }: { job: any; index: number }) => {
  const ref = useRef(null);
  
  // useInView: Mendeteksi apakah elemen ini ada di layar.
  // margin: "-40% 0px -40% 0px" artinya sensor hanya aktif jika kartu berada di 
  // TENGAH layar (memotong 40% atas dan 40% bawah viewport).
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
      {/* Logika: Jika isInView (aktif), warnanya jadi Primary + ada efek Glow (Ring).
         Jika tidak, kembali jadi putih biasa.
      */}
      <div
        className={`absolute -left-[5px] top-0 w-3 h-3 rounded-full border-2 transition-all duration-500 ease-in-out z-10
          ${
            isInView
              ? "bg-primary border-primary ring-4 ring-primary/20 scale-125" // Active State
              : "bg-[#121212] border-white ring-4 ring-[#121212]" // Inactive State
          }
        `}
      ></div>

      {/* --- CARD --- */}
      {/* Logika: Kita tambahkan border yang lebih terang jika isInView
      */}
      <SpotlightCard
        className={`p-6 md:p-8 rounded-2xl transition-colors duration-500 
          ${isInView ? "border-white/30 bg-[#1E1E1E]/80" : "border-white/5"} 
        `}
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-6">
          <div>
            {/* Title berubah jadi Primary saat discroll */}
            <h3
              className={`text-xl font-bold transition-colors duration-500 
                ${isInView ? "text-primary" : "text-white group-hover:text-primary"}
              `}
            >
              {job.role}
            </h3>
            <p className="text-gray-400 font-medium text-sm mt-1">
              {job.company}
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-1">
            <div className="flex items-center gap-2 text-xs text-gray-500 bg-black/20 px-3 py-1 rounded-full border border-white/5">
              <FiCalendar /> {job.date}
            </div>
            <span className="text-xs text-gray-600 font-medium">
              {job.type}
            </span>
          </div>
        </div>

        {/* Deskripsi */}
        <p className="text-gray-300 text-sm mb-8 border-b border-white/5 pb-6">
          {job.desc}
        </p>

        {/* Columns */}
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
                <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-600 flex-shrink-0"></span>
                  <span className="leading-relaxed">{res}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <FiTarget className="text-primary" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Impact & Achievements
              </h4>
            </div>
            <ul className="space-y-3">
              {job.impacts.map((imp: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                  <FiCheckCircle className="mt-0.5 text-primary/70 flex-shrink-0" size={14} />
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
      <div className="relative border-l border-white/10 ml-3 md:ml-6 space-y-12 pb-10">
        {t.career.items.map((job: any, index: number) => (
          // Memanggil komponen CareerItem yang sudah kita buat di atas
          <CareerItem key={index} job={job} index={index} />
        ))}
      </div>
    </div>
  );
}