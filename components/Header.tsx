export function Header() {
  return (
    <header class="pt-12 pb-0 mx-auto">
        <h1 class="flex justify-center">
            <img class="max-w-screen-md w-8/12 md:w-4/12 dark:hidden" src="/images/loosedays_logo_light.png" alt="LOOSEDAYS logo"/>
            <img class="max-w-screen-md w-8/12 md:w-4/12 hidden dark:block" src="/images/loosedays_logo_dark.png" alt="LOOSEDAYS logo"/>
        </h1>
        <ul class="mx-auto max-w-screen-md py-10 flex flex-row justify-center text-center">
          <li class="flex-auto no-underline hover:underline"><a href="#top">TOP</a></li>
          <li class="flex-auto no-underline hover:underline"><a href="#sec_work">WORK</a></li>
          <li class="flex-auto no-underline hover:underline"><a href="#sec_company">COMPANY</a></li>
          <li class="flex-auto no-underline hover:underline"><a href="#sec_contact">CONTACT</a></li>
        </ul>
        <h2 class="bg-cover bg-no-repeat bg-center" style="background: url(../images/mainImg.png)">
          <p class="py-40 text-5xl text-center text-gray-100">
            be smart <span class="" style="text-decoration-line: underline; text-underline-offset: 8px; text-decoration-style: dashed;">loose</span>, make your easy <span class="" style="text-decoration-line: underline; text-underline-offset: 8px; text-decoration-style: dashed;">days</span>.
          </p>
        </h2>
    </header>  
  );
}