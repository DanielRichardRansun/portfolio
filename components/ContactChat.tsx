"use client";

import React from "react";
import { motion } from "framer-motion";
import { BsCheckAll } from "react-icons/bs";
import { useLanguage } from "@/context/LanguageContext";

const ContactChat = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full h-full flex flex-col justify-center gap-3 select-none pointer-events-none">
      {/* --- CHAT 1: KLIEN (KIRI) --- */}
      <motion.div
        initial={{ opacity: 0, x: -20, scale: 0.9 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="self-start max-w-[85%]"
      >
        <div className="flex flex-col gap-1">
          {/* Bubble */}
          <div className="bg-[var(--border-subtle)] backdrop-blur-sm border border-[var(--border-subtle)] px-3 py-2 rounded-2xl rounded-tl-sm text-xs text-[var(--text-body)] shadow-sm">
            {t.contact.chat.client_message}
          </div>
          {/* Timestamp */}
          <span className="text-[10px] text-[var(--text-muted)] ml-1">
            {t.contact.chat.timestamp_1}
          </span>
        </div>
      </motion.div>

      {/* --- CHAT 2: ANDA (KANAN) --- */}
      <motion.div
        initial={{ opacity: 0, x: 20, scale: 0.9 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="self-end max-w-[85%]"
      >
        <div className="flex flex-col gap-1 items-end">
          {/* Bubble (Warna Hijau/Accent) */}
          <div className="bg-green-500/20 backdrop-blur-sm border border-green-500/20 px-3 py-2 rounded-2xl rounded-tr-sm text-xs text-green-700 dark:text-green-100 shadow-sm">
            {t.contact.chat.reply_message}
          </div>
          {/* Timestamp & Read Receipt */}
          <div className="flex items-center gap-1 mr-1">
            <span className="text-[10px] text-[var(--text-muted)]">
              {t.contact.chat.timestamp_2}
            </span>
            <BsCheckAll className="text-blue-400 text-[12px]" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactChat;
