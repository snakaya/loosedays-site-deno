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
    <footer class="flex flex-col pt-8 px-2 pb-2 text-sm">
      <div class="flex flex-col md:flex-row items-center justify-around">
        <div class="align-middle items-center">
          <img class="mx-auto w-36 p-2 m-2 inline dark:hidden" src="/images/loosedays_square_logo_light.png" alt="LOOSEDAYS logo"/>
          <img class="mx-auto w-36 p-2 m-2 hidden dark:inline" src="/images/loosedays_square_logo_dark.png" alt="LOOSEDAYS logo"/>
        </div>
        <div class="flex flex-col align-top">
          <p class="text-lg font-bold mb-1 text-center">Links:</p>
          <div class="flex justify-center">
            <a href="https://github.com/snakaya/" class="inline-block hover:bg-gray-800">
              <SiGithub class="p-2 m-2 inline-block align-middle w-16 h-16" />
            </a>
            <SiWordpress class="p-2 m-2 inline-block align-middle w-16 h-16 text-gray-500 bg-blend-multiply" />
            <SiTwitter class="p-2 m-2 inline-block align-middle w-16 h-16 text-gray-500 bg-blend-multiply" />
            <SiFacebook class="p-2 m-2 inline-block align-middle w-16 h-16 text-gray-500 bg-blend-multiply" />
            <SiYoutube class="p-2 m-2 inline-block align-middle w-16 h-16 text-gray-500 bg-blend-multiply" />
          </div>
          <p class="text-lg font-bold mb-1 text-center">Member:</p>
          <div class="flex justify-center">
            <a href="https://openid.net/foundation/sponsoring-members/" target="_blank" class="p-2 m-2 inline-block hover:bg-black">
              <img class="m-1 hidden dark:block" src="/images/openid_logo_dark.svg" />
              <img class="m-1 dark:hidden" src="/images/openid_logo_light.svg" />
            </a>
          </div>
        </div>
        <div class="flex flex-col align-top justify-between items-center">
          <p class="text-lg font-bold text-center">Powered by:</p>
          <a class="" href="https://deno.com/">
          <img class="m-1" width="197" height="37" src="https://shield.deno.dev/deno/%5E1.34.3" alt="Deno" />
          </a>
          <a href="https://fresh.deno.dev">
            <img class="m-1 dark:hidden" width="197" height="37" src="https://fresh.deno.dev/fresh-badge.svg" alt="Made with Fresh" />
            <img class="m-1 hidden dark:block" width="197" height="37" src="https://fresh.deno.dev/fresh-badge-dark.svg" alt="Made with Fresh" />
          </a>
          <a href="https://tailwindcss.com/">
            <img class="m-1" width="197" height="37" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
          </a>
        </div>
      </div>
      <div class="my-10">
        <p class="text-gray-500 space-y-2 text-center">Copyright© 2023 LOOSEDAYS Co.,Ltd.</p>
        <p class="mx-auto text-sm text-gray-500 text-center">All trademarks in this material are properties of their respective owners. </p>
      </div>
    </footer>
  );
}