import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import Sidebar from "@/components/Sidebar";
import InitialLoader from "@/components/InitialLoader";
import ThemeTransition from "@/components/ThemeTransition";
import { ThemeTransitionProvider } from "@/context/ThemeTransitionContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Daniel Richard | Portfolio",
  description: "Personal Portfolio of Daniel Richard Ransun",
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "Richard | Portfolio",
    description: "Personal Portfolio of Daniel Richard Ransun",
    images: [{ url: "/logo.jpg", width: 1080, height: 1080 }],
  },
  twitter: {
    card: "summary",
    title: "Richard | Portfolio",
    description: "Personal Portfolio of Daniel Richard Ransun",
    images: ["/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased bg-background text-foreground overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          enableColorScheme={false}
          disableTransitionOnChange={false}
        >
          <ThemeTransitionProvider>
            <LanguageProvider>
              <InitialLoader />
              <ThemeTransition />
              <div className="max-w-screen-xl mx-auto flex min-h-screen">
                <Sidebar />

                <main className="flex-1 min-w-0 transition-all duration-300 lg:pt-0 pt-16">
                  {children}
                </main>
              </div>
            </LanguageProvider>
          </ThemeTransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
