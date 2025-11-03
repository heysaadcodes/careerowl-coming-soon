import Footer from "@/components/Footer";
import "./globals.css";
import { metadata } from "./metadata";
import Analytics from "@/components/Analytics";
import GoogleTagManager from "@/components/GoogleTagManager";

export { metadata }

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "CareerOwl™",
  "alternateName": "Career Owl",
  "url": "https://thecareerowl.ca",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://thecareerowl.ca/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <GoogleTagManager />
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}