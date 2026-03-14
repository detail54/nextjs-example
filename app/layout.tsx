import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "nextjs-example-todo-list",
  description: "nextjs-example-todo-list",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
