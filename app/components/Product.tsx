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

        {/* GenAI OIDC IdP */}
        <div class="w-full mx-auto mt-10 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] rounded-lg shadow-2xl overflow-hidden">
            <div class="relative p-6 md:p-8 lg:p-10 text-center">
                <div class="flex flex-col items-center justify-center space-y-6">
                    <div class="flex items-center justify-center space-x-4">
                        <span class="text-5xl">🤖</span>
                        <img src="/images/openid_logo_dark.svg" alt="OpenID" class="h-12" />
                    </div>
                    <h3 class="text-3xl font-black sm:text-4xl lg:text-5xl text-white">
                        GenAI OIDC Identity Provider
                    </h3>

                    <div class="mt-4 space-y-3">
                        <p class="text-xl md:text-2xl lg:text-3xl font-semibold tracking-wide text-gray-200">
                            LLM-Powered OIDC Identity Provider
                        </p>

                        <p class="text-lg text-gray-300 max-w-3xl">
                            A proof-of-concept OIDC Identity Provider that delegates authentication logic, validation, and login UI generation to OpenAI LLM in real-time.
                        </p>
                    </div>

                    <div class="mt-4 flex flex-wrap justify-center gap-2">
                        <span class="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">OpenAI</span>
                        <span class="px-3 py-1 bg-green-600 text-white text-sm rounded-full">Deno</span>
                        <span class="px-3 py-1 bg-orange-600 text-white text-sm rounded-full">OIDC</span>
                        <span class="px-3 py-1 bg-purple-600 text-white text-sm rounded-full">PKCE</span>
                    </div>

                    <p class="mt-6 text-xl font-medium">
                        <a href="https://github.com/snakaya/GenAI-OIDC-IdP" target="_blank" class="text-blue-400 underline hover:text-blue-300">
                            GitHub Repository
                        </a>
                        {" | "}
                        <a href="https://genai-oidc.deno.dev" target="_blank" class="text-blue-400 underline hover:text-blue-300">
                            Live Demo
                        </a>
                    </p>
                </div>
            </div>
        </div>

        <p class="mt-10 mb-5 text-xl md:text-2xl text-center font-medium">and more, coming soon.</p>
    </div>
  );
}