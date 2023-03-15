export function Header() {
  return (
    <div class="pt-12 pb-0 mx-auto">
        <h1 class="flex justify-center">
            <img class="max-w-screen-md w-8/12 md:w-4/12" src="/images/loosedays_logo.png" alt="LOOSEDAYS logo"/>
        </h1>
        <ul class="mx-auto max-w-screen-md py-10 flex flex-row justify-center text-center">
          <li class="flex-auto no-underline hover:underline"><a href="#top">TOP</a></li>
          <li class="flex-auto no-underline hover:underline"><a href="#sec_work">WORK</a></li>
          <li class="flex-auto no-underline hover:underline"><a href="#sec_company">COMPANY</a></li>
          <li class="flex-auto no-underline hover:underline"><a href="#sec_contact">CONTACT</a></li>
        </ul>
        <h2 class="bg-cover bg-no-repeat bg-center" style="background: url(../images/mainImg.png)"><p class="py-40 text-5xl text-center text-gray-100">be smart loose, make your easy days.</p></h2>
    </div>  
  );
}