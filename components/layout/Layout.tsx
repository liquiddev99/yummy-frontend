import Navbar from "./Navbar";
import Footer from "./Footer";
import { Roboto } from "@next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "900", "700"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={roboto.className}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
