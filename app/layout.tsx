import "./globals.css";
import { Public_Sans } from "next/font/google";


const publicSans = Public_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title></title>
        <link rel="shortcut icon" href="/images/bank.jpg" />
        <meta
          name="description"
          content=""
        />
        <meta property="og:title" content="" />
        <meta
          property="og:description"
          content=""
        />
        <meta property="og:image" content="" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="" />
        <meta
          name="twitter:description"
          content="Sterling Bank"
        />
        <meta name="twitter:image" content="" />
      </head>
      <body className={publicSans.className}>
        <div className="">
          
          {children}
        </div>
      </body>
    </html>
  );
}
