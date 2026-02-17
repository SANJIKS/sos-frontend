import React from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./[locale]/globals.css";

// --- 🔥 НАЧАЛО ЗАПЛАТКИ (HOTFIX) ---
// Это создает "фейковый" localStorage на сервере, чтобы Next.js не падал
if (typeof window === 'undefined') {
  const storageMock = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    key: () => null,
    length: 0,
  };
  // @ts-ignore
  global.localStorage = storageMock;
  // @ts-ignore
  global.sessionStorage = storageMock;
}
// --- 🔥 КОНЕЦ ЗАПЛАТКИ ---

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  weight: ["400", "700", "600", "500", "300", "200", "100", "900"] 
});

export const metadata: Metadata = {
  title: "404 - Страница не найдена",
  description: "Запрашиваемая страница не существует",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>
      <body className={`${montserrat.className} web`} id="body" style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}