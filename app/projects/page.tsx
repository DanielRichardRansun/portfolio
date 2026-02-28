"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FiLayers,
  FiX,
  FiStar,
  FiCheckCircle,
  FiZap,
  FiLayout,
  FiExternalLink,
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
import { FaWix } from "react-icons/fa";

import SpotlightCard from "@/components/SpotlightCard";
import Tabs from "@/components/Tabs";
import ProjectModal from "@/components/ProjectModal";
import BlurImage from "@/components/BlurImage";

export type Project = {
  id: number;
  title: string;
  category: string;
  image: string;
  tech: string[];
  desc: string;
  features: string[];
  outcomes: string[];
  badge: string;
  liveUrl?: string;
};

export default function Projects() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedProject: Project | undefined = selectedId
    ? t.projects.items.find((p: Project) => p.id === selectedId)
    : undefined;

  const getTechIcon = (techName: string) => {
    switch (techName.toLowerCase()) {
      case "laravel":
        return <SiLaravel className="text-red-600" />;
      case "react":
        return <SiReact className="text-blue-400" />;
      case "next.js":
        return <SiNextdotjs className="text-[var(--text-heading)]" />;
      case "wordpress":
        return <SiWordpress className="text-blue-500" />;
      case "wix studio":
        return <FaWix className="text-blue-500" />;
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
        return <FiZap className="text-[var(--text-muted)]" />;
    }
  };

  // Filter projects into coding and CMS categories
  const codingProjects = t.projects.items.filter((project: Project) =>
    project.tech.some((tech) =>
      [
        "laravel",
        "react",
        "next.js",
        "php",
        "mysql",
        "html",
        "css",
        "javascript",
        "tailwind",
        "bootstrap",
        "node.js",
      ].includes(tech.toLowerCase()),
    ),
  );

  const cmsProjects = t.projects.items.filter((project: Project) =>
    project.tech.some((tech) =>
      ["wordpress", "wix studio", "elementor", "woocommerce"].includes(
        tech.toLowerCase(),
      ),
    ),
  );

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
          <div className="p-3 bg-[var(--surface)] border border-[var(--border-subtle)] rounded-full text-[var(--text-heading)]">
            <FiLayers size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-heading)]">
              {t.projects.title}
            </h1>
            <p className="text-[var(--text-muted)] text-sm">
              {t.projects.subtitle}
            </p>
          </div>
        </div>
      </motion.section>

      {/* DIVIDER */}
      <div className="w-full h-px bg-[var(--border-subtle)] my-0" />

      {/* --- TABS FOR PROJECTS --- */}
      <motion.section
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl pt-4"
      >
        <Tabs
          panels={[
            {
              id: "coding",
              label: t.projects.tabs.coding,
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  {codingProjects.map((project: Project) => (
                    <motion.div
                      key={project.id}
                      layoutId={`card-container-${project.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      onClick={() => setSelectedId(project.id)}
                      className="group relative bg-[var(--surface)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden cursor-pointer hover:border-[var(--border-hover)] transition-all shadow-lg"
                    >
                      {/* BADGES */}
                      {project.badge && (
                        <div
                          className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5
                            ${
                              project.badge === "Featured" ||
                              project.badge === "Unggulan" ||
                              project.badge === "Favorite" ||
                              project.badge === "Favorit" ||
                              project.badge === "Latest" ||
                              project.badge === "Terbaru"
                                ? `${isDark ? "text-black" : "text-white"}`
                                : "text-black"
                            }
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
                            ${
                              project.badge === "Latest" ||
                              project.badge === "Terbaru"
                                ? "bg-emerald-500"
                                : ""
                            }
                        `}
                        >
                          {project.badge === "Favorite" ||
                          project.badge === "Favorit" ? (
                            <FiStar className="inline mb-[2px]" />
                          ) : null}
                          {/* {project.badge === "Featured" ||
                          project.badge === "Unggulan" ? (
                            <FiLayers className="inline mb-[2px]" />
                          ) : null}
                          {project.badge === "Latest" ||
                          project.badge === "Terbaru" ? (
                            <FiZap className="inline mb-[2px]" />
                          ) : null} */}
                          {project.badge}
                        </div>
                      )}

                      {/* IMAGE PREVIEW */}
                      <div className="relative w-full aspect-video bg-black/50 overflow-hidden">
                        <BlurImage
                          src={project.image}
                          alt={project.title}
                          className="object-cover transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        />
                      </div>

                      {/* CONTENT PREVIEW */}
                      <SpotlightCard className="p-6 relative">
                        <p className="text-primary text-xs font-bold mb-2 uppercase tracking-wide">
                          {project.category}
                        </p>
                        <h3 className="text-xl font-bold text-[var(--text-heading)] mb-2 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-[var(--text-body)] text-sm line-clamp-2 mb-4">
                          {project.desc}
                        </p>

                        <div className="flex gap-2 text-lg text-[var(--text-muted)]">
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
              ),
            },
            {
              id: "cms",
              label: t.projects.tabs.cms,
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  {cmsProjects.map((project: Project) => (
                    <motion.div
                      key={project.id}
                      layoutId={`card-container-${project.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      onClick={() => setSelectedId(project.id)}
                      className="group relative bg-[var(--surface)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden cursor-pointer hover:border-[var(--border-hover)] transition-all shadow-lg"
                    >
                      {/* BADGES */}
                      {project.badge && (
                        <div
                          className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5
                            ${
                              project.badge === "Featured" ||
                              project.badge === "Unggulan" ||
                              project.badge === "Favorite" ||
                              project.badge === "Favorit" ||
                              project.badge === "Latest" ||
                              project.badge === "Terbaru"
                                ? `${isDark ? "text-black" : "text-white"}`
                                : "text-black"
                            }
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
                            ${
                              project.badge === "Latest" ||
                              project.badge === "Terbaru"
                                ? "bg-emerald-500"
                                : ""
                            }
                        `}
                        >
                          {project.badge === "Favorite" ||
                          project.badge === "Favorit" ? (
                            <FiStar className="inline mb-[2px]" />
                          ) : null}
                          {project.badge}
                        </div>
                      )}

                      <div className="relative w-full aspect-video bg-black/50 overflow-hidden">
                        <BlurImage
                          src={project.image}
                          alt={project.title}
                          className="object-cover transition-transform duration-500"
                        />
                      </div>

                      <SpotlightCard className="p-6 relative">
                        <p className="text-primary text-xs font-bold mb-2 uppercase tracking-wide">
                          {project.category}
                        </p>
                        <h3 className="text-xl font-bold text-[var(--text-heading)] mb-2 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-[var(--text-body)] text-sm line-clamp-2 mb-4">
                          {project.desc}
                        </p>

                        <div className="flex gap-2 text-lg text-[var(--text-muted)]">
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
              ),
            },
          ]}
        />
      </motion.section>

      {/* --- MODAL POPUP DETAILS --- */}
      <ProjectModal
        selectedProject={selectedProject}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </div>
  );
}
