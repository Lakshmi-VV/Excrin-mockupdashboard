"use client";
import "./globals.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apollo-client";

// export const metadata = {
//   title: "Mockup",
//   description: "mockup dashboard - shadcnui",
// };

export default function RootLayout({ children }) {
  return (
    <ApolloProvider client={client}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ApolloProvider>
  );
}
