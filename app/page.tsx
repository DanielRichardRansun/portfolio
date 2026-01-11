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
  FiDownload,
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
  SiInstagram,
  SiLinkedin,
} from "react-icons/si";

import Link from "next/link";
import SpotlightCard from "@/components/SpotlightCard";

const skills = [
  { icon: <SiNextdotjs />, name: "Next.js", hex: "#ffffff" },
  { icon: <SiReact />, name: "React", hex: "#61DAFB" },
  { icon: <SiLaravel />, name: "Laravel", hex: "#FF2D20" },
  { icon: <SiTailwindcss />, name: "Tailwind", hex: "#06B6D4" },
  { icon: <SiTypescript />, name: "TypeScript", hex: "#3178C6" },
  { icon: <SiPhp />, name: "PHP", hex: "#777BB4" },
  { icon: <SiMysql />, name: "MySQL", hex: "#4479A1" },
  { icon: <SiPostgresql />, name: "PostgreSQL", hex: "#336791" },
  { icon: <SiFigma />, name: "Figma", hex: "#F24E1E" },
  { icon: <SiGithub />, name: "Git", hex: "#ffffff" },
  { icon: <SiNodedotjs />, name: "Node.js", hex: "#339933" },
];

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

        {/* Social Media Icons - Replaced project and contact buttons */}
        <div className="flex gap-3">
          {/* Email Icon */}
          <Link
            href="mailto:daniel.richard.ransun@gmail.com" // Using a placeholder - update with actual email
            className="group relative w-10 h-10 rounded-full bg-[#1E1E1E] border border-white/20 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 overflow-hidden"
            title={t.contact.socials.email.title}
          >
            <FiMail className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:text-primary" />
          </Link>

          {/* Instagram Icon */}
          <Link
            href="https://instagram.com/danielrichard7"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-10 h-10 rounded-full bg-[#1E1E1E] border border-white/20 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 overflow-hidden"
            title="Instagram"
          >
            <SiInstagram className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:text-primary" />
          </Link>

          {/* LinkedIn Icon */}
          <Link
            href="https://linkedin.com/in/daniel-richard"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-10 h-10 rounded-full bg-[#1E1E1E] border border-white/20 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 overflow-hidden"
            title="LinkedIn"
          >
            <SiLinkedin className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:text-primary" />
          </Link>

          {/* GitHub Icon */}
          <Link
            href="https://github.com/danielrichard7"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-10 h-10 rounded-full bg-[#1E1E1E] border border-white/20 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 overflow-hidden"
            title="GitHub"
          >
            <SiGithub className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:text-primary" />
          </Link>

          {/* CV Download Icon */}
          <Link
            href="https://www.canva.com/design/DAGxujweTzY/gzcOn7n6hELOZxBdxkgfDw/view?utm_content=DAGxujweTzY&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hb93f5e6498"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-10 h-10 rounded-full bg-[#1E1E1E] border border-white/20 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 overflow-hidden"
            title={t.sidebar.download}
          >
            <FiDownload className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:text-primary" />
          </Link>
        </div>

        {/* COMMENTED OUT ORIGINAL BUTTONS - DO NOT DELETE */}
        {/* <div className="flex gap-3">
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
        </div> */}
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
                <div className="flex justify-between items-start mb-2 relative z-10">
                  <div className="p-2 bg-white/5 rounded-lg text-gray-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors duration-300">
                    <FiCpu size={24} />
                  </div>

                  <div className="flex items-center">
                    {[
                      { Icon: SiWordpress, color: "text-[#21759B]" },
                      { Icon: SiReact, color: "text-[#61DAFB]" },
                      { Icon: SiNextdotjs, color: "text-white" },
                      { Icon: SiLaravel, color: "text-[#FF2D20]" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ width: 0, opacity: 0, scale: 0 }}
                        whileInView={{ width: "auto", opacity: 1, scale: 1 }}
                        className="relative -ml-2 first:ml-0"
                      >
                        <div
                          className={`
            w-8 h-8 rounded-full 
            bg-[#121212] border border-white/10 
            flex items-center justify-center 
            text-xs text-gray-500
            transition-all duration-300
            
            /* HOVER EFFECTS */
            group-hover:border-white/30
            group-hover:scale-110
            group-hover:-translate-y-1
            group-hover:shadow-[0_0_10px_rgba(0,0,0,0.5)]
            group-hover:${item.color}
          `}
                          style={{
                            transitionDelay: `${index * 50}ms`,
                          }}
                        >
                          <item.Icon />
                        </div>
                      </motion.div>
                    ))}
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
                <FiMail className="text-gray-400 text-2xl group-hover:text-primary transition-colors" />
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
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E1E1E] border border-white/5 cursor-default overflow-hidden group"
            >
              <motion.div
                variants={{
                  rest: { opacity: 0 },
                  hover: { opacity: 0.15 },
                }}
                className="absolute inset-0"
                style={{ backgroundColor: skill.hex }}
              />

              {/* Icon & Text */}
              <motion.span
                className="text-lg relative z-10"
                style={{ color: skill.hex }} // Warna Icon selalu nyala
              >
                {skill.icon}
              </motion.span>
              <span className="text-gray-300 text-sm font-medium relative z-10 group-hover:text-white transition-colors">
                {skill.name}
              </span>

              {/* Border Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-full border-2"
                variants={{
                  rest: { opacity: 0, borderColor: "transparent" },
                  hover: { opacity: 1, borderColor: skill.hex },
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
