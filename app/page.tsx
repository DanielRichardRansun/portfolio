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

// Icons for Skills
const skillIcons = {
  SiLaravel: SiLaravel,
  SiReact: SiReact,
  SiNextdotjs: SiNextdotjs,
  SiVite: SiVite,
  SiWordpress: SiWordpress,
  FaWix: FaWix,
  SiMysql: SiMysql,
  SiPostgresql: SiPostgresql,
  SiGithub: SiGithub,
  SiFigma: SiFigma,
};

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
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-heading)] mb-5 leading-tight tracking-tight">
          {t.home.hero.greeting}
        </h1>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <AnimatedTag>
            <FiTerminal className="text-[var(--text-body)]" />{" "}
            <span>Software Engineer & CMS Developer</span>
          </AnimatedTag>

          <span className="hidden md:block text-[var(--text-muted)]">•</span>

          <div className="flex items-center gap-1.5 text-[var(--text-muted)] text-sm font-medium">
            <FiMapPin size={14} />
            {t.home.hero.location}
          </div>
        </div>

        <p className="text-sm md:text-base text-[var(--text-body)] leading-relaxed mb-8">
          {t.home.hero.desc}
        </p>

        <div className="flex flex-wrap items-start gap-4">
          <HoverIconLabel
            icon={<FiMail size={20} />}
            label={t.contact.socials.email.title || "Email"}
            href="mailto:richardgtwp@gmail.com"
          />

          <HoverIconLabel
            icon={<SiInstagram size={20} />}
            label="Instagram"
            href="https://instagram.com/danielrichardr_"
            target="_blank"
            rel="noopener noreferrer"
          />

          <HoverIconLabel
            icon={<SiLinkedin size={20} />}
            label="LinkedIn"
            href="https://www.linkedin.com/in/daniel-richard-ransun-991216272/"
            target="_blank"
            rel="noopener noreferrer"
          />

          <HoverIconLabel
            icon={<SiGithub size={20} />}
            label="GitHub"
            href="https://github.com/danielrichardransun"
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

      <div className="w-full h-px bg-[var(--border-subtle)] my-12" />

      {/* --- SECTION 2: BENTO GRID --- */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.div className="mb-6" variants={fadeInUp}>
          <h2 className="text-xl font-bold text-[var(--text-heading)] flex items-center gap-2">
            <FiLayout className="text-[var(--text-muted)]" />{" "}
            {t.home.featured.title}
          </h2>
          <p className="text-sm text-[var(--text-muted)] mt-1">
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

            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[var(--surface)] via-[var(--surface)]/50 to-transparent" />

            <div className="relative z-20 flex flex-col gap-4 justify-end h-full p-6 md:p-8">
              <div className="mb-4">
                <div className="w-12 h-12 bg-[var(--spotlight)] backdrop-blur-md border border-[var(--border-hover)] rounded-2xl flex items-center justify-center text-[var(--text-heading)] mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FiSmartphone size={24} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[var(--text-heading)] mb-2 transition-colors">
                  {t.home.featured.box_projects_title}
                </h3>
                <p className="text-[var(--text-body)] text-sm">
                  {t.home.featured.box_projects_desc}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 text-sm text-[var(--text-body)] group-hover:text-[var(--text-heading)] border-b border-[var(--border-hover)] pb-1 w-fit transition-all">
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
                <h3 className="text-xl font-bold text-[var(--text-heading)] mb-1">
                  {t.home.featured.box_career_title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] pb-8">
                  {t.home.featured.box_career_desc}
                </p>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-xs font-medium bg-[var(--border-subtle)] border border-[var(--border-subtle)] px-3 py-1.5 rounded-full w-fit text-[var(--text-body)] group-hover:bg-[var(--spotlight)] transition-all">
                    <FiBriefcase className="text-[var(--text-muted)]" />
                    <span>
                      {t.home.featured.box_career_exp || "4+ Years Exp"}
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-full border border-[var(--border-subtle)] flex items-center justify-center group-hover:bg-[var(--text-heading)] group-hover:text-[var(--background)] group-hover:border-[var(--text-heading)] transition-all">
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
          <SpotlightCard className="col-span-1 rounded-3xl p-6 group relative overflow-hidden min-h-[240px] flex flex-col justify-between hover:border-[var(--border-hover)]">
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
                  <h3 className="font-bold text-[var(--text-heading)] text-xl transition-colors">
                    {t.home.featured.box_about_title}
                  </h3>
                  <FiArrowRight className="-rotate-45 group-hover:rotate-0 transition-transform text-[var(--text-muted)] group-hover:text-[var(--text-heading)]" />
                </div>
                <p className="text-sm text-[var(--text-muted)]">
                  {t.home.featured.box_about_desc}
                </p>
              </div>
            </Link>
          </SpotlightCard>

          {/* 4. CONTACT */}
          <Link href="/contact" className="contents">
            <SpotlightCard className="col-span-1 rounded-3xl p-6 group relative overflow-hidden min-h-[240px] flex flex-col gap-2 bg-gradient-to-br from-[var(--surface)] to-[var(--surface-alt)] hover:border-green-500/30">
              <div className="flex justify-between items-start relative z-20">
                <div>
                  <h3 className="font-bold text-[var(--text-heading)] text-xl transition-colors">
                    {t.home.featured.box_contact_title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] pt-2">
                    {t.home.featured.box_contact_desc}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-[var(--border-subtle)] border border-[var(--border-subtle)] backdrop-blur-md">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  <span className="text-[10px] font-medium text-green-500">
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

      <div className="w-full h-px bg-[var(--border-subtle)] my-12" />

      {/* --- SECTION 3: SKILLS & TOOLS --- */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[var(--text-heading)]">
            {t.home.skills.title}
          </h2>
          <p className="text-sm text-[var(--text-muted)]">
            {t.home.skills.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {t.home.skills.items.map((skill, index) => {
            const IconComponent =
              skillIcons[skill.icon as keyof typeof skillIcons];
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-[var(--surface)] border border-[var(--border-subtle)] rounded-lg p-2 flex items-center gap-3 hover:border-[var(--border-hover)] hover:bg-[var(--surface-hover)] transition-colors group cursor-default"
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${skill.bg}`}
                >
                  {IconComponent && (
                    <IconComponent size={24} style={{ color: skill.color }} />
                  )}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-[var(--text-heading)] font-semibold text-sm truncate transition-colors">
                    {skill.name}
                  </span>
                  <span className="text-xs text-[var(--text-muted)] truncate">
                    {skill.desc}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>
    </div>
  );
}
