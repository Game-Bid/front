import type { Metadata } from "next/types";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const metadata: Metadata = {
  title: "Game-Bid",
  description: "Game-Bid 경매 플랫폼 입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          {children}
          <ReactQueryDevtools />
        </QueryProvider>
      </body>
    </html>
  );
}
