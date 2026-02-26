import HeroNav from "../islands/HeroNav.tsx";

export function Header() {
  return (
    <header class="mx-auto">
        <div class="hero-gradient relative overflow-hidden">
          {/* Animated decorative rings */}
          <div class="hero-ring" style="width: 500px; height: 500px; top: -120px; right: -80px; animation-delay: 0s;"></div>
          <div class="hero-ring hero-float-b" style="width: 350px; height: 350px; bottom: -100px; left: -60px;"></div>
          <div class="hero-ring hero-float-c" style="width: 200px; height: 200px; top: 40px; left: 15%;"></div>
          <div class="hero-ring-filled" style="width: 120px; height: 120px; bottom: 40px; right: 20%; animation-delay: 2s;"></div>
          <div class="hero-ring-filled hero-float-a" style="width: 60px; height: 60px; top: 60px; right: 35%;"></div>
          <div class="hero-ring hero-float-b" style="width: 80px; height: 80px; bottom: 80px; left: 40%;"></div>
          <div class="hero-ring-filled hero-float-c" style="width: 40px; height: 40px; top: 100px; left: 55%;"></div>
          <div class="hero-ring hero-float-a" style="width: 150px; height: 150px; top: -30px; left: 40%; animation-delay: 3s;"></div>

          {/* Dot grid */}
          <div class="absolute inset-0 pointer-events-none hero-dots"></div>

          {/* Diagonal accent lines */}
          <div class="absolute inset-0 pointer-events-none" style="opacity: 0.06;">
            <div style="position: absolute; top: 0; left: 30%; width: 2px; height: 140%; background: white; transform: rotate(25deg); transform-origin: top left;"></div>
            <div style="position: absolute; top: 0; left: 50%; width: 1px; height: 140%; background: white; transform: rotate(25deg); transform-origin: top left;"></div>
            <div style="position: absolute; top: 0; left: 70%; width: 2px; height: 140%; background: white; transform: rotate(25deg); transform-origin: top left;"></div>
          </div>

          {/* Logo */}
          <div class="relative pt-12 pb-4 flex justify-center">
            <img class="max-w-screen-md w-8/12 md:w-4/12 drop-shadow-lg" src="/images/loosedays_logo_dark.png" alt="LOOSEDAYS logo"/>
          </div>

          {/* Navigation */}
          <HeroNav />

          {/* Tagline */}
          <div class="relative py-20 md:py-28 text-center px-4">
            <p class="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
              be smart <span class="font-bold text-blue-300">loose</span>,
            </p>
            <p class="mt-3 text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
              make your easy <span class="font-bold text-blue-300">days</span>.
            </p>
            <p class="mt-8 text-lg md:text-xl text-blue-200 font-light tracking-wide">
              IT Consulting &middot; Architecture &middot; Product Development
            </p>
          </div>
        </div>
    </header>
  );
}
