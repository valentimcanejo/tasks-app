import Sidebar from "../components/Sidebar";
import "./globals.css";
import { Roboto } from "@next/font/google";

const roboto = Roboto({
  weight: "400",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className={roboto.className}>
        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  );
}
