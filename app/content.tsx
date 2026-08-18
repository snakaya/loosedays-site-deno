/**
 * Single source of truth for all site copy.
 *
 * The redesign proposals under /preview render exactly this content with
 * different visual languages, so the wording never diverges between drafts.
 */
import { JSX } from "preact";
import {
  SiAmazonaws,
  SiAmazondynamodb,
  SiAndroid,
  SiApple,
  SiDeno,
  SiDjango,
  SiFastapi,
  SiFlask,
  SiJavascript,
  SiKubernetes,
  SiMicrosoftazure,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiOpenid,
  SiOracle,
  SiPostgresql,
  SiPython,
  SiRedis,
  SiTypescript,
  SiWebauthn,
} from "react-icons/si";
import {
  Tb3DCubeSphere,
  TbArrowsMaximize,
  TbBoxModel2,
  TbBrain,
  TbBulb,
  TbCertificate,
  TbCode,
  TbCpu,
  TbFileCode,
  TbFingerprint,
  TbFlask,
  TbInfinity,
  TbLetterA,
  TbMessageChatbot,
  TbNetwork,
  TbPlugConnected,
  TbRadar2,
  TbRobot,
  TbRotateRectangle,
  TbTerminal2,
  TbTopologyComplex,
  TbUserCheck,
  TbVectorTriangle,
} from "react-icons/tb";

export const navLinks = [
  { href: "#top", label: "Top" },
  { href: "#sec_product", label: "Products" },
  { href: "#sec_work", label: "Work" },
  { href: "#sec_company", label: "Company" },
  { href: "#sec_contact", label: "Contact" },
];

export const tagline = {
  line1: ["be smart ", "loose", ","],
  line2: ["make your easy ", "days", "."],
  sub: "IT Consulting · Architecture · Product Development",
};

export interface Product {
  id: string;
  name: string;
  headline: string;
  desc: string;
  tags: string[];
  links: { label: string; href: string }[];
  /** Image wordmark, when the product has one. */
  logo?: string;
  /** Drawn symbol, for products whose name is set as type. */
  mark?: (props: { class?: string }) => JSX.Element;
  /** Silent demo loop shown beside the copy. */
  media?: {
    src: string;
    poster: string;
    label: string;
    /** "screen" is a desktop capture, "phone" a handset recording. */
    shape: "screen" | "phone";
  };
  accent: string;
  /** "product" ships to customers; "lab" is an experiment we publish. */
  tier: "product" | "lab";
  /** Short qualifier shown on lab entries. */
  note?: string;
}

/** Vibsync's symbol: a shield with a sync waveform across its vertices. */
function VibsyncMark({ class: className }: { class?: string }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" class={className}>
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path
          d="M60 12C80 12 98 30 98 52C98 78 82 96 60 106C38 96 22 78 22 52C22 30 40 12 60 12Z"
          stroke-width="6"
        />
        <path
          d="M26 72C39 52 48 54 60 91C72 54 81 52 94 72"
          stroke-width="13"
        />
      </g>
      <g fill="currentColor">
        <circle cx="60" cy="12" r="9" />
        <circle cx="92" cy="32" r="9" />
        <circle cx="94" cy="72" r="9" />
        <circle cx="60" cy="106" r="9" />
        <circle cx="26" cy="72" r="9" />
        <circle cx="28" cy="32" r="9" />
      </g>
    </svg>
  );
}

/** The OIDC proof-of-concept leads with a bot and the OpenID mark. */
function GenAiOidcMark({ class: className }: { class?: string }) {
  return (
    <span class={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <span aria-hidden="true" class="text-2xl leading-none">🤖</span>
      <img src="/images/openid_logo_dark.svg" alt="OpenID" class="h-6" />
    </span>
  );
}

export const products: Product[] = [
  {
    id: "vibsync",
    name: "Vibsync",
    headline: "One Shared Brain for Your Team's AI Coding Agents",
    desc:
      "Shared memory, async Q&A, and file-claim coordination over MCP — vendor-neutral, free during beta.",
    tags: ["MCP", "Claude Code", "Cursor", "Codex"],
    links: [{ label: "vibsync.com", href: "https://vibsync.com/" }],
    mark: VibsyncMark,
    media: {
      src: "/media/vibsync-demo.mp4",
      poster: "/media/vibsync-demo.jpg",
      label:
        "Two AI coding tools side by side, both reading and writing the same Vibsync team memory",
      shape: "screen",
    },
    accent: "#6366f1",
    tier: "product",
  },
  {
    id: "localrag",
    name: "LocalRAG",
    headline: "Chat with Your Documents Privately",
    desc:
      "Import PDFs, EPUB, DOCX and more. Ask questions in natural language. Get accurate answers with source citations — all on your device.",
    tags: ["Free", "iOS", "Android", "Claude AI", "9 Formats"],
    links: [{ label: "localrag.app", href: "https://localrag.app" }],
    logo: "/images/localrag_logo.png",
    media: {
      src: "/media/localrag-demo.mp4",
      poster: "/media/localrag-demo.jpg",
      label:
        "The LocalRAG app importing documents and answering questions about them on a phone",
      shape: "phone",
    },
    accent: "#facc15",
    tier: "product",
  },
  {
    id: "genai-oidc",
    name: "GenAI OIDC IdP",
    headline: "LLM-Powered OIDC Identity Provider",
    desc: "A proof-of-concept that delegates authentication to OpenAI.",
    tags: ["OpenAI", "Deno", "OIDC", "PKCE"],
    links: [
      { label: "GitHub", href: "https://github.com/snakaya/GenAI-OIDC-IdP" },
      {
        label: "Live Demo",
        href: "https://genai-oidc-client.loosedays.deno.net/",
      },
    ],
    mark: GenAiOidcMark,
    accent: "#38bdf8",
    tier: "lab",
    note: "Proof of Concept",
  },
];

export interface Service {
  title: string;
  desc: string;
  icon: (props: { class?: string }) => JSX.Element;
}

export const services: Service[] = [
  {
    title: "Technical Consulting",
    desc: "We complement your project by providing our technical skills.",
    icon: (p) => <TbBulb class={p.class} />,
  },
  {
    title: "Product Development",
    desc:
      "We deliver solutions to our customers through the development of our original products.",
    icon: (p) => <TbCode class={p.class} />,
  },
  {
    title: "Architect",
    desc:
      "All-in-one architect, front-end to back-end, network configuration to business specifications.",
    icon: (p) => <TbTopologyComplex class={p.class} />,
  },
  {
    title: "Technical Research",
    desc: "Take advantage of our extensive experience!",
    icon: (p) => <TbFlask class={p.class} />,
  },
];

export interface Skill {
  name: string;
  category: string[];
  icon: JSX.Element;
}

const ic = "inline-block align-middle mr-1.5 shrink-0";

export const skills: Skill[] = [
  {
    name: "OpenID Connect",
    category: ["Identity", "Security"],
    icon: <SiOpenid class={ic} />,
  },
  {
    name: "OAuth2",
    category: ["Identity", "Security"],
    icon: <TbLetterA class={ic} />,
  },
  {
    name: "FIDO",
    category: ["Identity", "Security"],
    icon: <SiWebauthn class={ic} />,
  },
  {
    name: "Passkey",
    category: ["Identity", "Security"],
    icon: <TbFingerprint class={ic} />,
  },
  {
    name: "SSI",
    category: ["Identity", "Security"],
    icon: <TbUserCheck class={ic} />,
  },
  {
    name: "DID/VC",
    category: ["Identity", "Security"],
    icon: <TbCertificate class={ic} />,
  },
  {
    name: "Kubernetes",
    category: ["Cloud Computing", "Network", "Infrastructure"],
    icon: <SiKubernetes class={ic} />,
  },
  {
    name: "AWS",
    category: ["Cloud Computing", "Network", "Infrastructure"],
    icon: <SiAmazonaws class={ic} />,
  },
  {
    name: "Azure",
    category: ["Cloud Computing", "Network", "Infrastructure"],
    icon: <SiMicrosoftazure class={ic} />,
  },
  {
    name: "L2/L3/L4 Networking",
    category: ["Network", "Infrastructure"],
    icon: <TbNetwork class={ic} />,
  },
  {
    name: "DevOps",
    category: ["Development", "Deployment", "Auto Testing"],
    icon: <TbInfinity class={ic} />,
  },
  {
    name: "CI/CD",
    category: ["Development", "Deployment", "Auto Testing"],
    icon: <Tb3DCubeSphere class={ic} />,
  },
  {
    name: "IaC",
    category: ["Cloud Computing", "Network", "Deployment", "Auto Testing"],
    icon: <TbFileCode class={ic} />,
  },
  {
    name: "Python",
    category: ["Programing", "Python"],
    icon: <SiPython class={ic} />,
  },
  {
    name: "Django",
    category: ["Programing", "Web Framework", "Python"],
    icon: <SiDjango class={ic} />,
  },
  {
    name: "FastAPI",
    category: ["Programing", "Web Framework", "Python"],
    icon: <SiFastapi class={ic} />,
  },
  {
    name: "Flask",
    category: ["Programing", "Web Framework", "Python"],
    icon: <SiFlask class={ic} />,
  },
  {
    name: "TypeScript",
    category: ["Programing", "TypeScript", "JavaScript"],
    icon: <SiTypescript class={ic} />,
  },
  {
    name: "JavaScript",
    category: ["Programing", "TypeScript", "JavaScript"],
    icon: <SiJavascript class={ic} />,
  },
  {
    name: "Deno",
    category: ["Programing", "Web Framework", "TypeScript", "JavaScript"],
    icon: <SiDeno class={ic} />,
  },
  {
    name: "NodeJS",
    category: ["Programing", "Web Framework", "TypeScript/JavaScript"],
    icon: <SiNodedotjs class={ic} />,
  },
  {
    name: "Clean Architecture",
    category: ["Architecture", "Programing"],
    icon: <TbBoxModel2 class={ic} />,
  },
  {
    name: "PostgreSQL",
    category: ["Database", "RDB"],
    icon: <SiPostgresql class={ic} />,
  },
  {
    name: "Oracle",
    category: ["Database", "RDB"],
    icon: <SiOracle class={ic} />,
  },
  {
    name: "MySQL",
    category: ["Database", "RDB"],
    icon: <SiMysql class={ic} />,
  },
  {
    name: "MongoDB",
    category: ["Database", "NoSQL"],
    icon: <SiMongodb class={ic} />,
  },
  {
    name: "Redis",
    category: ["Database", "NoSQL"],
    icon: <SiRedis class={ic} />,
  },
  {
    name: "DynamoDB",
    category: ["Database", "NoSQL", "AWS"],
    icon: <SiAmazondynamodb class={ic} />,
  },
  {
    name: "LLM / GenAI",
    category: ["AI"],
    icon: <TbBrain class={ic} />,
  },
  {
    name: "RAG",
    category: ["AI"],
    icon: <TbVectorTriangle class={ic} />,
  },
  {
    name: "MCP",
    category: ["AI", "Architecture"],
    icon: <TbPlugConnected class={ic} />,
  },
  {
    name: "Vector Search",
    category: ["AI", "Database"],
    icon: <TbRadar2 class={ic} />,
  },
  {
    name: "On-device AI",
    category: ["AI", "Mobile"],
    icon: <TbCpu class={ic} />,
  },
  {
    name: "AI Coding Agents",
    category: ["AI", "Development"],
    icon: <TbTerminal2 class={ic} />,
  },
  {
    name: "AI Agents",
    category: ["AI"],
    icon: <TbRobot class={ic} />,
  },
  {
    name: "Prompt Engineering",
    category: ["AI"],
    icon: <TbMessageChatbot class={ic} />,
  },
  {
    name: "iOS",
    category: ["Mobile"],
    icon: <SiApple class={ic} />,
  },
  {
    name: "Android",
    category: ["Mobile"],
    icon: <SiAndroid class={ic} />,
  },
  {
    name: "Agile Development",
    category: ["Agile Development", "Team Building", "Architecture"],
    icon: <TbRotateRectangle class={ic} />,
  },
  {
    name: "Engineering Team Building",
    category: ["Agile Development", "Architecture"],
    icon: <TbArrowsMaximize class={ic} />,
  },
];

/**
 * Which of the six filter groups each raw category belongs to.
 *
 * Only categories that map cleanly are listed — an unlisted one (e.g. "AWS",
 * which sits on DynamoDB) stays non-navigable rather than sending a visitor to
 * a filter that would hide the very keyword they clicked from.
 */
const categoryToFilter: Record<string, string> = {
  "AI": "AI",
  "Identity": "Identity",
  "Security": "Identity",
  "Cloud Computing": "Cloud",
  "Network": "Cloud",
  "Infrastructure": "Cloud",
  "Programing": "Languages",
  "Web Framework": "Languages",
  "Python": "Languages",
  "TypeScript": "Languages",
  "JavaScript": "Languages",
  "TypeScript/JavaScript": "Languages",
  "Database": "Database",
  "RDB": "Database",
  "NoSQL": "Database",
  "Development": "DevOps",
  "Deployment": "DevOps",
  "Auto Testing": "DevOps",
  "Agile Development": "DevOps",
  "Architecture": "DevOps",
  "Team Building": "DevOps",
  "Mobile": "Mobile",
};

/** The filter a category chip should jump to, or null when there isn't one. */
export function filterForCategory(category: string): string | null {
  return categoryToFilter[category] ?? null;
}

export const skillCategories = [
  "All",
  "AI",
  "Identity",
  "Cloud",
  "Languages",
  "Database",
  "DevOps",
  "Mobile",
];

/** Same grouping rules as the current site. */
export function filterSkills(filter: string): Skill[] {
  if (filter === "All") return skills;
  return skills.filter((s) => {
    if (filter === "AI") return s.category.includes("AI");
    if (filter === "Identity") {
      return s.category.some((c) => c === "Identity" || c === "Security");
    }
    if (filter === "Cloud") {
      return s.category.some((c) =>
        c === "Cloud Computing" || c === "Network" || c === "Infrastructure"
      );
    }
    if (filter === "Languages") {
      return s.category.some((c) =>
        c === "Programing" || c === "Web Framework"
      );
    }
    if (filter === "Database") return s.category.includes("Database");
    if (filter === "Mobile") return s.category.includes("Mobile");
    if (filter === "DevOps") {
      return s.category.some((c) =>
        c === "Development" || c === "Deployment" ||
        c === "Agile Development" || c === "Architecture"
      );
    }
    return true;
  });
}

export const companyRows = [
  { label: "Company Name", value: "LOOSEDAYS Co.,Ltd." },
  {
    label: "Business",
    value: "IT Consulting, IT Architect, Technical Support of IT Development",
  },
  { label: "Founder & President", value: "Seiji Nakaya" },
  { label: "Established", value: "Dec, 2020" },
  { label: "Capital", value: "1 million yen" },
  { label: "Corporate Number", value: "4011301026464" },
  { label: "Location", value: "Nishi-Shinjuku, Shinjuku, Tokyo, Japan" },
  { label: "Web", value: "https://loosedays.jp/" },
];

export const contactCommand =
  'curl -H "X-REQUEST-CONTACT:1" https://loosedays.jp/';

export const social = [
  { label: "GitHub", href: "https://github.com/snakaya/" },
  { label: "X", href: "https://x.com/lsdys" },
  { label: "YouTube", href: "https://youtube.com/@loosedaysjp" },
];

export const openIdUrl = "https://openid.net/foundation/sponsoring-members/";

export const footerBlurb =
  "IT Consulting, Architecture, and Product Development based in Tokyo.";

export const copyright =
  "Copyright © 2023-2026 LOOSEDAYS Co.,Ltd. All rights reserved.";

/** Filter groups without the catch-all, in display order. */
export const skillGroups = skillCategories.filter((c) => c !== "All");

const groupMembers = new Map(
  skillGroups.map((g) => [g, new Set(filterSkills(g).map((s) => s.name))]),
);

/** The group a keyword is filed under — its first match in display order. */
export function groupOfSkill(skill: Skill): string {
  return skillGroups.find((g) => groupMembers.get(g)?.has(skill.name)) ??
    skillGroups[0];
}

/** How many categories two keywords have in common. */
export function sharedCategories(a: Skill, b: Skill): number {
  return a.category.filter((c) => b.category.includes(c)).length;
}
