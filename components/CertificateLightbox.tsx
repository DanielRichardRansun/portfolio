import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

interface CertificateLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  issuer: string;
  date: string;
}

const CertificateLightbox = ({
  isOpen,
  onClose,
  imageUrl,
  title,
  issuer,
  date,
}: CertificateLightboxProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Prevent background scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--overlay)] backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-4xl max-h-[90vh] flex flex-col"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
            aria-label="Close"
          >
            <FiX size={20} />
          </button>

          {/* Certificate image */}
          <div className="relative w-full h-full overflow-hidden rounded-xl bg-[var(--surface)] border border-[var(--border-subtle)]">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-contain"
              style={{ maxHeight: "70vh" }}
            />
          </div>

          {/* Certificate info */}
          <div className="mt-4 p-4 bg-[var(--surface)] border border-[var(--border-subtle)] rounded-xl">
            <h3 className="text-xl font-bold text-[var(--text-heading)] mb-1">
              {title}
            </h3>
            <div className="flex flex-wrap justify-between items-center mt-3">
              <div>
                <p className="text-xs text-[var(--text-muted)]">Issued by</p>
                <p className="text-sm font-medium text-[var(--text-heading)]">
                  {issuer}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[var(--text-muted)]">Date</p>
                <p className="text-sm font-medium text-[var(--text-heading)]">
                  {date}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CertificateLightbox;
