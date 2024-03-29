import AddToSlack from "../islands/AddToSlack.tsx";

export function Product() {
  return (
    <div id="sec_product" class="pt-12 pb-12 mx-auto">
        <h2 class="p-4 text-3xl text-center font-bold">Product</h2>
        <div class="mx-2 overflow-hidden border rounded-lg shadow-2xl md:grid md:grid-cols-3">
            <img src="https://aisebas.com/images/color_logo.png" class="line-block mx-auto w-[30%] md:h-full md:w-full object-cover"/>
            <div class="p-4 text-center sm:p-6 md:col-span-2 lg:p-8">
                <p class="text-4xl font-semibold tracking-widest">
                AIセバス
                </p>

                <h2 class="mt-6 font-black">
                <span class="text-4xl font-black sm:text-5xl lg:text-6xl">
                Slack + ChatGPT
                </span>

                <span class="mt-2 block text-xl">Start from JPY1100/mon</span>
                </h2>

                <div class="inline-block mx-auto">
                <AddToSlack />
                </div>

                <p class="mt-8 text-xl font-medium text-gray-400">
                    <a href="https://www.aisebas.com/" target="_blank" class="hover:underline">https://www.aisebas.com/</a>
                </p>
            </div>
        </div>
        <p class="mt-10 mb-5 text-2xl text-center font-medium">and more, comming soon.</p>
	</div>
  );
}