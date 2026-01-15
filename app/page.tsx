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
  FiMapPin, // Added MapPin for Location
  FiTerminal, // Added Terminal for Role
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
import HoverIconLabel from "@/components/HoverIconLabel";
import AnimatedTag from "@/components/AnimatedTag";
import ProjectMarquee from "@/components/ProjectMarquee";

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
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="pt-8 mb-12"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-5 leading-tight tracking-tight">
          {t.home.hero.greeting}
        </h1>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <AnimatedTag>
            <FiTerminal className="text-gray-300" />{" "}
            <span>Software Engineer & CMS Developer</span>
          </AnimatedTag>

          <span className="hidden md:block text-gray-600">•</span>

          <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
            <FiMapPin size={14} />
            {t.home.hero.location}
          </div>
        </div>

        <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-8">
          {t.home.hero.desc}
        </p>

        <div className="flex flex-wrap items-start gap-4">
          <HoverIconLabel
            icon={<FiMail size={20} />}
            label={t.contact.socials.email.title || "Email"}
            href="mailto:daniel.richard.ransun@gmail.com"
          />

          <HoverIconLabel
            icon={<SiInstagram size={20} />}
            label="Instagram"
            href="https://instagram.com/danielrichard7"
            target="_blank"
            rel="noopener noreferrer"
          />

          <HoverIconLabel
            icon={<SiLinkedin size={20} />}
            label="LinkedIn"
            href="https://linkedin.com/in/daniel-richard"
            target="_blank"
            rel="noopener noreferrer"
          />

          <HoverIconLabel
            icon={<SiGithub size={20} />}
            label="GitHub"
            href="https://github.com/danielrichard7"
            target="_blank"
            rel="noopener noreferrer"
          />

          <HoverIconLabel
            icon={<FiDownload size={20} />}
            label={t.sidebar.download || "Download CV"}
            href="https://www.canva.com/design/DAGxujweTzY/gzcOn7n6hELOZxBdxkgfDw/view?utm_content=DAGxujweTzY&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hb93f5e6498"
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>
      </motion.section>

      <div className="w-full h-px bg-white/10 my-12" />

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FiLayout className="text-gray-500" /> {t.home.featured.title}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {t.home.featured.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
          {/* 1. PROJECTS (VERTICAL - Sisi Kiri) */}
          <SpotlightCard className="col-span-1 md:row-span-2 rounded-3xl p-0 relative overflow-hidden group min-h-[400px] md:min-h-full">
            <Link href="/projects" className="absolute inset-0 z-30" />

            <div className="absolute inset-0 z-0 opacity-50 group-hover:opacity-100 transition-all duration-700 filter blur-[2px] group-hover:blur-0">
              <ProjectMarquee />
            </div>
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent opacity-90" />

            <div className="relative z-20 flex flex-col justify-end h-full p-6 md:p-8">
              <div className="mb-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FiSmartphone size={24} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 transition-colors">
                  Projects
                </h3>
                <p className="text-gray-400 text-sm">
                  Explore my digital craftsmanship.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 text-sm text-white/70 group-hover:text-white border-b border-white/20 pb-1 w-fit transition-all">
                <span>View Gallery</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </SpotlightCard>

          {/* 2. CAREER */}
          <SpotlightCard className="col-span-1 md:col-span-2 rounded-3xl p-6 group relative overflow-hidden min-h-[180px] flex flex-col justify-center">
            <Link href="/career" className="absolute inset-0 z-20" />
            <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity">
              <FiBriefcase
                size={100}
                className="-rotate-12 translate-x-4 translate-y-4"
              />
            </div>

            <div className="relative z-10 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white mb-1 transition-colors">
                  Career Journey
                </h3>
                <p className="text-sm text-gray-500">
                  Professional timeline & milestones.
                </p>

                <div className="flex items-center gap-2 mt-4 text-xs font-medium bg-white/5 border border-white/10 px-3 py-1.5 rounded-full w-fit text-gray-300">
                  <FiBriefcase /> <span>4+ Years Experience</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-gray-400 transition-all">
                <FiArrowRight className="-rotate-45 group-hover:rotate-0 transition-transform" />
              </div>
            </div>
          </SpotlightCard>

          {/* 3. ABOUT ME */}
          <Link href="/about" className="contents">
            <SpotlightCard className="col-span-1 rounded-3xl p-5 group relative overflow-hidden min-h-[180px] flex flex-col justify-between hover:border-white/20">
              <div className="flex justify-between items-start">
                <div className="p-2.5 bg-white/5 rounded-xl text-gray-400 group-hover:text-white transition-colors">
                  <FiUser size={20} />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">About Me</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Bio, hobby, & personality.
                </p>
              </div>
            </SpotlightCard>
          </Link>

          {/* 4. TECH / CONTACT (Kanan Bawah Kanan) */}
          <Link href="/contact" className="contents">
            <SpotlightCard className="col-span-1 rounded-3xl p-5 group relative overflow-hidden min-h-[180px] flex flex-col justify-between bg-gradient-to-br from-[#1E1E1E] to-[#111]">
              <div className="flex justify-between items-start">
                <div className="p-2.5 bg-green-500/10 rounded-xl text-green-400 group-hover:scale-110 transition-transform">
                  <FiMail size={20} />
                </div>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg group-hover:text-green-400 transition-colors">
                  Contact
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Let's work together.
                </p>
              </div>
            </SpotlightCard>
          </Link>
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
