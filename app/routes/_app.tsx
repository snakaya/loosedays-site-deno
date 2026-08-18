import { PageProps } from "fresh";

export default function App({ Component }: PageProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <title>LOOSEDAYS Co.,Ltd.</title>
        <style>
          {`
          body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
          html { scroll-behavior: smooth; background: #05070f; }
          @media (prefers-reduced-motion: reduce) {
            html { scroll-behavior: auto; }
          }
        `}
        </style>
      </head>
      <body class="bg-[#05070f]">
        <script src="/dark-mode.js"></script>
        <Component />
      </body>
    </html>
  );
}
