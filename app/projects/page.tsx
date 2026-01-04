"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FiLayers,
  FiX,
  FiStar,
  FiCheckCircle,
  FiZap,
  FiLayout,
} from "react-icons/fi";
import {
  SiLaravel,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiMysql,
  SiPhp,
  SiWordpress,
  SiElementor,
  SiWoocommerce,
  SiBootstrap,
  SiHtml5,
  SiCss3,
  SiJavascript,
} from "react-icons/si";

import SpotlightCard from "@/components/SpotlightCard";

type Project = {
  id: number;
  title: string;
  category: string;
  image: string;
  tech: string[];
  desc: string;
  features: string[];
  outcomes: string[];
  badge: string;
};

export default function Projects() {
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedProject = selectedId
    ? t.projects.items.find((p: Project) => p.id === selectedId)
    : null;

  const getTechIcon = (techName: string) => {
    switch (techName.toLowerCase()) {
      case "laravel":
        return <SiLaravel className="text-red-600" />;
      case "react":
        return <SiReact className="text-blue-400" />;
      case "next.js":
        return <SiNextdotjs className="text-white" />;
      case "wordpress":
        return <SiWordpress className="text-blue-500" />;
      case "elementor":
        return <SiElementor className="text-pink-600" />;
      case "woocommerce":
        return <SiWoocommerce className="text-purple-500" />;
      case "tailwind":
        return <SiTailwindcss className="text-cyan-400" />;
      case "bootstrap":
        return <SiBootstrap className="text-purple-600" />;
      case "php":
        return <SiPhp className="text-indigo-400" />;
      case "mysql":
        return <SiMysql className="text-blue-300" />;
      case "html":
        return <SiHtml5 className="text-orange-500" />;
      case "css":
        return <SiCss3 className="text-blue-500" />;
      case "javascript":
        return <SiJavascript className="text-yellow-400" />;
      default:
        return <FiZap className="text-gray-400" />;
    }
  };

  return (
    <div className="w-full min-h-screen p-6 md:p-10 pb-20 space-y-10">
      {/* --- HEADER --- */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl pt-4"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-[#1E1E1E] border border-white/10 rounded-full text-white">
            <FiLayers size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {t.projects.title}
            </h1>
            <p className="text-gray-500 text-sm">{t.projects.subtitle}</p>
          </div>
        </div>
      </motion.section>

      {/* DIVIDER */}
      <div className="w-full h-px bg-white/5" />

      {/* --- PROJECTS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {t.projects.items.map((project: Project) => (
          <motion.div
            key={project.id}
            layoutId={`card-container-${project.id}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          
            onClick={() => setSelectedId(project.id)}
            className="group relative bg-[#1E1E1E] border border-white/5 rounded-2xl overflow-hidden cursor-pointer hover:border-white/20 transition-all shadow-lg"
          >
            {/* BADGES */}
            {project.badge && (
              <div
                className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg text-black
                    ${
                      project.badge === "Featured" ||
                      project.badge === "Unggulan"
                        ? "bg-primary"
                        : ""
                    } 
                    ${
                      project.badge === "Favorite" ||
                      project.badge === "Favorit"
                        ? "bg-yellow-500"
                        : ""
                    }
                `}
              >
                {project.badge === "Favorite" || project.badge === "Favorit" ? (
                  <FiStar className="inline mb-[2px] mr-1" />
                ) : null}
                {project.badge}
              </div>
            )}

            {/* IMAGE PREVIEW */}
            <div className="relative w-full aspect-video bg-black/50 overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-transparent to-transparent opacity-80" />
            </div>

            {/* CONTENT PREVIEW */}
            <SpotlightCard className="p-6 relative">
              <p className="text-primary text-xs font-bold mb-2 uppercase tracking-wide">
                {project.category}
              </p>
              <h3 className="text-xl font-bold text-white mb-2 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                {project.desc}
              </p>

              <div className="flex gap-2 text-lg text-gray-500">
                {project.tech.slice(0, 4).map((tech, i) => (
                  <span key={i} title={tech}>
                    {getTechIcon(tech)}
                  </span>
                ))}
                {project.tech.length > 4 && (
                  <span className="text-xs pt-1">+more</span>
                )}
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>

      {/* --- MODAL POPUP DETAILS --- */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              layoutId={`card-container-${selectedId}`}
              className="relative w-full max-w-2xl max-h-[90vh] bg-[#121212] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-30 p-2 bg-black/50 hover:bg-white text-white hover:text-black rounded-full transition-all"
              >
                <FiX size={20} />
              </button>

              <div className="overflow-y-auto custom-scrollbar">
                {/* Header Image */}
                <div className="relative w-full aspect-video bg-gray-900">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="px-3 py-1 bg-white text-black text-xs font-bold rounded-full mb-3 inline-block">
                      {selectedProject.category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {selectedProject.title}
                    </h2>
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-8">
                  {/* 1. Description & Tech Stack */}
                  <div className="flex flex-col gap-6">
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                      {selectedProject.desc}
                    </p>

                    <div className="bg-[#1E1E1E] p-4 rounded-xl border border-white/5">
                      <h4 className="text-gray-400 font-bold text-xs uppercase mb-3 tracking-wider">
                        {t.home.featured.box_tech_title}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map((tech, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-xs text-gray-300 bg-black/30 px-3 py-2 rounded-lg border border-white/5"
                          >
                            {getTechIcon(tech)}
                            <span>{tech}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 2. Key Features */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <FiLayout className="text-primary" />{" "}
                      {t.projects.modal.features}
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedProject.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 bg-[#1E1E1E] p-3 rounded-xl border border-white/5 text-sm text-gray-400"
                        >
                          <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-[#1E1E1E] to-[#121212] p-6 rounded-2xl border border-white/5">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      {t.projects.modal.outcomes}
                    </h3>

                    <ul className="space-y-3">
                      {selectedProject.outcomes.map((outcome, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-gray-400"
                        >
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                          <span className="leading-relaxed">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
