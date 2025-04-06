import AddToSlack from "../islands/AddToSlack.tsx";

export function Product() {
  return (
    <div id="sec_product" class="pt-12 pb-12 mx-auto container px-4">
        <h2 class="p-4 text-3xl text-center font-bold mb-6">Product</h2>
        <div class="w-full mx-auto bg-gradient-to-r from-[#ff8888] to-[#8888ff] rounded-lg shadow-2xl overflow-hidden">
            <div class="relative">
                <div class="absolute inset-0 bg-no-repeat bg-center opacity-70 bg-[url('https://cdn.gachi.ai/static/gachiai_logo2_gray.png')]"></div>
                <div class="relative p-6 md:p-8 lg:p-10 text-center">
                    <div class="flex flex-col items-center justify-center space-y-6">
                        <h3 class="text-4xl font-black sm:text-5xl lg:text-6xl text-gray-800">
                            ガチAI / GACHI.ai
                        </h3>

                        <div class="mt-4 space-y-3">
                            <p class="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-wide text-gray-800">
                                Your Most Reliable AI Partner on Slack
                            </p>

                            <p class="text-xl text-gray-800">Start from Free Plan!</p>
                            <p class="text-lg text-gray-700 italic">2025年5月頃公開予定</p>
                        </div>

                        <div class="mt-6 md:mt-8">
                            <AddToSlack installUrl="https://gachi.ai/install" />
                        </div>

                        <p class="mt-6 text-xl font-medium">
                            <a href="https://gachi.ai/" target="_blank" class="text-blue-600 underline hover:text-blue-800">https://gachi.ai/</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <p class="mt-10 mb-5 text-xl md:text-2xl text-center font-medium">and more, coming soon.</p>
    </div>
  );
}