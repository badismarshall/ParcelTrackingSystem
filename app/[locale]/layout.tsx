import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/providers/theme-provider"
import { ThemeModeToggle } from "@/components/shared/theme-mode-toggle";
import { cn } from "@/lib/utils";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound, redirect } from "next/navigation";
import LocaleSwitcher from "@/components/shared/LocaleSwitcher";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Parcelts",
  description: "Parcelts is a platform for creating and sharing parcels",
};

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable}`}
      >
        <TooltipProvider>
          <NextIntlClientProvider> 
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            > 
              {/* <div className={cn("absolute top-4 flex items-center gap-2", isRTL ? "left-4" : "right-4")}> */}
              <div className="absolute top-4 flex items-center gap-2 right-4">
                <ThemeModeToggle />
                <LocaleSwitcher />
              </div>
              <Toaster />
              {children}
            </ThemeProvider>
          </NextIntlClientProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
