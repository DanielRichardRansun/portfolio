"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import {
  FiAward,
  FiBook,
  FiUser,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import Image from "next/image";
import SpotlightCard from "@/components/SpotlightCard";
import { useState } from "react";
import CertificateLightbox from "@/components/CertificateLightbox";
import BlurImage from "@/components/BlurImage";

export default function About() {
  const { t } = useLanguage();

  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    index: number | null;
  }>({ isOpen: false, index: null });

  const [showAll, setShowAll] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full min-h-screen p-6 md:p-10 pb-20 space-y-16">
      {/* --- SECTION 1: INTRODUCTION --- */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="max-w-4xl pt-4"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-[#1E1E1E] border border-white/10 rounded-full text-white">
            <FiUser size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{t.about.title}</h1>
            <p className="text-gray-500 text-sm">{t.about.subtitle}</p>
          </div>
        </div>

        <div className="space-y-6 text-gray-400 leading-relaxed text-sm md:text-base border-l-2 border-white/5 pl-6">
          <p>{t.about.story.p1}</p>
          <p>{t.about.story.p2}</p>
          <p>{t.about.story.p3}</p>
        </div>
      </motion.section>

      <div className="w-full h-px bg-white/5" />

      {/* --- SECTION 2: CERTIFICATIONS --- */}
      <section>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex items-center gap-3 mb-6"
        >
          <div className="p-3 bg-[#1E1E1E] border border-white/10 rounded-full text-white">
            <FiAward size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {t.about.certifications.title}
            </h2>
            <p className="text-sm text-gray-500">
              {t.about.certifications.subtitle}
            </p>
          </div>
        </motion.div>

        {(() => {
          const totalCertificates = t.about.certifications.items.length;

          const certificatesToShow = showAll
            ? t.about.certifications.items
            : t.about.certifications.items.slice(0, 3);

          return (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {certificatesToShow.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="bg-[#1E1E1E] border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all group cursor-pointer flex flex-col"
                    onClick={() => {
                      const originalIndex =
                        t.about.certifications.items.findIndex(
                          (item) => item.name === cert.name,
                        );
                      setLightboxState({ isOpen: true, index: originalIndex });
                    }}
                  >
                    <div className="relative w-full h-60 bg-black/20 sm:h-50 md:h-50 shrink-0">
                      <BlurImage src={cert.image} alt={cert.name} />
                    </div>

                    <SpotlightCard className="h-full border-t-0 rounded-t-none">
                      <div className="p-5 h-full flex flex-col justify-between">
                        <h3 className="font-bold text-white mb-1 line-clamp-2 leading-tight">
                          {cert.name}
                        </h3>
                        <div className="flex justify-between items-end mt-4">
                          <div>
                            <p className="text-xs text-gray-400 mb-1">
                              {t.about.certifications.issued}
                            </p>
                            <p className="text-xs font-medium text-white">
                              {cert.issuer}
                            </p>
                          </div>
                          <span className="text-[10px] text-gray-500 border border-white/10 px-2 py-1 rounded-md bg-black/20 whitespace-nowrap">
                            {cert.date}
                          </span>
                        </div>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                ))}
              </div>

              {totalCertificates > 3 && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="flex justify-center mt-8"
                >
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1E1E1E] border border-white/10 text-white hover:bg-white/10 transition-colors text-sm font-medium"
                  >
                    {showAll ? (
                      <>
                        <span>Hide Certificates</span>
                        <FiChevronUp />
                      </>
                    ) : (
                      <>
                        <span>Show All ({totalCertificates})</span>
                        <FiChevronDown />
                      </>
                    )}
                  </button>
                </motion.div>
              )}

              {lightboxState.index !== null && (
                <CertificateLightbox
                  isOpen={lightboxState.isOpen}
                  onClose={() =>
                    setLightboxState({ isOpen: false, index: null })
                  }
                  imageUrl={
                    t.about.certifications.items[lightboxState.index!].image
                  }
                  title={
                    t.about.certifications.items[lightboxState.index!].name
                  }
                  issuer={
                    t.about.certifications.items[lightboxState.index!].issuer
                  }
                  date={t.about.certifications.items[lightboxState.index!].date}
                />
              )}
            </>
          );
        })()}
      </section>

      <div className="w-full h-px bg-white/5" />

      {/* --- SECTION 3: EDUCATION --- */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-[#1E1E1E] border border-white/10 rounded-full text-white">
            <FiBook size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {t.about.education.title}
            </h2>
            <p className="text-sm text-gray-500">
              {t.about.education.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <SpotlightCard className="p-6 rounded-2xl">
            <div className="flex items-start gap-5 ">
              <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
                <BlurImage
                  src={t.about.education.uni.logo}
                  alt="University Logo"
                  className="object-contain"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">
                  {t.about.education.uni.name}
                </h3>
                <p className="text-sm text-gray-300 font-medium mb-1">
                  {t.about.education.uni.degree}
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  {t.about.education.uni.major}
                </p>

                <div className="flex justify-between items-center pt-3 border-t border-white/5">
                  <span className="text-xs text-gray-500">
                    {t.about.education.uni.year}
                  </span>
                  <span className="text-xs text-gray-500">
                    {t.about.education.uni.location}
                  </span>
                </div>
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-6 rounded-2xl">
            <div className="flex items-start gap-5 ">
              <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
                <BlurImage
                  src={t.about.education.sma.logo}
                  alt="School Logo"
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">
                  {t.about.education.sma.name}
                </h3>
                <p className="text-sm text-gray-300 font-medium mb-1">
                  {t.about.education.sma.degree}
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  {t.about.education.sma.major}
                </p>

                <div className="flex justify-between items-center pt-3 border-t border-white/5">
                  <span className="text-xs text-gray-500">
                    {t.about.education.sma.year}
                  </span>
                  <span className="text-xs text-gray-500">
                    {t.about.education.sma.location}
                  </span>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </motion.section>
    </div>
  );
}
