import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import { SchedulingProvider } from "@/context/SchedulingContext";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "NavHub - Agendamento de Barbearia",
  description: "Seu agendamento rápido e premium na NavHub",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "NavHub",
  },
  applicationName: "NavHub",
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground font-sans min-h-full flex flex-col no-scrollbar">
        <SchedulingProvider>
          <div className="flex-1 flex flex-col w-full max-w-md mx-auto relative bg-[#0D0D0D] border-x border-[#1A1A1A] min-h-screen shadow-2xl pb-24">
            <Header />
            <main className="flex-1 flex flex-col px-5 py-2">
              {children}
            </main>
            <Navbar />
          </div>
        </SchedulingProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(reg) {
                    console.log('SW registered successfully:', reg.scope);
                  }).catch(function(err) {
                    console.log('SW registration failed:', err);
                  });
                });
              }
            `
          }}
        />
      </body>
    </html>
  );
}
