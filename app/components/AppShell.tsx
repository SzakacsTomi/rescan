import type { AbstractIntlMessages } from "next-intl";
import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { SmoothScroll } from "@/app/components/atoms/SmoothScroll";
import { montserrat, plexMono } from "@/lib/fonts";
import "@/app/globals.css";

type AppShellProps = {
  locale: string;
  messages: AbstractIntlMessages;
  children: ReactNode;
};

/**
 * The `<html>`/`<body>` shell, shared by `[locale]/layout.tsx` and the root
 * `not-found.tsx` (which sits outside the locale tree — see AGENTS.md's not-found
 * gotcha — and so cannot inherit it from that layout).
 */
export const AppShell = ({ locale, messages, children }: AppShellProps) => (
  <html lang={locale}>
    <body className={`${montserrat.variable} ${plexMono.variable} antialiased`}>
      <NextIntlClientProvider messages={messages}>
        <SmoothScroll>{children}</SmoothScroll>
      </NextIntlClientProvider>
    </body>
  </html>
);
