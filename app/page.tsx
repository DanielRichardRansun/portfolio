"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import {
  FiLayout,
  FiSmartphone,
  FiBriefcase,
  FiMail,
  FiArrowRight,
  FiDownload,
  FiMapPin,
  FiTerminal,
} from "react-icons/fi";
import {
  SiLaravel,
  SiNextdotjs,
  SiReact,
  SiVite,
  SiMysql,
  SiPostgresql,
  SiFigma,
  SiGithub,
  SiWordpress,
  SiInstagram,
  SiLinkedin,
} from "react-icons/si";
import { FaWix } from "react-icons/fa";

import Link from "next/link";
import Image from "next/image";
import SpotlightCard from "@/components/SpotlightCard";
import HoverIconLabel from "@/components/HoverIconLabel";
import AnimatedTag from "@/components/AnimatedTag";
import SingleProjectMarquee from "@/components/SingleProjectMarquee";
import Stack from "@/components/Stack";
import ContactChat from "@/components/ContactChat";
import CareerPulse from "@/components/CareerPulse";

// Data Skills
const skills = [
  {
    name: "Laravel",
    desc: "PHP Framework",
    icon: SiLaravel,
    color: "#FF2D20",
    bg: "bg-[#FF2D20]/10",
  },
  {
    name: "React",
    desc: "JavaScript Library",
    icon: SiReact,
    color: "#61DAFB",
    bg: "bg-[#61DAFB]/10",
  },
  {
    name: "Next.js",
    desc: "React Framework",
    icon: SiNextdotjs,
    color: "#ffffff",
    bg: "bg-white/10",
  },
  {
    name: "Vite",
    desc: "Build Tool",
    icon: SiVite,
    color: "#646CFF",
    bg: "bg-[#646CFF]/10",
  },
  {
    name: "WordPress",
    desc: "CMS",
    icon: SiWordpress,
    color: "#21759B",
    bg: "bg-[#21759B]/10",
  },
  {
    name: "Wix",
    desc: "Website Builder",
    icon: FaWix,
    color: "#0C6EFC",
    bg: "bg-[#0C6EFC]/10",
  },
  {
    name: "MySQL",
    desc: "Database",
    icon: SiMysql,
    color: "#4479A1",
    bg: "bg-[#4479A1]/10",
  },
  {
    name: "PostgreSQL",
    desc: "Database",
    icon: SiPostgresql,
    color: "#336791",
    bg: "bg-[#336791]/10",
  },
  {
    name: "GitHub",
    desc: "Version Control",
    icon: SiGithub,
    color: "#ffffff",
    bg: "bg-white/10",
  },
  {
    name: "Figma",
    desc: "Design Tool",
    icon: SiFigma,
    color: "#F24E1E",
    bg: "bg-[#F24E1E]/10",
  },
];

const aboutImages = [
  "/images/home_about/image1.jpg",
  "/images/home_about/image2.jpg",
  "/images/home_about/image3.jpg",
];

export default function Home() {
  const { t } = useLanguage();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full min-h-screen p-6 md:p-10 pb-20">
      {/* --- SECTION 1: HERO --- */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="pt-4 md:pt-8 mb-12"
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

      {/* --- SECTION 2: BENTO GRID --- */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.div className="mb-6" variants={fadeInUp}>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FiLayout className="text-gray-500" /> {t.home.featured.title}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {t.home.featured.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. PROJECTS*/}
          <SpotlightCard className="col-span-1 md:row-span-2 rounded-3xl p-0 relative overflow-hidden group min-h-[320px] md:min-h-full">
            <Link href="/projects" className="absolute inset-0 z-30" />

            <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-100 transition-all duration-700 filter blur-[1px] group-hover:blur-0">
              <SingleProjectMarquee />
            </div>

            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#1E1E1E] via-[#1E1E1E]/50 to-transparent" />

            <div className="relative z-20 flex flex-col gap-4 justify-end h-full p-6 md:p-8">
              <div className="mb-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FiSmartphone size={24} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 transition-colors">
                  {t.home.featured.box_projects_title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {t.home.featured.box_projects_desc}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 text-sm text-white/70 group-hover:text-white border-b border-white/20 pb-1 w-fit transition-all">
                <span>
                  {t.home.featured.box_projects_btn || "View Gallery"}
                </span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </SpotlightCard>

          {/* 2. CAREER */}
          <SpotlightCard className="col-span-1 md:col-span-2 rounded-3xl p-6 group relative overflow-hidden min-h-[190px] flex flex-col justify-center">
            <Link href="/career" className="absolute inset-0 z-20" />

            <div className="absolute right-0 bottom-0 opacity-5 group-hover:opacity-10 transition-opacity">
              <FiBriefcase
                size={100}
                className="-rotate-12 translate-x-4 translate-y-4"
              />
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 h-full items-center">
              <div className="flex flex-col justify-center">
                <h3 className="text-xl font-bold text-white mb-1">
                  {t.home.featured.box_career_title}
                </h3>
                <p className="text-sm text-gray-500 pb-8">
                  {t.home.featured.box_career_desc}
                </p>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-xs font-medium bg-white/5 border border-white/10 px-3 py-1.5 rounded-full w-fit text-gray-300 group-hover:bg-white/10 transition-all">
                    <FiBriefcase className="text-gray-400" />
                    <span>
                      {t.home.featured.box_career_exp || "4+ Years Exp"}
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-white transition-all">
                    <FiArrowRight className="-rotate-45 group-hover:rotate-0 transition-transform" />
                  </div>
                </div>
              </div>

              <div className="flex w-full h-full min-h-[100px] items-center justify-center relative md:mt-0 -mt-6">
                <div className="w-full h-[110px] opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500">
                  <CareerPulse />
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* 3. ABOUT ME */}
          <SpotlightCard className="col-span-1 rounded-3xl p-6 group relative overflow-hidden min-h-[240px] flex flex-col justify-between hover:border-white/20">
            <div className="w-full h-[140px] mb-4 relative z-20">
              <Stack
                sensitivity={100}
                cards={aboutImages.map((src, i) => (
                  <div key={i} className="relative w-full h-full">
                    <Image
                      src={src}
                      alt="About Me Photo"
                      fill
                      className="object-cover pointer-events-none"
                      sizes="(max-width: 768px) 100vw, 300px"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                ))}
              />
            </div>

            <Link href="/about" className="relative z-10 block">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-white text-xl transition-colors">
                    {t.home.featured.box_about_title}
                  </h3>
                  <FiArrowRight className="-rotate-45 group-hover:rotate-0 transition-transform text-gray-500 group-hover:text-white" />
                </div>
                <p className="text-sm text-gray-500">
                  {t.home.featured.box_about_desc}
                </p>
              </div>
            </Link>
          </SpotlightCard>

          {/* 4. CONTACT */}
          <Link href="/contact" className="contents">
            <SpotlightCard className="col-span-1 rounded-3xl p-6 group relative overflow-hidden min-h-[240px] flex flex-col gap-2 bg-gradient-to-br from-[#1E1E1E] to-[#111] hover:border-green-500/30">
              <div className="flex justify-between items-start relative z-20">
                <div>
                  <h3 className="font-bold text-white text-xl transition-colors">
                    {t.home.featured.box_contact_title}
                  </h3>
                  <p className="text-sm text-gray-500 pt-2">
                    {t.home.featured.box_contact_desc}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/20 border border-white/5 backdrop-blur-md">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  <span className="text-[10px] font-medium text-green-400">
                    Online
                  </span>
                </div>
              </div>

              <div className="flex-1 w-full relative z-10 mt-6">
                <ContactChat />
              </div>
            </SpotlightCard>
          </Link>
        </div>
      </motion.section>

      <div className="w-full h-px bg-white/10 my-12" />

      {/* --- SECTION 3: SKILLS & TOOLS --- */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white">
            {t.home.skills.title}
          </h2>
          <p className="text-sm text-gray-500">{t.home.skills.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-[#1E1E1E] border border-white/5 rounded-lg p-2 flex items-center gap-3 hover:border-white/20 hover:bg-white/[0.02] transition-colors group cursor-default"
            >
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${skill.bg}`}
              >
                <skill.icon size={24} style={{ color: skill.color }} />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-white font-semibold text-sm truncate group-hover:text-white/90 transition-colors">
                  {skill.name}
                </span>
                <span className="text-xs text-gray-500 truncate">
                  {skill.desc}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
