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

        {/* Secondary products — full-width, vertically compact banners */}
        <div class="mt-6 space-y-6">
            {/* Vibsync */}
            <div class="bg-gradient-to-br from-[#29216f] to-[#4f46e5] rounded-2xl shadow-lg overflow-hidden">
                <div class="p-6 md:px-10 md:py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-center md:text-left">
                    <div class="md:flex-1 md:pr-6">
                        <h3 class="text-2xl md:text-3xl font-black text-white">
                            Vibsync
                        </h3>
                        <p class="mt-1 text-base md:text-lg font-medium text-white">
                            One Shared Brain for Your Team&#39;s AI Coding Agents
                        </p>
                        <p class="mt-1 text-sm text-indigo-100 font-light">
                            Shared memory, async Q&amp;A, and file-claim coordination over MCP — vendor-neutral, free during beta.
                        </p>
                    </div>
                    <div class="flex flex-col items-center md:items-end gap-3 md:flex-shrink-0">
                        <div class="flex flex-wrap justify-center md:justify-end gap-2">
                            <span class="px-3 py-1 bg-indigo-900 text-indigo-100 text-xs font-medium rounded-full">MCP</span>
                            <span class="px-3 py-1 bg-indigo-900 text-indigo-100 text-xs font-medium rounded-full">Claude Code</span>
                            <span class="px-3 py-1 bg-indigo-900 text-indigo-100 text-xs font-medium rounded-full">Cursor</span>
                            <span class="px-3 py-1 bg-indigo-900 text-indigo-100 text-xs font-medium rounded-full">Codex</span>
                        </div>
                        <a href="https://vibsync.com/" target="_blank" rel="noopener" class="inline-block px-6 py-2 bg-white text-[#342d8b] font-bold rounded-lg hover:bg-indigo-50 transition duration-200 whitespace-nowrap">
                            vibsync.com
                        </a>
                    </div>
                </div>
            </div>

            {/* GenAI OIDC IdP */}
            <div class="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl shadow-lg overflow-hidden">
                <div class="p-6 md:px-10 md:py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-center md:text-left">
                    <div class="md:flex-1 md:pr-6">
                        <div class="flex items-center justify-center md:justify-start gap-3 mb-2">
                            <span class="text-3xl">🤖</span>
                            <img src="/images/openid_logo_dark.svg" alt="OpenID" class="h-8" />
                        </div>
                        <h3 class="text-2xl md:text-3xl font-black text-white">
                            GenAI OIDC IdP
                        </h3>
                        <p class="mt-1 text-sm text-gray-300 font-light">
                            LLM-Powered OIDC Identity Provider — a proof-of-concept that delegates authentication to OpenAI.
                        </p>
                    </div>
                    <div class="flex flex-col items-center md:items-end gap-3 md:flex-shrink-0">
                        <div class="flex flex-wrap justify-center md:justify-end gap-2">
                            <span class="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">OpenAI</span>
                            <span class="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full">Deno</span>
                            <span class="px-3 py-1 bg-orange-600 text-white text-xs font-medium rounded-full">OIDC</span>
                            <span class="px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded-full">PKCE</span>
                        </div>
                        <p class="flex gap-4 text-sm">
                            <a href="https://github.com/snakaya/GenAI-OIDC-IdP" target="_blank" class="text-blue-400 underline hover:opacity-80 transition duration-200">GitHub</a>
                            <a href="https://genai-oidc.deno.dev" target="_blank" class="text-blue-400 underline hover:opacity-80 transition duration-200">Live Demo</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
