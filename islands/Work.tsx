import { JSX } from "preact";
import { useState, useEffect } from 'preact/hooks';
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

interface Skills {
    name: string;
    category: string[];
    icon_data: JSX.Element;
}

export default function Work() {
    const skills: Skills[] = [
        {name: "OpenID Connect", category: ["Identity", "Security"], icon_data: <SiOpenid class="inline-block align-middle mx-1" />},
        {name: "OAuth2", category: ["Identity", "Security"], icon_data: <TbLetterA class="inline-block align-middle mx-1" />},
        {name: "WebAuthn/FIDO", category: ["Identity", "Security"], icon_data: <SiWebauthn class="inline-block align-middle mx-1" />},
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
        {name: "DDD/Clean Architecture", category: ["Architecture", "Programing"], icon_data: <TbBoxModel2 class="inline-block align-middle mx-1" />},
        {name: "Oracle", category: ["Database", "RDB"], icon_data: <SiOracle class="inline-block align-middle mx-1" />},
        {name: "MySQL", category: ["Database", "RDB"], icon_data: <SiMysql class="inline-block align-middle mx-1" />},
        {name: "MongoDB", category: ["Database", "NoSQL"], icon_data: <SiMongodb class="inline-block align-middle mx-1" />},
        {name: "Redis", category: ["Database", "NoSQL"], icon_data: <SiRedis class="inline-block align-middle mx-1" />},
        {name: "Apache Cassandra", category: ["Database", "NoSQL"], icon_data: <SiApachecassandra class="inline-block align-middle mx-1" />},
        {name: "DynamoDB", category: ["Database", "NoSQL", "AWS"], icon_data: <SiAmazondynamodb class="inline-block align-middle mx-1" />},
        {name: "Agile Development", category: ["Agile Development", "Team Building", "Project Management", "Architecture"], icon_data: <TbRotateRectangle class="inline-block align-middle mx-1" />},
        {name: "Project Management", category: ["Project Management", "Agile Development", "Development"], icon_data: <TbHeartHandshake class="inline-block align-middle mx-1" />},
        {name: "Team Building", category: ["Project Management", "Agile Development", "Architecture"], icon_data: <TbArrowsMaximize class="inline-block align-middle mx-1" />},
    ];
    const [selectedCard, setSelectedCard] = useState("");
    const [clickedTime, setClickedTime] = useState(0);
    /*
    const doToggle = (target: HTMLAnchorElement) => {
        const elms = target.parentElement?.children;
        target.children[1].className = target.children[1].className == "hidden" ? "" : "hidden";
        Array.from(elms).forEach((c, idx) => {
            if(target.children[0].textContent != c.children[0].textContent) {
                c.children[1].className = "hidden";
            }
        });
    };
    */
    const doToggle = () => {
        console.log(selectedCard);
        const elms: HTMLCollection = document.getElementById("skillCards")?.children;
        Array.from(elms).forEach((c, idx) => {
            if(c.children[0].textContent == selectedCard) {
                c.children[1].className = c.children[1].className == "hidden" ? "" : "hidden";
            } else {
                c.children[1].className = "hidden";
            }
        });
    };
    useEffect(() => {
        doToggle();
    },[selectedCard, clickedTime]);
    return (
        <div id="sec_work" class="pt-12 pb-12 mx-auto">
            <h2 class="p-4 text-3xl text-center font-bold">Work</h2>
            <p class="pt-2 pb-8 text-2xl text-center font-medium">We and You can work together with...</p>
            <div
                id="skillCards" class="flex flex-wrap items-start justify-center p-5 py-10"
                onClick={(e) => {
                    setClickedTime(Date.now());
                    e.preventDefault();
                }}
            >
                {skills.map((s, idx) => (
                    <a
                        class="relative px-3 py-1 m-2 rounded-md shadow-sm sm:py-2 sm:text-base ring ring-transparent group md:px-4 hover:rounded-lg hover:ring hover:ring-opacity-50 focus:ring-opacity-50 hover:ring-pink-600 focus:ring-pink-600 focus:bg-pink-200 hover:bg-pink-200 text-gray-900 bg-gray-200 dark:bg-gray-400 dark:text-gray-200 transition duration-150 ease-in-out"
                        href={"#skill_" + s.name.toLowerCase().replace('/','_').replace(' ','_')}
                        data-te-collapse-init
                        data-te-collapse-collapsed
                        data-te-target={"#skill_" + s.name.toLowerCase().replace('/','_').replace(' ','_')}
                        aria-expanded="false"
                        aria-controls={"skill_" + s.name.toLowerCase().replace('/','_').replace(' ','_')}
                        onClick={(e) => {
                            setSelectedCard(s.name);
                            setClickedTime(Date.now());
                            e.preventDefault();
                        }}
                    >
                        <span class="text-base align-middle hover:text-pink-600 focus:text-pink-600 dark:text-gray-700">{s.icon_data}{s.name}</span> 
                        <div id={"skill_" + s.name.toLowerCase().replace('/','_').replace(' ','_')}
                            class="!visible hidden"
                            data-te-collapse-item
                            data-te-collapse-show
                        >
                            <div class="flex flex-col">
                                {s.category.map((c) => (
                                <div class="m-1 text-xs inline-flex items-center font-bold px-3 py-1 rounded-full bg-white text-gray-700 border">
                                    {c}
                                </div>
                                ))}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}