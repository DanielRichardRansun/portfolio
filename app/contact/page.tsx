"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import {
  FiMail,
  FiUser,
  FiMessageSquare,
  FiSend,
  FiLoader,
  FiCheckCircle,
  FiArrowRight,
} from "react-icons/fi";
import { SiGmail, SiInstagram, SiLinkedin, SiGithub } from "react-icons/si";

export default function Contact() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const FORMSPREE_ID = "xqeaarpw";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // PERBAIKAN DISINI: Cukup cek apakah ID ada isinya atau tidak
    if (!FORMSPREE_ID) {
      alert("Harap masukkan Form ID Formspree di codingan dulu ya! :)");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full min-h-screen p-6 md:p-10 pb-20 space-y-12">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="max-w-4xl pt-4"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-[#1E1E1E] border border-white/10 rounded-full text-white">
            <FiMail size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{t.contact.title}</h1>
            <p className="text-gray-500 text-sm">{t.contact.subtitle}</p>
          </div>
        </div>
      </motion.section>

      <div className="w-full h-px bg-white/5" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <motion.a
          href="mailto:richardgtwp@gmail.com"
          variants={fadeInUp}
          whileHover={{ y: -5 }}
          className="group relative overflow-hidden bg-gradient-to-br from-[#D44638] to-[#B23121] rounded-2xl p-6 min-h-[160px] flex flex-col justify-between"
        >
          <div className="absolute right-4 top-4 opacity-20 group-hover:opacity-40 transition-opacity">
            <SiGmail size={80} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              {t.contact.socials.email.title}
            </h3>
            <p className="text-white/80 text-xs">
              {t.contact.socials.email.desc}
            </p>
          </div>
          <div className="mt-4 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-4 py-2 rounded-lg w-fit transition-colors">
            {t.contact.socials.email.btn}{" "}
            <span className="group-hover:translate-x-1 transition-transform">
              ↗
            </span>
          </div>
        </motion.a>

        <motion.a
          href="https://instagram.com/danielrichard"
          target="_blank"
          variants={fadeInUp}
          whileHover={{ y: -5 }}
          className="group relative overflow-hidden bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] rounded-2xl p-6 min-h-[160px] flex flex-col justify-between"
        >
          <div className="absolute right-4 top-4 opacity-20 group-hover:opacity-40 transition-opacity">
            <SiInstagram size={80} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              {t.contact.socials.instagram.title}
            </h3>
            <p className="text-white/80 text-xs">
              {t.contact.socials.instagram.desc}
            </p>
          </div>
          <div className="mt-4 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-4 py-2 rounded-lg w-fit transition-colors">
            {t.contact.socials.instagram.btn}{" "}
            <span className="group-hover:translate-x-1 transition-transform">
              ↗
            </span>
          </div>
        </motion.a>

        <motion.a
          href="https://linkedin.com/in/danielrichard"
          target="_blank"
          variants={fadeInUp}
          whileHover={{ y: -5 }}
          className="group relative overflow-hidden bg-gradient-to-br from-[#0077B5] to-[#005582] rounded-2xl p-6 min-h-[160px] flex flex-col justify-between"
        >
          <div className="absolute right-4 top-4 opacity-20 group-hover:opacity-40 transition-opacity">
            <SiLinkedin size={80} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              {t.contact.socials.linkedin.title}
            </h3>
            <p className="text-white/80 text-xs">
              {t.contact.socials.linkedin.desc}
            </p>
          </div>
          <div className="mt-4 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-4 py-2 rounded-lg w-fit transition-colors">
            {t.contact.socials.linkedin.btn}{" "}
            <span className="group-hover:translate-x-1 transition-transform">
              ↗
            </span>
          </div>
        </motion.a>

        <motion.a
          href="https://github.com/@danielrichard"
          target="_blank"
          variants={fadeInUp}
          whileHover={{ y: -5 }}
          className="group relative overflow-hidden bg-gradient-to-br from-[#333333] to-[#000000] rounded-2xl p-6 min-h-[160px] flex flex-col justify-between border border-white/10"
        >
          <div className="absolute right-4 top-4 opacity-20 group-hover:opacity-40 transition-opacity text-white">
            <SiGithub size={80} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              {t.contact.socials.github.title}
            </h3>
            <p className="text-white/60 text-xs">
              {t.contact.socials.github.desc}
            </p>
          </div>
          <div className="mt-4 inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-lg w-fit transition-colors">
            {t.contact.socials.github.btn}{" "}
            <span className="group-hover:translate-x-1 transition-transform">
              ↗
            </span>
          </div>
        </motion.a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="pt-8"
      >
        <h2 className="text-lg font-bold text-white mb-6 border-l-4 border-white/20 pl-4">
          {t.contact.form.title}
        </h2>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-500/10 border border-green-500/30 p-8 rounded-2xl text-center max-w-2xl"
          >
            <div className="flex justify-center mb-4 text-green-500">
              <FiCheckCircle size={48} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Message Sent!
            </h3>
            <p className="text-gray-400">
              Thank you for reaching out. I'll get back to you soon at{" "}
              <b>{formData.email}</b>.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 px-6 py-2 bg-[#1E1E1E] text-white text-sm font-bold rounded-lg hover:bg-white/10 transition-colors"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-gray-400 ml-1">
                  {t.contact.form.name}
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-3.5 text-gray-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={status === "submitting"}
                    className="w-full bg-[#1E1E1E] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-white focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-sm disabled:opacity-50"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-gray-400 ml-1">
                  {t.contact.form.email}
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-3.5 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={status === "submitting"}
                    className="w-full bg-[#1E1E1E] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-white focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-sm disabled:opacity-50"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-gray-400 ml-1">
                {t.contact.form.message}
              </label>
              <div className="relative">
                <FiMessageSquare className="absolute left-4 top-3.5 text-gray-500" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  disabled={status === "submitting"}
                  className="w-full bg-[#1E1E1E] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-white focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-sm resize-none disabled:opacity-50"
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="
    group relative px-8 py-3 rounded-xl
    bg-white text-black font-bold text-sm
    overflow-hidden transition-all duration-300
    hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]
    hover:scale-105
    disabled:opacity-70 disabled:cursor-not-allowed 
    disabled:hover:scale-100 disabled:hover:shadow-none
  "
            >
              {status === "submitting" ? (
                <div className="flex items-center gap-2">
                  <FiLoader className="animate-spin" size={16} />
                  <span>Sending...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 transition-transform duration-300 group-hover:-translate-x-1">
                  <span>{t.contact.form.btn}</span>

                  <FiArrowRight className="w-0 opacity-0 -translate-x-2 transition-all duration-300 group-hover:w-4 group-hover:opacity-100 group-hover:translate-x-0" />
                </div>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
