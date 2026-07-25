import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { LoadingScreen } from "@/components/LoadingScreen";
import { EffectsProvider } from "@/components/EffectsProvider";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { ScrollProgress } from "@/components/ScrollProgress";
import { GradientShift } from "@/components/GradientShift";
import { PixelDissolve } from "@/components/PixelDissolve";
import { ScrollToTop } from "@/components/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NSA RAIYYAN",
  description:
    "Full stack developer building clean, modern websites and apps with a focus on design, functionality, and attention to detail.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "256x256" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: "NSA RAIYYAN",
    description:
      "Full stack developer building clean, modern websites and apps.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col dark:bg-black dark:text-zinc-50 transition-colors duration-300">
        <LoadingScreen />
        <EffectsProvider>
        <ScrollProgress />
        <ScrollToTop />
        <GradientShift />
        <PixelDissolve />
        <NoiseOverlay />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="page-transition">
          {children}
          </div>
        </ThemeProvider>
        </EffectsProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
