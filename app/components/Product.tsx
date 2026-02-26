import AddToSlack from "../islands/AddToSlack.tsx";

export function Product() {
  return (
    <div id="sec_product" class="pt-16 pb-16 mx-auto container px-4">
        <h2 class="text-3xl text-center font-bold mb-2">Products</h2>
        <p class="text-center text-gray-500 dark:text-gray-400 mb-10">Solutions we build and ship</p>

        {/* LocalRAG — Featured */}
        <div class="w-full mx-auto bg-gradient-to-br from-[#0f172a] to-[#1e3a5f] rounded-2xl shadow-2xl overflow-hidden">
            <div class="p-8 md:p-12 lg:p-16">
                <div class="flex flex-col items-center text-center">
                    <img src="/images/localrag_logo.png" alt="LocalRAG" class="h-14 sm:h-16 lg:h-20 mb-6" />

                    <p class="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                        Chat with Your Documents<br />Privately
                    </p>

                    <p class="mt-4 text-lg text-blue-100 font-light max-w-2xl">
                        Import PDFs, EPUB, DOCX and more. Ask questions in natural language.
                        Get accurate answers with source citations — all on your device.
                    </p>

                    <div class="mt-6 flex flex-wrap justify-center gap-2">
                        <span class="px-3 py-1 bg-yellow-400 text-blue-900 text-sm font-bold rounded-full">Free</span>
                        <span class="px-3 py-1 bg-blue-400 text-white text-sm font-medium rounded-full">iOS</span>
                        <span class="px-3 py-1 bg-blue-400 text-white text-sm font-medium rounded-full">Android</span>
                        <span class="px-3 py-1 bg-blue-400 text-white text-sm font-medium rounded-full">Claude AI</span>
                        <span class="px-3 py-1 bg-blue-400 text-white text-sm font-medium rounded-full">9 Formats</span>
                    </div>

                    <p class="mt-8">
                        <a href="https://localrag.app" target="_blank" class="inline-block px-6 py-3 bg-yellow-400 text-blue-900 font-bold rounded-lg hover:bg-yellow-300 transition duration-200 text-lg">
                            localrag.app
                        </a>
                    </p>
                </div>
            </div>
        </div>

        {/* Secondary products */}
        <div class="mt-10 grid md:grid-cols-2 gap-6">
            {/* GACHI.ai */}
            <div class="bg-gradient-to-br from-[#ff6b6b] to-[#7c5ce0] rounded-2xl shadow-lg overflow-hidden">
                <div class="p-6 md:p-8 text-center">
                    <h3 class="text-3xl md:text-4xl font-black text-white">
                        GACHI.ai
                    </h3>
                    <p class="mt-3 text-lg font-medium text-white">
                        Your Most Reliable AI Partner on Slack
                    </p>
                    <p class="mt-2 text-white font-light">Start from Free Plan!</p>

                    <div class="mt-6">
                        <AddToSlack installUrl="https://gachi.ai/install" />
                    </div>

                    <p class="mt-4">
                        <a href="https://gachi.ai/" target="_blank" class="text-white underline hover:opacity-80 transition duration-200">gachi.ai</a>
                    </p>
                </div>
            </div>

            {/* GenAI OIDC IdP */}
            <div class="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl shadow-lg overflow-hidden">
                <div class="p-6 md:p-8 text-center">
                    <div class="flex items-center justify-center gap-3 mb-4">
                        <span class="text-4xl">🤖</span>
                        <img src="/images/openid_logo_dark.svg" alt="OpenID" class="h-10" />
                    </div>
                    <h3 class="text-2xl md:text-3xl font-black text-white">
                        GenAI OIDC IdP
                    </h3>
                    <p class="mt-3 text-gray-300 font-light">
                        LLM-Powered OIDC Identity Provider — a proof-of-concept that delegates authentication to OpenAI.
                    </p>

                    <div class="mt-4 flex flex-wrap justify-center gap-2">
                        <span class="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">OpenAI</span>
                        <span class="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full">Deno</span>
                        <span class="px-3 py-1 bg-orange-600 text-white text-xs font-medium rounded-full">OIDC</span>
                        <span class="px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded-full">PKCE</span>
                    </div>

                    <p class="mt-5 flex justify-center gap-4 text-sm">
                        <a href="https://github.com/snakaya/GenAI-OIDC-IdP" target="_blank" class="text-blue-400 underline hover:opacity-80 transition duration-200">GitHub</a>
                        <a href="https://genai-oidc.deno.dev" target="_blank" class="text-blue-400 underline hover:opacity-80 transition duration-200">Live Demo</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
}
