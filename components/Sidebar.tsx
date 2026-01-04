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
} from "react-icons/fi";

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const menus = [
    { name: t.sidebar.home, href: "/", icon: <FiHome /> },
    { name: t.sidebar.about, href: "/about", icon: <FiUser /> },
    { name: t.sidebar.career, href: "/career", icon: <FiBriefcase /> },
    { name: t.sidebar.projects, href: "/projects", icon: <FiLayers /> },
    { name: t.sidebar.contact, href: "/contact", icon: <FiMail /> },
  ];

  if (!mounted) return null;

  return (
    <aside className="w-[280px] sticky top-0 h-screen flex flex-col px-6 py-10 overflow-y-auto z-50">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-28 h-28 mb-4 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-gray-700 to-gray-900">
          <Image
            src="/profile.jpg"
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full object-cover w-full h-full"
          />
        </div>
        <h2 className="text-lg font-bold text-white">Daniel Richard R.</h2>
        <p className="text-sm text-gray-500 font-medium">@danielrichard7</p>
      </div>

      {/* Switchers (Lebih Kalem) */}
      <div className="flex justify-center gap-3 mb-8">
        <div className="flex items-center bg-[#1E1E1E] rounded-full p-1">
          <button
            onClick={() => setLanguage("EN")}
            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
              language === "EN" ? "bg-primary text-black" : "text-gray-500"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage("ID")}
            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
              language === "ID" ? "bg-primary text-black" : "text-gray-500"
            }`}
          >
            ID
          </button>
        </div>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1E1E1E] text-gray-400 hover:text-white transition-colors"
        >
          {theme === "dark" ? <FiMoon size={14} /> : <FiSun size={14} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {menus.map((menu) => {
          const isActive = pathname === menu.href;
          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group
                ${
                  isActive
                    ? "bg-[#1E1E1E] text-white font-medium"
                    : "text-gray-500 hover:text-white hover:bg-white/5"
                }
              `}
            >
              <span
                className={` text-xl transition-transform duration-300 ease-out origin-center 
                  ${
                    isActive
                      ? "text-primary group-hover:-rotate-12 group-hover:scale-110"
                      : "text-gray-500 group-hover:text-white group-hover:-rotate-12 group-hover:scale-110"
                  }
                  `}
              >
                {menu.icon}
              </span>

              <span className="text tracking-wide">{menu.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8">
        <a
          href="https://www.canva.com/design/DAGxujweTzY/gzcOn7n6hELOZxBdxkgfDw/view?utm_content=DAGxujweTzY&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hb93f5e6498"
          target="_blank"
          rel="noopener noreferrer"
          className=" group relative flex items-center justify-center w-full py-3 overflow-hidden rounded-full border border-primary font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.2)] "
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
        <p className="text-[10px] text-gray-700 uppercase tracking-widest">
          {t.sidebar.footer}
        </p>
      </div>
    </aside>
  );
}
