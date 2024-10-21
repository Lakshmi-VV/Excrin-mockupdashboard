import Sidebar from "@/components/Sidebar";
import "./globals.css";

export const metadata = {
  title: "Mockup",
  description: "mockup dashboard - shadcnui",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <Sidebar />
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
