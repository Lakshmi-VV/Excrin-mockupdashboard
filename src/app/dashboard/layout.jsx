import Sidebar from "@/components/Sidebar";
import "../globals.css";

export default function DashboardLayout({ children }) {
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
