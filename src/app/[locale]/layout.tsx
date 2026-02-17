import React from "react";
import type { Metadata } from "next";
import MainApp from "@/appLayer/MainApp";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700", "600", "500", "300", "200", "100", "900"] });

export const metadata: Metadata = {
  title: process.env.title,
  description: "",
  // icons: '/static/icons/sos-logo.svg'
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const message = await getMessages();
  const locale = await getLocale();

  return (
    <NextIntlClientProvider messages={message}>
      <html lang={locale}>
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
          />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        </head>
        <body className={`${montserrat.className} web`} id="body" style={{ margin: 0, padding: 0 }}>
          <MainApp>{children}</MainApp>
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
