import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sooner";
import Provider from "@/providers";
import FavIcon from "../public/favicon.ico"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montSerrat = Montserrat({
  variable: "--font-mont-serrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Generate.ai",
  description: "Generate your AI Images by training your model",
  icons : [{rel : "icon",url : FavIcon.src}]
};

export default function RootLayout({
  children, 
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Provider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <body
            className={`${geistSans.variable} ${geistMono.variable} ${montSerrat.variable} antialiased`}
          >
            {children}
            <Toaster />
          </body>
        </ThemeProvider>
      </Provider>
    </html>
  );
}
