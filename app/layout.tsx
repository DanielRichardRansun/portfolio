import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import Sidebar from "@/components/Sidebar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Daniel Richard | Portfolio",
  description: "Personal Portfolio of Daniel Richard Ransun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased bg-background text-foreground overflow-x-hidden`}>
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          <LanguageProvider>
            
            {/* CONTAINER UTAMA:
                1. max-w-screen-xl : Membatasi lebar agar tidak full screen di monitor besar.
                2. mx-auto : Membuat posisi rata tengah kiri-kanan.
                3. flex : Menyusun Sidebar dan Main Content bersisian.
            */}
            <div className="max-w-screen-xl mx-auto flex min-h-screen">
              
              {/* Sidebar dipanggil di sini */}
              <Sidebar />

              {/* Area Konten Utama */}
              <main className="flex-1 min-w-0 transition-all duration-300">
                {children}
              </main>

            </div>

          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}