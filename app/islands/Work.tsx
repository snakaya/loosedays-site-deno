import { useState } from 'preact/hooks';
import { SkillCard, Skills } from "../components/SkillCard.tsx";
import {
    SiOpenid,
    SiWebauthn,
    SiKubernetes,
    SiAmazonaws,
    SiMicrosoftazure,
    SiContainerd,
    SiPython,
    SiDjango,
    SiFlask,
    SiTypescript,
    SiJavascript,
    SiDeno,
    SiNodedotjs,
    SiCsharp,
    SiOracle,
    SiMysql,
    SiMongodb,
    SiApachecassandra,
    SiRedis,
    SiAmazondynamodb,
} from 'react-icons/si';
import {
    TbLetterA,
    TbUserCheck,
    TbCertificate,
    TbNetwork,
    TbInfinity,
    Tb3DCubeSphere,
    TbFileCode,
    TbBoxModel2,
    TbRotateRectangle,
    TbHeartHandshake,
    TbArrowsMaximize,
    TbBulb,
    TbCode,
    TbTopologyComplex,
    TbFlask,
    TbRobot,
    TbBrain,
    TbMessageChatbot,
    TbVectorTriangle,
} from 'react-icons/tb';

const skills: Skills[] = [
    {name: "OpenID Connect", category: ["Identity", "Security"], icon_data: <SiOpenid class="inline-block align-middle mx-1" />},
    {name: "OAuth2", category: ["Identity", "Security"], icon_data: <TbLetterA class="inline-block align-middle mx-1" />},
    {name: "FIDO", category: ["Identity", "Security"], icon_data: <SiWebauthn class="inline-block align-middle mx-1" />},
    {name: "SSI", category: ["Identity", "Security"], icon_data: <TbUserCheck class="inline-block align-middle mx-1" />},
    {name: "DID/VC", category: ["Identity", "Security"], icon_data: <TbCertificate class="inline-block align-middle mx-1" />},
    {name: "Kubernetes", category: ["Cloud Computing", "Network", "Infrastructure"], icon_data: <SiKubernetes class="inline-block align-middle mx-1" />},
    {name: "AWS", category: ["Cloud Computing", "Network", "Infrastructure"], icon_data: <SiAmazonaws class="inline-block align-middle mx-1" />},
    {name: "Azure", category: ["Cloud Computing", "Network", "Infrastructure"], icon_data: <SiMicrosoftazure class="inline-block align-middle mx-1" />},
    {name: "Networking", category: ["Network", "Infrastructure"], icon_data: <TbNetwork class="inline-block align-middle mx-1" />},
    {name: "Containerd", category: ["Cloud Computing", "Network", "Infrastructure"], icon_data: <SiContainerd class="inline-block align-middle mx-1" />},
    {name: "DevOps", category: ["Development", "Deployment", "Auto Testing"], icon_data: <TbInfinity class="inline-block align-middle mx-1" />},
    {name: "CI/CD", category: ["Development", "Deployment", "Auto Testing"], icon_data: <Tb3DCubeSphere class="inline-block align-middle mx-1" />},
    {name: "IaC", category: ["Cloud Computing", "Network", "Deployment", "Auto Testing"], icon_data: <TbFileCode class="inline-block align-middle mx-1" />},
    {name: "Python", category: ["Programing", "Python"], icon_data: <SiPython class="inline-block align-middle mx-1" />},
    {name: "Django", category: ["Programing", "Web Framework", "Python"], icon_data: <SiDjango class="inline-block align-middle mx-1" />},
    {name: "Flask", category: ["Programing", "Web Framework", "Python"], icon_data: <SiFlask class="inline-block align-middle mx-1" />},
    {name: "TypeScript", category: ["Programing", "TypeScript", "JavaScript"], icon_data: <SiTypescript class="inline-block align-middle mx-1" />},
    {name: "JavaScript", category: ["Programing", "TypeScript", "JavaScript"], icon_data: <SiJavascript class="inline-block align-middle mx-1" />},
    {name: "Deno", category: ["Programing", "Web Framework", "TypeScript", "JavaScript"], icon_data: <SiDeno class="inline-block align-middle mx-1" />},
    {name: "NodeJS", category: ["Programing", "Web Framework", "TypeScript/JavaScript"], icon_data: <SiNodedotjs class="inline-block align-middle mx-1" />},
    {name: "C#", category: ["Programing"], icon_data: <SiCsharp class="inline-block align-middle mx-1" />},
    {name: "Clean Architecture", category: ["Architecture", "Programing"], icon_data: <TbBoxModel2 class="inline-block align-middle mx-1" />},
    {name: "Oracle", category: ["Database", "RDB"], icon_data: <SiOracle class="inline-block align-middle mx-1" />},
    {name: "MySQL", category: ["Database", "RDB"], icon_data: <SiMysql class="inline-block align-middle mx-1" />},
    {name: "MongoDB", category: ["Database", "NoSQL"], icon_data: <SiMongodb class="inline-block align-middle mx-1" />},
    {name: "Redis", category: ["Database", "NoSQL"], icon_data: <SiRedis class="inline-block align-middle mx-1" />},
    {name: "Apache Cassandra", category: ["Database", "NoSQL"], icon_data: <SiApachecassandra class="inline-block align-middle mx-1" />},
    {name: "DynamoDB", category: ["Database", "NoSQL", "AWS"], icon_data: <SiAmazondynamodb class="inline-block align-middle mx-1" />},
    {name: "LLM / GenAI", category: ["AI"], icon_data: <TbBrain class="inline-block align-middle mx-1" />},
    {name: "RAG", category: ["AI"], icon_data: <TbVectorTriangle class="inline-block align-middle mx-1" />},
    {name: "AI Agents", category: ["AI"], icon_data: <TbRobot class="inline-block align-middle mx-1" />},
    {name: "Prompt Engineering", category: ["AI"], icon_data: <TbMessageChatbot class="inline-block align-middle mx-1" />},
    {name: "Agile Development", category: ["Agile Development", "Team Building", "Architecture"], icon_data: <TbRotateRectangle class="inline-block align-middle mx-1" />},
    {name: "Team Building", category: ["Agile Development", "Architecture"], icon_data: <TbArrowsMaximize class="inline-block align-middle mx-1" />},
];

const services = [
    { title: "Technical Consulting", desc: "We complement your project by providing our technical skills.", icon: <TbBulb class="w-10 h-10 text-blue-500" /> },
    { title: "Product Development", desc: "We deliver solutions to our customers through the development of our original products.", icon: <TbCode class="w-10 h-10 text-blue-500" /> },
    { title: "Architect", desc: "All-in-one architect, front-end to back-end, network configuration to business specifications.", icon: <TbTopologyComplex class="w-10 h-10 text-blue-500" /> },
    { title: "Technical Research", desc: "Take advantage of our extensive experience!", icon: <TbFlask class="w-10 h-10 text-blue-500" /> },
];

export default function Work() {
    const [selectedCard, setSelectedCard] = useState("");
    const [selectedCardState, setSelectedCardState] = useState(false);
    const [clickedTime, setClickedTime] = useState(0);
    const [filter, setFilter] = useState("All");

    const categories = ["All", "AI", "Identity", "Cloud", "Languages", "Database", "DevOps"];

    const filteredSkills = filter === "All" ? skills : skills.filter(s => {
        if (filter === "AI") return s.category.some(c => c === "AI");
        if (filter === "Identity") return s.category.some(c => c === "Identity" || c === "Security");
        if (filter === "Cloud") return s.category.some(c => c === "Cloud Computing" || c === "Network" || c === "Infrastructure");
        if (filter === "Languages") return s.category.some(c => c === "Programing" || c === "Web Framework");
        if (filter === "Database") return s.category.some(c => c === "Database");
        if (filter === "DevOps") return s.category.some(c => c === "Development" || c === "Deployment" || c === "Agile Development" || c === "Architecture");
        return true;
    });

    return (
        <div id="sec_work" class="pt-16 pb-16 mx-auto container px-4">
            <h2 class="text-3xl text-center font-bold mb-2">Work</h2>
            <p class="text-center text-gray-500 dark:text-gray-400 mb-10">We and you can work together with...</p>

            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {services.map(s => (
                    <div class="flex flex-col items-center text-center rounded-xl border border-gray-200 dark:border-gray-600 p-6 transition duration-200 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-500">
                        <div class="mb-4">{s.icon}</div>
                        <h3 class="text-xl font-bold mb-2">{s.title}</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400">{s.desc}</p>
                    </div>
                ))}
            </div>

            <p class="mt-12 mb-4 text-2xl text-center font-medium">Keywords</p>

            {/* Category filter */}
            <div class="flex flex-wrap justify-center gap-2 mb-6">
                {categories.map(cat => (
                    <button
                        class={`px-4 py-1.5 rounded-full text-sm font-medium transition duration-200 ${
                            filter === cat
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-600 dark:bg-gray-500 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-400"
                        }`}
                        onClick={() => setFilter(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div
                id="skillCards" class="grid gap-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedCardState(false);
                    setClickedTime(Date.now());
                }}
            >
                {filteredSkills.map((s) => (
                    <SkillCard
                        skill={s}
                        selectedCard={selectedCard}
                        setSelectedCard={setSelectedCard}
                        selectedCardState={selectedCardState}
                        setSelectedCardState={setSelectedCardState}
                        clickedTime={clickedTime}
                        setClickedTime={setClickedTime}
                    />
                ))}
            </div>
        </div>
    );
}
