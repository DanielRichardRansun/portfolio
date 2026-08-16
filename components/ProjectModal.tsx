"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { FiExternalLink, FiLayout, FiX, FiZap, FiCheck } from "react-icons/fi";
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
import { useLanguage } from "@/context/LanguageContext";
import { Project } from "@/app/projects/page";

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
        return <SiNextdotjs className="text-[var(--text-heading)]" />;
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
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
            className="absolute inset-0 bg-[var(--overlay)] backdrop-blur-sm cursor-pointer"
          />

          <motion.div
            layoutId={`card-container-${selectedId}`}
            className="relative w-full max-w-2xl max-h-[90vh] md:max-h-[85vh] bg-[var(--background)] border-t md:border border-[var(--border-subtle)] rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <button
              onClick={() => setSelectedId(null)}
              className="absolute top-4 right-4 z-40 p-2 bg-black/50 backdrop-blur-md border border-[var(--border-subtle)] hover:bg-[var(--surface)] text-[var(--text-heading)] rounded-full transition-all"
            >
              <FiX size={20} />
            </button>

            <div className="overflow-y-auto custom-scrollbar flex-1">
              <div className="relative w-full aspect-video bg-[var(--background)] shrink-0">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 flex flex-col gap-2">
                  <div className="flex flex-col items-start gap-2">
                    <span className="px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-full">
                      {selectedProject.category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-heading)] leading-tight">
                      {selectedProject.title}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="p-5 md:p-8 md:pt-4 pt-4 space-y-8 pb-10">
                <div className="flex flex-col gap-8">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-fit flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-bold text-xs shadow-lg hover:bg-primary hover:text-white transition-all active:scale-95"
                    >
                      <FiExternalLink />
                      <span>Visit Live Site</span>
                    </a>
                  )}

                  <p className="text-[var(--text-body)] leading-relaxed text-sm md:text-base border-l-2 border-[var(--border-subtle)] pl-4">
                    {selectedProject.desc}
                  </p>
                </div>

                <div className="bg-[var(--surface)] p-4 rounded-xl border border-[var(--border-subtle)]">
                  <h4 className="text-[var(--text-muted)] font-bold text-xs uppercase mb-3 tracking-wider flex items-center gap-2">
                    <FiZap className="text-yellow-500" />
                    {t.home.featured.box_tech_title}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1.5 text-xs text-[var(--text-body)] bg-[var(--border-subtle)] px-3 py-1.5 rounded-lg border border-[var(--border-subtle)]"
                      >
                        {getTechIcon(tech)}
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[var(--border-subtle)]">
                  <div>
                    <h3 className="text-base font-bold text-[var(--text-heading)] uppercase tracking-wider mb-4 flex items-center gap-2">
                      {t.projects.modal.features}
                    </h3>
                    <ul className="space-y-3">
                      {selectedProject.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-[var(--text-body)]"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[var(--text-heading)] uppercase tracking-wider mb-4 flex items-center gap-2">
                      {t.projects.modal.outcomes}
                    </h3>
                    <ul className="space-y-3">
                      {selectedProject.outcomes.map((outcome, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-[var(--text-body)]"
                        >
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                          <span className="leading-relaxed">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
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
