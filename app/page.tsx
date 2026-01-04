"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import {
  FiLayout,
  FiCode,
  FiSmartphone,
  FiUser,
  FiBriefcase,
  FiMail,
  FiArrowRight,
  FiCpu,
} from "react-icons/fi";
import {
  SiLaravel,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiMysql,
  SiTypescript,
  SiFigma,
  SiGithub,
  SiPhp,
  SiNodedotjs,
  SiPostgresql,
  SiWordpress,
} from "react-icons/si";

import Link from "next/link";
import SpotlightCard from "@/components/SpotlightCard";

export default function Home() {
  const { t } = useLanguage();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full min-h-screen p-6 md:p-10 pb-20">
      {/* --- SECTION 1: HERO (COMPACT) --- */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="pt-4 mb-10"
      >
        <h1 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">
          {t.home.hero.greeting}
        </h1>

        <p className="text-gray-500 mb-4 text-sm font-medium">
          {t.home.hero.location}
        </p>

        <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-6">
          {t.home.hero.desc}
        </p>

        <div className="flex gap-3">
          <Link
            href="/projects"
            className=" group relative px-6 py-3 rounded-lg bg-white text-black font-bold text-xs md:text-sm overflow-hidden transition-all duration-300"
          >
            <div className="flex items-center gap-2 transition-transform duration-300 group-hover:-translate-x-1">
              <span>{t.home.hero.btn_project}</span>
              <FiArrowRight className="w-0 opacity-0 -translate-x-2 transition-all duration-300 group-hover:w-4 group-hover:opacity-100 group-hover:translate-x-0" />
            </div>
          </Link>

          <Link
            href="/contact"
            className="group relative px-5 py-2 border border-white/20 text-gray-300 rounded-lg hover:bg-white/5 transition-colors duration-300 font-medium text-xs md:text-sm flex items-center leading-none"
          >
            <div className="flex items-center gap-2 transition-transform duration-300 group-hover:-translate-x-1">
              <span className="transition-colors duration-300 group-hover:text-white">
                {t.home.hero.btn_contact}
              </span>
              <FiArrowRight
                className="
        w-0 opacity-0 -translate-x-2
        transition-all duration-300
        group-hover:w-4 group-hover:opacity-100 group-hover:translate-x-0
      "
              />
            </div>
          </Link>
        </div>
      </motion.section>

      <div className="w-full h-px bg-white/10 my-12" />

      {/* --- SECTION 2: FEATURED SECTIONS --- */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FiLayout className="text-primary" /> {t.home.featured.title}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {t.home.featured.subtitle}
          </p>
        </div>

        {/* GRID LAYOUT UTAMA (3 Kolom) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SpotlightCard className="col-span-1 md:col-span-2  rounded-2xl p-5">
            <Link href="/projects" className="absolute inset-0 z-20" />
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white mb-4">
                  <FiSmartphone size={20} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {t.home.featured.box_projects_title}
                </h3>
                <p className="text-gray-400 text-sm max-w-sm">
                  {t.home.featured.box_projects_desc}
                </p>
              </div>
            </div>
            <FiCode
              className="absolute right-0 bottom-0 text-white/5 group-hover:text-white/10 transition-all"
              size={150}
            />
          </SpotlightCard>

          {/* Box Wrapper Kanan: About & Tech Stack */}
          <div className="flex flex-col gap-4 col-span-1">
            <Link href="/about" className="contents">
              <SpotlightCard className="flex-1 min-h-[130px] flex flex-col justify-center cursor-pointer hover:border-white/20 rounded-2xl p-5">
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-2">
                    <FiUser className="text-gray-400 text-2xl" />
                    <FiArrowRight className="text-gray-600 -rotate-45" />
                  </div>
                  <h4 className="font-bold text-white">
                    {t.home.featured.box_about_title}
                  </h4>
                </div>
              </SpotlightCard>
            </Link>

            {/* Box 3: Tech Stack */}
            <SpotlightCard className="flex-1 min-h-[130px] flex flex-col justify-center cursor-default hover:border-white/20 rounded-2xl p-5">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-2">
                  <FiCpu className="text-gray-400 text-2xl" />
                  <div className="flex -space-x-2 opacity-50">
                    <div className="w-6 h-6 rounded-full bg-gray-700 border border-[#1E1E1E] flex items-center justify-center text-[10px] text-white">
                      <SiWordpress />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-gray-700 border border-[#1E1E1E] flex items-center justify-center text-[10px] text-white">
                      <SiReact />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-gray-700 border border-[#1E1E1E] flex items-center justify-center text-[10px] text-white">
                      <SiNextdotjs />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-gray-700 border border-[#1E1E1E] flex items-center justify-center text-[10px] text-white">
                      <SiLaravel />
                    </div>
                  </div>
                </div>
                <h4 className="font-bold text-white">
                  {t.home.featured.box_tech_title}
                </h4>
              </div>
            </SpotlightCard>
          </div>

          {/* === BARIS 2 === */}

          {/* Box 4: Career */}
          <SpotlightCard className="col-span-1 md:col-span-2 relative z-0 rounded-2xl p-5">
            <Link href="/career" className="absolute inset-0 z-20" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                    <FiBriefcase size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">
                      {t.home.featured.box_career_title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {t.home.featured.box_career_desc}
                    </p>
                  </div>
                </div>
                <FiArrowRight className="text-gray-600 group-hover:text-primary transition-colors" />
              </div>
            </div>
          </SpotlightCard>

          {/* Box 5: Contact */}
          <SpotlightCard className="col-span-1 md:col-span-1 bg-gradient-to-br from-[#1E1E1E] to-[#121212] flex flex-col justify-between hover:border-green-500/30 rounded-2xl p-5">
            <Link href="/contact" className="absolute inset-0 z-20" />
            <div className="relative z-10 w-full h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <FiMail className="text-gray-400 text-2xl group-hover:text-green-400 transition-colors" />
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              </div>
              <div className="mt-4">
                <h3 className="font-bold text-white">
                  {t.home.featured.box_contact_title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {t.home.featured.box_contact_desc}
                </p>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </motion.section>

      <div className="w-full h-px bg-white/10 my-12" />

      {/* --- SECTION 3: SKILLS (COLORED) --- */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      >
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white">
            {t.home.skills.title}
          </h2>
          <p className="text-sm text-gray-500">{t.home.skills.subtitle}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {[
            { icon: <SiNextdotjs />, name: "Next.js", color: "text-white" },
            { icon: <SiReact />, name: "React", color: "text-[#61DAFB]" },
            { icon: <SiLaravel />, name: "Laravel", color: "text-[#FF2D20]" },
            {
              icon: <SiTailwindcss />,
              name: "Tailwind",
              color: "text-[#06B6D4]",
            },
            {
              icon: <SiTypescript />,
              name: "TypeScript",
              color: "text-[#3178C6]",
            },
            { icon: <SiPhp />, name: "PHP", color: "text-[#777BB4]" },
            { icon: <SiMysql />, name: "MySQL", color: "text-[#4479A1]" },
            {
              icon: <SiPostgresql />,
              name: "PostgreSQL",
              color: "text-[#336791]",
            },
            { icon: <SiFigma />, name: "Figma", color: "text-[#F24E1E]" },
            { icon: <SiGithub />, name: "Git", color: "text-white" },
            { icon: <SiNodedotjs />, name: "Node.js", color: "text-[#339933]" },
          ].map((skill, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E1E1E] border border-white/5 hover:bg-white/5 transition-all cursor-default"
            >
              <span className={`text-lg ${skill.color}`}>{skill.icon}</span>
              <span className="text-gray-300 text-sm font-medium">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
