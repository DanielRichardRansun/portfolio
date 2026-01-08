"use client";

import { useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import SpotlightCard from "@/components/SpotlightCard";
import {
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiTarget,
  FiActivity,
  FiArrowDown,
} from "react-icons/fi";

// --- SUB-COMPONENT: CAREER ITEM ---
const CareerItem = ({ job, index, t }: { job: any; index: number; t: any }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-30% 0px -30% 0px", amount: 0.3 });
  const [isHovered, setIsHovered] = useState(false);

  // Varian untuk animasi staggered (berurutan)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="relative pl-8 md:pl-12 group/item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* --- INTERACTIVE TIMELINE DOT --- */}
      {/* Dot akan berdenyut Primary saat aktif atau di-hover */}
      <div className="absolute -left-[5px] top-0 z-20">
        <motion.div
          animate={{
            scale: isInView || isHovered ? 1.2 : 1,
            backgroundColor:
              isInView || isHovered ? "var(--primary)" : "#121212",
            borderColor: isInView || isHovered ? "var(--primary)" : "#333",
          }}
          className="relative flex items-center justify-center w-3 h-3 rounded-full border-2 transition-colors duration-300 bg-[#121212]"
        >
          {(isInView || isHovered) && (
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping"></span>
          )}
        </motion.div>
        {/* Garis konektor yang menyala saat aktif */}
        <motion.div
          animate={{
            background:
              isInView || isHovered
                ? "linear-gradient(to bottom, var(--primary), transparent)"
                : "linear-gradient(to bottom, #333, transparent)",
          }}
          className="absolute top-3 left-1/2 -translate-x-1/2 w-px h-full -z-10 transition-all duration-500"
          style={{ height: "calc(100% + 64px)" }}
        />
      </div>

      {/* --- CARD WITH HOVER GLOW --- */}
      <SpotlightCard
        className={`p-6 md:p-8 rounded-2xl transition-all duration-500 border relative overflow-hidden
            
        `}
      >
        {/* Efek Cahaya Halus saat Hover (Mouse Follow) */}
        <div className="absolute inset-0 opacity-0 group-hover/item:opacity-20 transition-opacity duration-500 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />

        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-6 relative z-10"
        >
          <div>
            <h3
              className={`text-xl font-bold transition-colors duration-500 
                ${isInView || isHovered ? "text-primary" : "text-white"}
              `}
            >
              {job.role}
            </h3>
            <p
              className={`font-medium text-sm mt-1 transition-colors duration-500 ${
                isInView ? "text-gray-300" : "text-gray-500"
              }`}
            >
              {job.company}
            </p>
          </div>

          {/* MAGNETIC DATE BADGE */}
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-start md:items-end gap-1 cursor-default"
          >
            <div
              className={`flex items-center gap-2 text-xs px-3 py-1 rounded-full border transition-all duration-500
                ${
                  isInView
                    ? "bg-primary/10 border-primary/20 text-primary"
                    : "bg-black/20 border-white/5 text-gray-600 group-hover/item:border-primary/20 group-hover/item:text-gray-400"
                }
            `}
            >
              <FiCalendar /> {job.date}
            </div>
            <span className="text-xs text-gray-600 font-medium">
              {job.type}
            </span>
          </motion.div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-gray-400 leading-relaxed text-sm mb-8 border-b border-white/5 pb-6 relative z-10"
        >
          {job.desc}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {/* Responsibilities */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mb-4">
              <FiActivity
                className={`${
                  isInView ? "text-primary" : "text-gray-600"
                } transition-colors`}
              />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider opacity-80">
                {t.career.responsibilities}
              </h4>
            </div>
            <ul className="space-y-2">
              {job.responsibilities.map((res: string, i: number) => (
                <motion.li
                  key={i}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  className="group/list flex items-start gap-3 text-sm text-gray-400 p-2 rounded-lg hover:bg-white/5 transition-all"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-600 group-hover/list:bg-primary transition-colors flex-shrink-0"></span>
                  <span className="leading-relaxed group-hover/list:text-gray-200 transition-colors">
                    {res}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Impact */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mb-4">
              <FiTarget
                className={`${
                  isInView ? "text-primary" : "text-gray-600"
                } transition-colors`}
              />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider opacity-80">
                {t.career.impacts}
              </h4>
            </div>
            <ul className="space-y-2">
              {job.impacts.map((imp: string, i: number) => (
                <motion.li
                  key={i}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  className="group/list flex items-start gap-3 text-sm text-gray-400 p-2 rounded-lg hover:bg-white/5 transition-all"
                >
                  <FiCheckCircle
                    className="mt-0.5 text-gray-600 group-hover/list:text-primary transition-colors flex-shrink-0"
                    size={14}
                  />
                  <span className="leading-relaxed group-hover/list:text-gray-200 transition-colors">
                    {imp}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

// --- MAIN COMPONENT ---
export default function Career() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Animasi garis timeline utama yang terisi seiring scroll
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen p-6 md:p-10 pb-20 space-y-12 relative overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none translate-x-1/2 translate-y-1/2" />

      {/* HEADER */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="max-w-4xl pt-4 relative z-10 flex justify-between items-end"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-2xl text-primary backdrop-blur-sm shadow-[0_0_20px_-5px_var(--primary)]">
            <FiBriefcase size={28} />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
              {t.career.title}
            </h1>
            <p className="text-gray-400 text-base max-w-md">
              {t.career.subtitle}
            </p>
          </div>
        </div>

        {/* Scroll Indicator Kecil */}
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="hidden md:flex flex-col items-center text-gray-500 text-sm"
        >
          <span className="mb-1">Scroll</span>
          <FiArrowDown />
        </motion.div>
      </motion.section>

      <div className="w-full h-px bg-gradient-to-r from-primary/20 via-white/5 to-transparent" />

      {/* TIMELINE CONTAINER */}
      <div className="relative ml-3 md:ml-6 space-y-16 pb-10">
        {/* Garis Vertikal Latar Belakang (Gelap) */}
        <div className="absolute left-0 top-2 bottom-0 w-px bg-[#333]"></div>

        {/* Garis Vertikal Progress (Primary - Terisi saat scroll) */}
        <motion.div
          style={{ scaleY, originY: 0 }}
          className="absolute left-0 top-2 bottom-0 w-px bg-gradient-to-b from-primary via-primary to-transparent shadow-[0_0_10px_var(--primary)]"
        ></motion.div>

        {t.career.items.map((job: any, index: number) => (
          <CareerItem key={index} job={job} index={index} t={t} />
        ))}
      </div>
    </div>
  );
}
