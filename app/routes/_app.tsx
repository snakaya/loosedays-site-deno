import { PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <title>app</title>
        <style>{`
          body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
          html { scroll-behavior: smooth; }
          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .hero-gradient {
            background: linear-gradient(-45deg, #0a0a2e, #1a1a4e, #0050dc, #003399);
            background-size: 400% 400%;
            animation: gradient-shift 12s ease infinite;
          }
          .sticky-nav {
            position: sticky;
            top: 0;
            z-index: 50;
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
          }
          @keyframes float-up {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          @keyframes float-down {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(15px); }
          }
          @keyframes pulse-ring {
            0%, 100% { opacity: 0.12; transform: scale(1); }
            50% { opacity: 0.06; transform: scale(1.05); }
          }
          @keyframes drift-right {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(20px); }
          }
          .hero-ring {
            position: absolute;
            border-radius: 50%;
            border: 2px solid rgba(255, 255, 255, 0.12);
            pointer-events: none;
            animation: pulse-ring 6s ease-in-out infinite;
          }
          .hero-ring-filled {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.06);
            pointer-events: none;
            animation: float-up 8s ease-in-out infinite;
          }
          .hero-float-a { animation: float-up 7s ease-in-out infinite; }
          .hero-float-b { animation: float-down 9s ease-in-out infinite; }
          .hero-float-c { animation: drift-right 10s ease-in-out infinite; }
          .hero-dots {
            opacity: 0.06;
            background-image: radial-gradient(circle, white 1.5px, transparent 1.5px);
            background-size: 32px 32px;
          }
        `}</style>
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: `
          if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
          }
        `}} />
        <Component />
      </body>
    </html>
  );
}
