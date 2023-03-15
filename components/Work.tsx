interface Skills {
    name: string;
    category: string[];
}

export function Work() {
    const skills: Skills[] = [
        {name: "OpenID Connect", category: ["Identity", "Security"]},
        {name: "OAuth2", category: ["Identity", "Security"]},
        {name: "WebAuthn/FIDO", category: ["Identity", "Security"]},
        {name: "SSI/DID/VC", category: ["Identity", "Security"]},
        {name: "Kubernetes", category: ["Cloud Computing", "Network", "Infrastructure"]},
        {name: "AWS", category: ["Cloud Computing", "Network", "Infrastructure"]},
        {name: "Azure", category: ["Cloud Computing", "Network", "Infrastructure"]},
        {name: "Networking", category: ["Network", "Infrastructure"]},
        {name: "Containerd", category: ["Cloud Computing", "Network", "Infrastructure"]},
        {name: "DevOps", category: ["Development", "Deployment", "Auto Testing"]},
        {name: "CI/CD", category: ["Development", "Deployment", "Auto Testing"]},
        {name: "IaC", category: ["Cloud Computing", "Network", "Deployment", "Auto Testing"]},
        {name: "Python", category: ["Programing", "Python"]},
        {name: "Django/Flask", category: ["Programing", "Web Framework", "Python"]},
        {name: "TypeScript/JavaScript", category: ["Programing", "TypeScript/JavaScript"]},
        {name: "Deno", category: ["Programing", "Web Framework", "TypeScript/JavaScript"]},
        {name: "NodeJS", category: ["Programing", "Web Framework", "TypeScript/JavaScript"]},
        {name: "C#", category: ["Programing"]},
        {name: "DDD/Clean Architecture", category: ["Architecture", "Programing"]},
        {name: "Oracle", category: ["Database", "RDB"]},
        {name: "MySQL", category: ["Database", "RDB"]},
        {name: "MongoDB", category: ["Database", "NoSQL"]},
        {name: "Redis", category: ["Database", "NoSQL"]},
        {name: "Apache Cassandra", category: ["Database", "NoSQL"]},
        {name: "DynamoDB", category: ["Database", "NoSQL", "AWS"]},
        {name: "Agile Development", category: ["Agile Development", "Team Building", "Project Management", "Architecture"]},
        {name: "Project Management", category: ["Project Management", "Agile Development", "Development"]},
        {name: "Team Building", category: ["Project Management", "Agile Development", "Architecture"]},
    ];
    return (
        <div id="sec_work" class="pt-12 pb-12 mx-auto">
            <h2 class="p-4 text-3xl text-center font-bold">Work</h2>
            <p class="pt-2 pb-8 text-2xl text-center font-medium">We and You can work together with...</p>
            <div class="flex flex-wrap items-start justify-center p-5 py-10">
                {skills.map((s) => (
                    <a class="relative px-3 py-1 m-2 rounded-md shadow-sm sm:py-2 sm:text-base ring ring-transparent group md:px-4 hover:ring hover:ring-opacity-50 focus:ring-opacity-50 hover:ring-violet-600 text-gray-900 bg-gray-200 dark:bg-gray-400 dark:text-gray-200" href="#">
                        <span class="text-sm">{s.name}</span>
                    </a>
                ))}
            </div>
        </div>
    );
}