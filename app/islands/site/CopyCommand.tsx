import { useState } from "preact/hooks";
import { contactCommand } from "../../content.tsx";

/** The contact endpoint, presented as a terminal window you can copy from. */
export default function CopyCommand() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contactCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard blocked — the text is selectable anyway */ }
  };

  return (
    <div class="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-white/[0.03] ring-1 ring-white/10">
      <div class="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span class="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span class="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span class="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        <span class="ml-2 font-mono text-[11px] uppercase tracking-[0.18em] opacity-50">
          contact
        </span>
        <button
          type="button"
          onClick={copy}
          class="ml-auto rounded px-2.5 py-1 font-mono text-[11px] text-slate-400 transition-colors duration-200 hover:bg-white/10 hover:text-white"
        >
          {copied ? "copied ✓" : "copy"}
        </button>
      </div>
      <pre class="overflow-x-auto px-4 py-5 sm:px-6 sm:py-6"><code
        class="font-mono text-[13px] leading-relaxed text-sky-200 sm:text-sm"
      >{contactCommand}</code></pre>
    </div>
  );
}
