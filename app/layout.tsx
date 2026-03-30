import type { ReactNode } from "react";
import { Manrope, Space_Grotesk } from "next/font/google";
import { Providers } from "@/app/providers";
import "./globals.css";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body"
});

const titleFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-title"
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content="69ca27bf0e56240fea198f11" />
        <meta
          name="talentapp:project_verification"
          content="428ae3b55194e76942e394b0e278091b618547cd8ba9d266a592b61ebc1feb6413f9a4a76796c81e0c32687954fb1434f65595d2fb7b4809f04b6fe2888deb59"
        />
      </head>
      <body className={`${bodyFont.variable} ${titleFont.variable}`}>
        <Providers>
          <div className="app-shell">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
