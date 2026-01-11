"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { FiExternalLink, FiLayout, FiX, FiZap } from "react-icons/fi";
import { SiLaravel, SiNextdotjs, SiReact, SiTailwindcss, SiMysql, SiPhp, SiWordpress, SiElementor, SiWoocommerce, SiBootstrap, SiHtml5, SiCss3, SiJavascript } from "react-icons/si";
import { useLanguage } from "@/context/LanguageContext";
import SpotlightCard from "@/components/SpotlightCard";
import { Project } from "@/app/projects/page"; // Import the Project type

interface ProjectModalProps {
  selectedProject: Project | undefined;
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  selectedProject,
  selectedId,
  setSelectedId,
}) => {
  const { t } = useLanguage();

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
              <div className="relative w-full aspect-video bg-gray-900">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-90" />

                {/* Content Container (Title & Button) */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  {/* Judul & Kategori (Kiri) */}
                  <div>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold rounded-full mb-3 inline-block">
                      {selectedProject.category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                      {selectedProject.title}
                    </h2>
                  </div>

                  {/* BUTTON LIVE VIEW (Kanan) */}
                  {/* Hanya muncul jika liveUrl ada di dictionary */}
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
          group flex items-center gap-2 px-5 py-3
          bg-white text-black rounded-full
          font-bold text-sm shadow-lg shadow-white/10
          transition-all duration-300
          hover:scale-105 hover:bg-primary hover:text-white
        "
                    >
                      <span>Live View</span>
                      <FiExternalLink className="transition-transform group-hover:rotate-45" />
                    </a>
                  )}
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
  );
};

export default ProjectModal;