import { useState } from "preact/hooks";
import { contactCommand } from "../../content.tsx";

type Variant = "a" | "b" | "c";

const skin = {
  a: {
    shell: "rounded-2xl bg-white/[0.03] ring-1 ring-white/10",
    bar: "border-b border-white/10",
    text: "text-sky-200",
    button: "text-slate-400 hover:text-white hover:bg-white/10",
  },
  b: {
    shell:
      "rounded-2xl bg-slate-50 ring-1 ring-slate-200 dark:bg-white/5 dark:ring-white/10",
    bar: "border-b border-slate-200 dark:border-white/10",
    text: "text-slate-700 dark:text-slate-200",
    button:
      "text-slate-500 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white",
  },
  c: {
    shell: "bg-[#060b14] ring-1 ring-cyan-400/25",
    bar: "border-b border-cyan-400/25",
    text: "text-cyan-300",
    button: "text-slate-400 hover:text-cyan-300 hover:bg-cyan-400/10",
  },
} satisfies Record<Variant, Record<string, string>>;

/** The contact endpoint, presented as a terminal window you can copy from. */
export default function CopyCommand({ variant }: { variant: Variant }) {
  const s = skin[variant];
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contactCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard blocked — the text is selectable anyway */ }
  };

  return (
    <div class={`mx-auto max-w-3xl overflow-hidden ${s.shell}`}>
      <div class={`flex items-center gap-2 px-4 py-2.5 ${s.bar}`}>
        <span class="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span class="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span class="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        <span class="ml-2 font-mono text-[11px] uppercase tracking-[0.18em] opacity-50">
          contact
        </span>
        <button
          type="button"
          onClick={copy}
          class={`ml-auto rounded px-2.5 py-1 font-mono text-[11px] transition-colors duration-200 ${s.button}`}
        >
          {copied ? "copied ✓" : "copy"}
        </button>
      </div>
      <pre class="overflow-x-auto px-4 py-5 sm:px-6 sm:py-6"><code
        class={`font-mono text-[13px] leading-relaxed sm:text-sm ${s.text}`}
      >{contactCommand}</code></pre>
    </div>
  );
}
