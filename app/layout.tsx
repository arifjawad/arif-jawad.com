import type { Metadata } from "next";
import "@fontsource-variable/inter-tight";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import Providers from "@/components/Providers";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  metadataBase: new URL("https://arif-jawad.com"),
  title: { default: `${site.name}® — ${site.person}`, template: `%s — ${site.name}®` },
  description: "Senior backend engineer building payment gateways, orchestration, trading services and AI automation.",
  openGraph: { title: `${site.name}® — ${site.person}`, description: "Backend systems for payments and trading.", type: "website" },
};

const themeScript = `try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>
        <Providers>
          <Nav />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
