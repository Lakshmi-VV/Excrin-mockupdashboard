import "./globals.css";

export const metadata = {
  title: "Mockup",
  description: "mockup dashboard - shadcnui",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
