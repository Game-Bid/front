import type { Metadata } from "next/types";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "@/components/layout/Header";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Game-Bid",
  description: "Game-Bid 경매 플랫폼 입니다.",
};

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`antialiased ${pretendard.className}`}>
        <QueryProvider>
          <Header />
          <main className="mt-[82px]">{children}</main>
          <ReactQueryDevtools />
        </QueryProvider>
      </body>
    </html>
  );
}
