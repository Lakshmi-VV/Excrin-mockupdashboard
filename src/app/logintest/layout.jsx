import "../globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="h-[100vh] flex items-center justify-center bg-[#FAFAFA]">
          <div className="bg-card w-400px py-[32px] px-[40px] flex justify-center items-center rounded-lg">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
