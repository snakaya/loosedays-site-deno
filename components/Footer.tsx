import {
  SiGithub,
  SiWordpress,
  SiTwitter,
  SiFacebook,
  SiYoutube,
  SiDeno,
} from 'react-icons/si';

export function Footer() {
  return (
    <footer class="flex flex-col md:flex-row pt-8 px-2 pb-2 text-sm justify-between">
      <div class="flex flex-1 flex-col">
        <p class="text-lg font-bold mb-1 text-center">Links:</p>
        <div class="flex justify-center">
          <a href="https://github.com/snakaya/" class="inline-block hover:text-black">
            <SiGithub class="p-2 m-2 inline-block align-middle w-16 h-16" />
          </a>
          <SiWordpress class="p-2 m-2 inline-block align-middle w-16 h-16" />
          <SiTwitter class="p-2 m-2 inline-block align-middle w-16 h-16" />
          <SiFacebook class="p-2 m-2 inline-block align-middle w-16 h-16" />
          <SiYoutube class="p-2 m-2 inline-block align-middle w-16 h-16" />
        </div>
      </div>
      <div class="flex flex-1 flex-col justify-between items-center">
        <p class="text-lg font-bold text-center">Powered by:</p>
        <a class="" href="https://deno.com/">
        <img class="m-1" width="197" height="37" src="https://shield.deno.dev/deno/%5E1.31.1" alt="Deno" />
        </a>
        <a href="https://fresh.deno.dev">
          <img class="m-1 dark:hidden" width="197" height="37" src="https://fresh.deno.dev/fresh-badge.svg" alt="Made with Fresh" />
          <img class="m-1 hidden dark:block" width="197" height="37" src="https://fresh.deno.dev/fresh-badge-dark.svg" alt="Made with Fresh" />
        </a>
        <a href="https://tailwindcss.com/">
          <img class="m-1" width="197" height="37" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
        </a>
      </div>
      <div class="flex flex-1 flex-col justify-between items-center">
        <img class="w-20 p-1 inline dark:hidden" src="/images/loosedays_square_logo_light.png" alt="LOOSEDAYS logo"/>
        <img class="w-20 p-1 hidden dark:inline" src="/images/loosedays_square_logo_dark.png" alt="LOOSEDAYS logo"/>
        <p class="text-gray-500 space-y-2 text-center">Copyright© 2023 LOOSEDAYS Co.,Ltd.</p>
        <p class="mx-auto text-sm text-gray-500 text-center">All trademarks in this material are properties of their respective owners. </p>
      </div>
    </footer>
  );
}