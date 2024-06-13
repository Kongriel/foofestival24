import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FooFest 24",
  description: "An awesome made-up festival",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header role="banner" className="mb-16">
          <Header />
        </header>
        <main role="main" id="main-content">
          {children}
        </main>
        <footer role="contentinfo">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
