import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TranslationProvider } from "./Context/TranslationContext.";
import TranslateButton from "./Components/TranslateButton";
import ReduxProvider from "./store/Provider";
import AuthenticationWrapper from "./AuthenticationWrapper/AuthenticationWrapper";
import { SocketProvider } from "./Context/socketContext";
import { TansackQueryProvider } from "./lib/QueryProvider";
import { Toaster } from "sonner";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Adopte Un Coiffeur",
  description: "Find and post barber industry jobs in France. Employers can hire talent and run ads, while candidates discover barber job opportunities.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="preconnect" href="https://ztj32fojmi-dsn.algolia.net" crossOrigin="" />
      <link rel="dns-prefetch" href="https://ztj32fojmi-dsn.algolia.net" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
         <TansackQueryProvider>
        <ReduxProvider>
          <SocketProvider>
          <AuthenticationWrapper>
        <TranslationProvider> {/* Wrap everything with the provider */}
          {children}
          <Toaster position="bottom-right" richColors />
          <TranslateButton></TranslateButton>
        </TranslationProvider>
        </AuthenticationWrapper>
        </SocketProvider>
        </ReduxProvider>
        </TansackQueryProvider>
      </body>
    </html>
  );
}

