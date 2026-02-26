export function Company() {
  const rows = [
    { label: "Company Name", value: "LOOSEDAYS Co.,Ltd." },
    { label: "Business", value: "IT Consulting, IT Architect, Technical Support of IT Development" },
    { label: "Founder & President", value: "Seiji Nakaya" },
    { label: "Established", value: "Dec, 2020" },
    { label: "Capital", value: "1 million yen" },
    { label: "Corporate Number", value: "4011301026464" },
    { label: "Location", value: "Nishi-Shinjuku, Shinjuku, Tokyo, Japan" },
    { label: "Web", value: "https://loosedays.jp/" },
  ];

  return (
    <div id="sec_company" class="pt-16 pb-16 mx-auto container px-4">
        <h2 class="text-3xl text-center font-bold mb-2">Company</h2>
        <p class="text-center text-gray-500 dark:text-gray-400 mb-10">About us</p>

        <div class="max-w-screen-md mx-auto rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden">
            {rows.map((row, i) => (
                <div class={`flex flex-col sm:flex-row ${i < rows.length - 1 ? "border-b border-gray-200 dark:border-gray-600" : ""}`}>
                    <div class="sm:w-1/3 px-5 py-3 bg-gray-50 dark:bg-gray-600 font-medium text-sm text-gray-600 dark:text-gray-300">
                        {row.label}
                    </div>
                    <div class="sm:w-2/3 px-5 py-3 text-sm">
                        {row.value}
                    </div>
                </div>
            ))}
        </div>

        <div class="mt-8 flex justify-center">
            <a href="https://openid.net/foundation/sponsoring-members/" target="_blank" class="flex items-center gap-3 px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-md transition duration-200">
                <img class="h-8 hidden dark:block" src="/images/openid_logo_dark.svg" alt="OpenID Foundation" />
                <img class="h-8 dark:hidden" src="/images/openid_logo_light.svg" alt="OpenID Foundation" />
                <span class="text-sm font-medium">OpenID Foundation Sponsoring Member</span>
            </a>
        </div>
    </div>
  );
}
