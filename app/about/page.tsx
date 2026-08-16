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
          <div className="p-3 bg-[var(--surface)] border border-[var(--border-subtle)] rounded-full text-[var(--text-heading)]">
            <FiUser size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-heading)]">
              {t.about.title}
            </h1>
            <p className="text-[var(--text-muted)] text-sm">
              {t.about.subtitle}
            </p>
          </div>
        </div>

        <div className="space-y-6 text-[var(--text-body)] leading-relaxed text-sm md:text-base border-l-2 border-[var(--border-subtle)] pl-6">
          {t.about.story.map((paragraph: string, i: number) => (
            <p key={i}>
              {paragraph
                .split(/(\*\*.*?\*\*)/)
                .map((part: string, j: number) =>
                  part.startsWith("**") && part.endsWith("**") ? (
                    <strong
                      key={j}
                      className="text-[var(--text-heading)] font-semibold"
                    >
                      {part.slice(2, -2)}
                    </strong>
                  ) : (
                    <span key={j}>{part}</span>
                  ),
                )}
            </p>
          ))}
        </div>
      </motion.section>

      <div className="w-full h-px bg-[var(--border-subtle)]" />

      {/* --- SECTION 2: CERTIFICATIONS --- */}
      <section>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex items-center gap-3 mb-6"
        >
          <div className="p-3 bg-[var(--surface)] border border-[var(--border-subtle)] rounded-full text-[var(--text-heading)]">
            <FiAward size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[var(--text-heading)]">
              {t.about.certifications.title}
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
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
                    key={cert.name}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="bg-[var(--surface)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden hover:border-[var(--border-hover)] transition-all group cursor-pointer flex flex-col"
                    onClick={() => {
                      const originalIndex =
                        t.about.certifications.items.findIndex(
                          (item) => item.name === cert.name,
                        );
                      setLightboxState({ isOpen: true, index: originalIndex });
                    }}
                  >
                    <div className="relative w-full h-60 bg-black/20 sm:h-50 md:h-50 shrink-0">
                      <BlurImage
                        src={cert.image}
                        alt={cert.name}
                        priority={index < 3}
                      />
                    </div>

                    <SpotlightCard className="h-full border-t-0 rounded-t-none">
                      <div className="p-5 h-full flex flex-col justify-between">
                        <h3 className="font-bold text-[var(--text-heading)] mb-1 line-clamp-2 leading-tight">
                          {cert.name}
                        </h3>
                        <div className="flex justify-between items-end mt-4">
                          <div>
                            <p className="text-xs text-[var(--text-muted)] mb-1">
                              {t.about.certifications.issued}
                            </p>
                            <p className="text-xs font-medium text-[var(--text-heading)]">
                              {cert.issuer}
                            </p>
                          </div>
                          <span className="text-[10px] text-[var(--text-muted)] border border-[var(--border-subtle)] px-2 py-1 rounded-md bg-[var(--border-subtle)] whitespace-nowrap">
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
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--surface)] border border-[var(--border-subtle)] text-[var(--text-heading)] hover:bg-[var(--surface-hover)] transition-colors text-sm font-medium cursor-pointer"
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

      <div className="w-full h-px bg-[var(--border-subtle)]" />

      {/* --- SECTION 3: EDUCATION --- */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-[var(--surface)] border border-[var(--border-subtle)] rounded-full text-[var(--text-heading)]">
            <FiBook size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[var(--text-heading)]">
              {t.about.education.title}
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
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
                <h3 className="text-lg font-bold text-[var(--text-heading)] mb-1">
                  {t.about.education.uni.name}
                </h3>
                <p className="text-sm text-[var(--text-body)] font-medium mb-1">
                  {t.about.education.uni.degree}
                </p>
                <p className="text-xs text-[var(--text-muted)] mb-4">
                  {t.about.education.uni.major}
                </p>

                <div className="flex justify-between items-center pt-3 border-t border-[var(--border-subtle)]">
                  <span className="text-xs text-[var(--text-muted)]">
                    {t.about.education.uni.year}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">
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
                <h3 className="text-lg font-bold text-[var(--text-heading)] mb-1">
                  {t.about.education.sma.name}
                </h3>
                <p className="text-sm text-[var(--text-body)] font-medium mb-1">
                  {t.about.education.sma.degree}
                </p>
                <p className="text-xs text-[var(--text-muted)] mb-4">
                  {t.about.education.sma.major}
                </p>

                <div className="flex justify-between items-center pt-3 border-t border-[var(--border-subtle)]">
                  <span className="text-xs text-[var(--text-muted)]">
                    {t.about.education.sma.year}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">
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
