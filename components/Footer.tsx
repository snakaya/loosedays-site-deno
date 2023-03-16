import {
  SiGithub,
  SiWordpress,
  SiTwitter,
  SiFacebook,
  SiYoutube,
} from 'react-icons/si';

export function Footer() {
  return (
    <footer class="mx-auto flex flex-col md:flex-row pt-8 pb-1 text-sm text-center">
      <div class="flex-1 flex-col">
        <div class="m-2 flex flex-auto justify-center gap-1">
          <img class="max-w-screen-md w-20 md:w-20 dark:hidden" src="/images/loosedays_square_logo_light.png" alt="LOOSEDAYS logo"/>
          <img class="max-w-screen-md w-20 md:w-20 hidden dark:block" src="/images/loosedays_square_logo_dark.png" alt="LOOSEDAYS logo"/>
        </div>
        <div class="mx-2 text-gray-500 space-y-2 text-center">
          <p>Copyright© 2023 LOOSEDAYS Co.,Ltd.</p>
        </div>
      </div>
      <div class="flex-1 flex-col">
        <div class="flex flex-auto justify-center ">
          <a href="https://github.com/snakaya/" class="inline-block hover:text-black">
            <SiGithub class="p-2 m-2 inline-block align-middle w-16 h-16" />
          </a>
          <SiWordpress class="p-2 m-2 inline-block align-middle w-16 h-16" />
          <SiTwitter class="p-2 m-2 inline-block align-middle w-16 h-16" />
          <SiFacebook class="p-2 m-2 inline-block align-middle w-16 h-16" />
          <SiYoutube class="p-2 m-2 inline-block align-middle w-16 h-16" />
        </div>
        <div class="mt-auto mb-0 text-sm text-gray-500 space-y-2 text-center">
          <p>All trademarks in this material are properties of their respective owners. </p>
        </div>
      </div>
    </footer>
  );
}