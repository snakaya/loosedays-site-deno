import { JSX } from "preact";

export function Company(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <div id="sec_company" class="pt-12 pb-12 mx-auto">
        <h2 class="p-4 text-3xl text-center font-bold">Company</h2>
		<ul class="mx-auto max-w-screen-md flex flex-row flex-nowrap justify-center border-b-2 p-3">
            <li class="w-1/2 font-medium text-center">Company Name</li>
            <li class="mx-auto font-light text-center">LOOSEDAYS Co.,Ltd.</li>
        </ul>
        <ul class="mx-auto max-w-screen-md flex flex-row flex-nowrap justify-center border-b-2 p-3">
            <li class="w-1/2 font-medium text-center">Business</li>
            <li class="mx-auto font-light text-center">IT Consulting, IT Architect, Technical Support of IT Development</li>
        </ul>
		<ul class="mx-auto max-w-screen-md flex flex-row flex-nowrap justify-center border-b-2 p-3">
			<li class="w-1/2 font-medium text-center">Founder &amp; President</li>
            <li class="mx-auto font-light text-center">
                Seiji Nakaya
            </li>
		</ul>
        <ul class="mx-auto max-w-screen-md flex flex-row flex-nowrap justify-center border-b-2 p-3">
            <li class="w-1/2 font-medium text-center">Established</li>
            <li class="mx-auto font-light text-center">Dec, 2020</li>
        </ul>
        <ul class="mx-auto max-w-screen-md flex flex-row flex-nowrap justify-center border-b-2 p-3">
            <li class="w-1/2 font-medium text-center">Capital</li>
            <li class="mx-auto font-light text-center">1 million yen</li>
        </ul>
        <ul class="mx-auto max-w-screen-md flex flex-row flex-nowrap justify-center border-b-2 p-3">
            <li class="w-1/2 font-medium text-center">Corporate Number (Japan)</li>
            <li class="mx-auto font-light text-center">4011301026464</li>
        </ul>
        <ul class="mx-auto max-w-screen-md flex flex-row flex-nowrap justify-center border-b-2 p-3">
            <li class="w-1/2 font-medium text-center">Location</li>
            <li class="mx-auto font-light text-center"><p>https://loosedays.jp/</p><p>Nishi-Shinjyuku, Shinjyuku, Tokyo, JAPAN 1600023</p></li>
        </ul>
	</div>
  );
}