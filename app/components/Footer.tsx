import {
  SiGithub,
  SiYoutube,
} from 'react-icons/si';

function XIcon({ class: className }: { class?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" class={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer class="pt-12 pb-6 px-4 border-t border-gray-200 dark:border-gray-600">
      <div class="max-w-screen-lg mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Logo & description */}
          <div class="flex flex-col items-center md:items-start">
            <img class="w-32 dark:hidden" src="/images/loosedays_square_logo_light.png" alt="LOOSEDAYS logo"/>
            <img class="w-32 hidden dark:block" src="/images/loosedays_square_logo_dark.png" alt="LOOSEDAYS logo"/>
            <p class="mt-3 text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">
              IT Consulting, Architecture, and Product Development based in Tokyo.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div class="flex flex-col items-center md:items-start">
            <p class="text-sm font-bold mb-3 uppercase tracking-wide">Navigation</p>
            <div class="flex flex-col gap-1.5 text-sm text-center md:text-left">
              <a href="#sec_product" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition duration-200">Products</a>
              <a href="#sec_work" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition duration-200">Work</a>
              <a href="#sec_company" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition duration-200">Company</a>
              <a href="#sec_contact" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition duration-200">Contact</a>
            </div>
          </div>

          {/* Column 3: Connect */}
          <div class="flex flex-col items-center md:items-start">
            <p class="text-sm font-bold mb-3 uppercase tracking-wide">Connect</p>
            <div class="flex items-center gap-3 mb-4">
              <a href="https://github.com/snakaya/" target="_blank" class="p-2 rounded-full transition duration-200 hover:opacity-60" aria-label="GitHub">
                <SiGithub class="w-5 h-5" />
              </a>
              <a href="https://x.com/lsdys" target="_blank" class="p-2 rounded-full transition duration-200 hover:opacity-60" aria-label="X">
                <XIcon class="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@loosedaysjp" target="_blank" class="p-2 rounded-full transition duration-200 hover:opacity-60" aria-label="YouTube">
                <SiYoutube class="w-5 h-5" />
              </a>
            </div>
            <div class="flex flex-col gap-2">
              <a href="https://openid.net/foundation/sponsoring-members/" target="_blank" class="flex items-center gap-2 hover:opacity-80 transition duration-200">
                <img class="h-5 hidden dark:block" src="/images/openid_logo_dark.svg" alt="OpenID" />
                <img class="h-5 dark:hidden" src="/images/openid_logo_light.svg" alt="OpenID" />
                <span class="text-xs text-gray-500 dark:text-gray-400">Sponsoring Member</span>
              </a>
            </div>
            <div class="flex items-center gap-2 mt-3">
              <a href="https://deno.com/" target="_blank">
                <img class="h-6" src="https://shield.deno.dev/deno/%5E2.2.8" alt="Deno" />
              </a>
              <a href="https://fresh.deno.dev" target="_blank">
                <img class="h-6 dark:hidden" src="https://fresh.deno.dev/fresh-badge.svg" alt="Made with Fresh" />
                <img class="h-6 hidden dark:block" src="https://fresh.deno.dev/fresh-badge-dark.svg" alt="Made with Fresh" />
              </a>
            </div>
          </div>
        </div>

        <div class="mt-10 pt-6 border-t border-gray-200 dark:border-gray-600 text-center">
          <p class="text-xs text-gray-400">Copyright &copy; 2023-2026 LOOSEDAYS Co.,Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
