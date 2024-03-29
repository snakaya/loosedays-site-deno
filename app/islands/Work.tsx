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
    {name: "Agile Development", category: ["Agile Development", "Team Building", "Architecture"], icon_data: <TbRotateRectangle class="inline-block align-middle mx-1" />},
    {name: "Team Building", category: ["Agile Development", "Architecture"], icon_data: <TbArrowsMaximize class="inline-block align-middle mx-1" />},
];

export default function Work() {
    const [selectedCard, setSelectedCard] = useState("");
    const [selectedCardState, setSelectedCardState] = useState(false);
    const [clickedTime, setClickedTime] = useState(0);
    
    return (
        <div id="sec_work" class="pt-12 pb-12 mx-auto">
            <h2 class="p-4 text-3xl text-center font-bold">Work</h2>
            <p class="pt-2 pb-8 text-2xl text-center font-medium">We and You can work together with...</p>
            <div class="mx-4 grid gap-4 sm:grid-cols-2 md:gap-8 xl:grid-cols-2">
                <button class="flex flex-col text-center rounded-lg border p-4 md:p-6">
                    <h3 class="line-block mx-auto my-2 text-center text-3xl font-semibold md:text-5xl">Technical Consulting</h3>
                    <p class="mb-4 text-gray-500">We complement your project by providing our technical skills.</p>
                </button>
                <button class="flex flex-col text-center rounded-lg border p-4 md:p-6">
                    <h3 class="line-block mx-auto my-2 text-center text-3xl font-semibold md:text-5xl">Product Development</h3>
                    <p class="mb-4 text-gray-500">We deliver solutions to our customers through the development of our original products.</p>
                </button>
                <button class="flex flex-col text-center rounded-lg border p-4 md:p-6">
                    <h3 class="line-block mx-auto my-2 text-center text-3xl font-semibold md:text-5xl">Architect</h3>
                    <p class="mb-4 text-gray-500">All-in-one architect, front-end to back-end, network configuration to business specifications.</p>
                </button>
                <button class="flex flex-col text-center rounded-lg border p-4 md:p-6">
                    <h3 class="line-block mx-auto my-2 text-center text-3xl font-semibold md:text-5xl">Technical Research</h3>
                    <p class="mb-4 text-gray-500">Take advantage of our extensive experience!</p>
                </button>
            </div>
            <p class="m-4 text-2xl text-center font-medium">Keywords:</p>
            <div
                // id="skillCards" class="flex flex-wrap items-start justify-center mx-1 py-1"
                id="skillCards" class="grid gap-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedCardState(false);
                    setClickedTime(Date.now());
                }}
            >
                {skills.map((s, idx) => (
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