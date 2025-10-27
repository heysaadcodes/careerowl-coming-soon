import Footer from "@/components/Footer";
import "./globals.css";
import { metadata } from "./metadata";
import Analytics from "@/components/Analytics";
import GoogleTagManager from "@/components/GoogleTagManager";

export { metadata }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <GoogleTagManager />
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}