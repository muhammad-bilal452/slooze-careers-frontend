// import type React from "react";
// import type { Metadata } from "next";
// import { GeistSans } from "geist/font/sans";
// import { GeistMono } from "geist/font/mono";
// import { Analytics } from "@vercel/analytics/next";
// import { CartProvider } from "@/contexts/cart-context";
// import { Toaster } from "@/components/ui/toaster";
// import "./globals.css";
// import { TanStackProvider } from "@/provider/tan-stack-provider";
// import { AppSidebar } from "@/components/app-sidebar";
// import { getUserData } from "@/lib/get-user-data";

// export const metadata: Metadata = {
//   title: "SLOOZE Food Ordering System",
//   description: "Role-based food ordering application for Nick Fury's business",
// };

// export default async function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const { userRole } = await getUserData();
//   return (
//     <html lang="en" className="dark">
//       <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
//         <TanStackProvider>
//           <CartProvider>
//             <div className="flex min-h-screen w-full">
//               <AppSidebar userRole={userRole} />
//               {children}
//             </div>
//             <Toaster />
//           </CartProvider>
//         </TanStackProvider>
//         <Analytics />
//       </body>
//     </html>
//   );
// }

import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { CartProvider } from "@/contexts/cart-context";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { TanStackProvider } from "@/provider/tan-stack-provider";

export const metadata: Metadata = {
  title: "SLOOZE Food Ordering System",
  description: "Role-based food ordering application for Nick Fury's business",
};

// export default async function RootLayout({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <html lang="en" className="dark">
//       <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
//         <TanStackProvider>
//           <CartProvider>
//             <main className="min-h-screen w-full">{children}</main>
//             <Toaster />
//           </CartProvider>
//         </TanStackProvider>
//         <Analytics />
//       </body>
//     </html>
//   );
// }

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}
        suppressHydrationWarning={true}
      >
        <TanStackProvider>
          <CartProvider>
            <main className="min-h-screen w-full">{children}</main>
            <Toaster />
          </CartProvider>
        </TanStackProvider>
        <Analytics />
      </body>
    </html>
  );
}
