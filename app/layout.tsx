import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anime Character Analyzer | AI-Powered Character Insights",
  description:
    "Upload any anime character image and get detailed personality analysis, traits, and character insights powered by AI.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gradient-base min-h-screen">
        {/* Subtle geometric grid pattern */}
        <div className="fixed inset-0 pointer-events-none grid-pattern" />
        {/* Single soft green ambient glow — centered */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#50AF95]/[0.06] rounded-full blur-[120px]" />
        </div>
        {children}
      </body>
    </html>
  );
}
