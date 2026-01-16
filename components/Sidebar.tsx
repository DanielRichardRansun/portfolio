"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";
import {
  FiHome,
  FiUser,
  FiBriefcase,
  FiLayers,
  FiMail,
  FiDownload,
  FiMoon,
  FiSun,
  FiX,
  FiMenu,
} from "react-icons/fi";

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // --- SCROLL LOCK EFFECT ---
  // Mencegah scroll pada body saat menu mobile terbuka
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const menus = [
    { name: t.sidebar.home, href: "/", icon: <FiHome /> },
    { name: t.sidebar.about, href: "/about", icon: <FiUser /> },
    { name: t.sidebar.career, href: "/career", icon: <FiBriefcase /> },
    { name: t.sidebar.projects, href: "/projects", icon: <FiLayers /> },
    { name: t.sidebar.contact, href: "/contact", icon: <FiMail /> },
  ];

  if (!mounted) return null;

  return (
    <>
      {/* ==============================================================
          1. DESKTOP SIDEBAR (Hidden on Mobile)
         ============================================================== */}
      <aside className="hidden lg:flex w-[280px] sticky top-0 h-screen flex-col px-6 py-10 overflow-y-auto z-50 border-r border-white/5 bg-background">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-28 h-28 mb-4 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-gray-700 to-gray-900 shadow-lg">
            <Image
              src="/profile.jpg"
              alt="Profile"
              width={112}
              height={112}
              className="rounded-full object-cover w-full h-full"
              priority
            />
          </div>
          <h2 className="text-lg font-bold text-foreground">
            Daniel Richard R.
          </h2>
          <p className="text-sm text-muted-foreground font-medium">
            @danielrichard7
          </p>
        </div>

        {/* Switchers */}
        <div className="flex justify-center gap-3 mb-8">
          <div className="flex items-center bg-[#1E1E1E] rounded-full p-1 border border-white/5">
            <button
              onClick={() => setLanguage("EN")}
              className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                language === "EN"
                  ? "bg-primary text-black shadow-md"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("ID")}
              className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                language === "ID"
                  ? "bg-primary text-black shadow-md"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              ID
            </button>
          </div>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1E1E1E] border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            {theme === "dark" ? <FiMoon size={14} /> : <FiSun size={14} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {menus.map((menu) => {
            const isActive = pathname === menu.href;
            return (
              <Link
                key={menu.href}
                href={menu.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden
                  ${
                    isActive
                      ? "bg-[#1E1E1E] text-white font-medium shadow-inner"
                      : "text-gray-500 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                <span
                  className={`text-xl transition-transform duration-300 ease-out origin-center
                  ${
                    isActive
                      ? "text-primary group-hover:-rotate-12 group-hover:scale-110"
                      : "text-gray-500 group-hover:text-white group-hover:-rotate-12 group-hover:scale-110"
                  }
                  `}
                >
                  {menu.icon}
                </span>
                <span className="tracking-wide text-base">{menu.name}</span>

                {isActive && (
                  <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-gray-500 shadow-[0_0_8px_rgba(0,0,0,0.5)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Download CV */}
        <div className="mt-8">
          <a
            href="https://www.canva.com/design/DAGxujweTzY/gzcOn7n6hELOZxBdxkgfDw/view?utm_content=DAGxujweTzY&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hb93f5e6498"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center w-full py-3 overflow-hidden rounded-full border border-primary font-semibold transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] bg-transparent"
          >
            <span className="absolute left-0 top-0 h-full w-[120%] -translate-x-[120%] -skew-x-40 bg-primary transition-transform duration-500 ease-out group-hover:-translate-x-2"></span>
            <span className="relative z-10 flex items-center gap-2 text-primary transition-colors duration-300 group-hover:text-black">
              <FiDownload
                size={18}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              <span className="text-sm">{t.sidebar.download}</span>
            </span>
          </a>
        </div>

        <div className="mt-6 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest opacity-50">
            {t.sidebar.footer}
          </p>
        </div>
      </aside>

      {/* ==============================================================
          2. MOBILE HEADER (Fixed Top Bar)
         ============================================================== */}
      <div className="lg:hidden fixed top-0 left-0 w-full h-16 bg-[#121212]/90 backdrop-blur-md border-b-1 border-white/8 z-40 px-5 flex items-center justify-between transition-all duration-300">
        {/* Left: Profile & Name */}
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/10">
            <Image
              src="/profile.jpg"
              alt="Profile"
              width={36}
              height={36}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white leading-none">
              Daniel Richard R.
            </span>
            <span className="text-[10px] text-gray-500">Software Engineer</span>
          </div>
        </div>

        {/* Right: Hamburger Button */}
        <button
          className="p-2 -mr-2 text-white hover:text-primary transition-colors active:scale-90"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <FiMenu size={24} />
        </button>
      </div>

      <div
        className={`lg:hidden fixed inset-0 z-50 bg-[#121212] flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] 
        ${
          mobileMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible translate-y-4"
        }`}
      >
        {/* Close Button (Top Right) */}
        <button
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white bg-white/5 rounded-full border border-white/10 transition-all active:scale-90 z-50"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <FiX size={24} />
        </button>

        {/* Container Utama: h-full + justify-between agar konten tersebar rata */}
        <div className="w-full max-w-md px-8 h-full flex flex-col justify-between py-10">
          {/* 1. Profile Section (Compact) */}
          {/* mt-10 agar tidak nabrak tombol close */}
          <div className="flex flex-col items-center text-center mt-8 shrink-0">
            <div className="relative w-22 h-22 mb-3 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-gray-700 to-gray-900 shadow-2xl">
              <Image
                src="/profile.jpg"
                alt="Profile"
                width={80}
                height={80}
                className="rounded-full object-cover w-full h-full"
              />
            </div>
            <h2 className="text-lg font-bold text-white">Daniel Richard R.</h2>
            <p className="text-xs text-gray-500 font-medium">@danielrichard7</p>
          </div>

          {/* 2. Navigation Links */}
          {/* flex-1 agar mengambil sisa ruang tengah */}
          <nav className="flex flex-col justify-center w-full gap-2 flex-1 my-4">
            {menus.map((menu) => {
              const isActive = pathname === menu.href;
              return (
                <Link
                  key={menu.href}
                  href={menu.href}
                  onClick={() => setMobileMenuOpen(false)}
                  // Padding dikurangi (py-3) agar muat banyak menu
                  className={`flex items-center justify-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 border 
                  ${
                    isActive
                      ? "bg-white/10 border-white/10 text-white shadow-lg scale-105"
                      : "bg-transparent border-transparent text-gray-400 hover:text-white hover:bg-white/5"
                  }
                  `}
                >
                  <span className={`text-lg ${isActive ? "text-primary" : ""}`}>
                    {menu.icon}
                  </span>
                  <span className="text-base font-medium tracking-wide">
                    {menu.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* 3. Controls & Footer (Bottom) */}
          <div className="flex flex-col items-center gap-5 w-full shrink-0">
            {/* Switchers */}
            <div className="flex items-center justify-between gap-6 p-1 bg-white/5 rounded-full border border-white/5">
              <div className="flex">
                <button
                  onClick={() => setLanguage("EN")}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    language === "EN"
                      ? "bg-primary text-black"
                      : "text-gray-500"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage("ID")}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    language === "ID"
                      ? "bg-primary text-black"
                      : "text-gray-500"
                  }`}
                >
                  ID
                </button>
              </div>
              <div className="w-px h-4 bg-white/10 mx-1"></div>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-white"
              >
                {theme === "dark" ? <FiMoon size={16} /> : <FiSun size={16} />}
              </button>
            </div>

            {/* Download CV */}
            <a
              href="https://www.canva.com/design/DAGxujweTzY/gzcOn7n6hELOZxBdxkgfDw/view?utm_content=DAGxujweTzY&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hb93f5e6498"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-primary font-bold text-sm hover:underline underline-offset-4 decoration-primary"
            >
              <FiDownload />
              {t.sidebar.download}
            </a>

            <p className="text-[9px] text-gray-600 uppercase tracking-widest">
              {t.sidebar.footer}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
