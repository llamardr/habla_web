import { Work_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const workSans = Work_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Habla - Basado en datos",
  description: "Consultora de estrategia basada en investigación",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" className="scroll-smooth">
      <body className={workSans.className}>
        <div>
          <Toaster />
        </div>
        {children}
      </body>
    </html>
  );
}
