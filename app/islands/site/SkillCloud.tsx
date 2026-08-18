import { useState } from "preact/hooks";
import { filterSkills, skillCategories } from "../../content.tsx";

type Variant = "a" | "b" | "c";

const skin = {
  a: {
    chipOn: "bg-sky-400 text-slate-950 shadow-lg shadow-sky-400/25",
    chipOff: "bg-white/5 text-slate-300 ring-1 ring-white/10 hover:bg-white/10",
    tag:
      "bg-white/[0.03] text-slate-200 ring-1 ring-white/10 hover:ring-sky-400/60 hover:bg-sky-400/10",
    tagOpen: "bg-sky-400/10 text-white ring-1 ring-sky-400/70",
    cat: "bg-sky-400/15 text-sky-200",
    count: "text-slate-500",
  },
  b: {
    chipOn: "bg-slate-900 text-white dark:bg-white dark:text-slate-900",
    chipOff:
      "text-slate-500 ring-1 ring-slate-300 hover:ring-slate-900 hover:text-slate-900 dark:text-slate-400 dark:ring-white/15 dark:hover:text-white dark:hover:ring-white/50",
    tag:
      "text-slate-700 ring-1 ring-slate-200 hover:ring-slate-900 dark:text-slate-300 dark:ring-white/10 dark:hover:ring-white/50",
    tagOpen:
      "text-slate-900 ring-1 ring-slate-900 bg-slate-50 dark:bg-white/5 dark:text-white dark:ring-white/60",
    cat: "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300",
    count: "text-slate-400",
  },
  c: {
    chipOn: "bg-cyan-400 text-slate-950",
    chipOff:
      "text-slate-400 ring-1 ring-cyan-400/25 hover:text-cyan-300 hover:ring-cyan-400/60",
    tag:
      "text-slate-300 ring-1 ring-cyan-400/20 hover:ring-cyan-400/70 hover:text-cyan-200",
    tagOpen: "text-cyan-200 ring-1 ring-cyan-400 bg-cyan-400/10",
    cat: "bg-amber-400/15 text-amber-300",
    count: "text-slate-500",
  },
} satisfies Record<Variant, Record<string, string>>;

/** Filterable keyword cloud. Tapping a keyword reveals its categories. */
export default function SkillCloud({ variant }: { variant: Variant }) {
  const s = skin[variant];
  const mono = variant === "c" ? "font-mono" : "";
  const radius = variant === "c" ? "rounded-none" : "rounded-lg";
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState("");

  const visible = filterSkills(filter);

  return (
    <div>
      <div class="mb-8 flex flex-wrap justify-center gap-2">
        {skillCategories.map((cat) => (
          <button
            type="button"
            onClick={() => {
              setFilter(cat);
              setOpen("");
            }}
            class={`px-4 py-1.5 text-xs font-medium uppercase tracking-[0.12em] transition-all duration-200 ${mono} ${
              variant === "c" ? "rounded-none" : "rounded-full"
            } ${filter === cat ? s.chipOn : s.chipOff}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {visible.map((skill) => {
          const isOpen = open === skill.name;
          return (
            <button
              type="button"
              key={skill.name}
              onClick={() => setOpen(isOpen ? "" : skill.name)}
              class={`group flex flex-col items-start px-3 py-2.5 text-left text-sm transition-all duration-200 ${radius} ${mono} ${
                isOpen ? s.tagOpen : s.tag
              }`}
            >
              <span class="flex items-center leading-tight">
                {skill.icon}
                <span class="truncate">{skill.name}</span>
              </span>
              <span
                class={`grid w-full transition-all duration-300 ${
                  isOpen
                    ? "mt-2 grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <span class="flex flex-wrap gap-1 overflow-hidden">
                  {skill.category.map((c) => (
                    <span
                      class={`px-2 py-0.5 text-[10px] font-medium tracking-wide ${
                        variant === "c" ? "rounded-none" : "rounded-full"
                      } ${s.cat}`}
                    >
                      {c}
                    </span>
                  ))}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <p class={`mt-6 text-center text-xs ${s.count} ${mono}`}>
        {visible.length} keywords
        {filter !== "All" ? ` in ${filter}` : ""}
      </p>
    </div>
  );
}
