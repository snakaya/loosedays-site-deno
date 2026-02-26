import { JSX } from "preact";

export interface Skills {
    name: string;
    category: string[];
    icon_data: JSX.Element;
}

interface Props {
    skill: Skills;
    selectedCard: string;
    setSelectedCard: (s: string) => void | Promise<void>;
    selectedCardState: boolean;
    setSelectedCardState: (h: boolean) => void | Promise<void>;
    clickedTime: number;
    setClickedTime: (n: number) => void | Promise<void>;
}

export function SkillCard(props: Props) {
    const isOpen = props.selectedCard === props.skill.name && props.selectedCardState;
    return (
        <a
            class={`relative px-3 py-2 m-1.5 align-middle rounded-lg shadow-sm text-sm sm:text-base ring-1 transition duration-200 ease-in-out cursor-pointer ${
                isOpen
                    ? "ring-blue-500 bg-blue-50 dark:bg-gray-500"
                    : "ring-gray-200 dark:ring-gray-500 bg-gray-100 dark:bg-gray-400 hover:ring-blue-400 hover:shadow-md"
            } text-gray-800 dark:text-gray-200`}
            href={"#skill_" + props.skill.name.toLowerCase().replace('/','_').replace(' ','_')}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                props.setSelectedCard(props.skill.name);
                props.setSelectedCardState(e.currentTarget.children[1].classList.contains("hidden"));
                props.setClickedTime(Date.now());
            }}
        >
            <span class="text-sm font-medium align-middle dark:text-gray-700">{props.skill.icon_data}{props.skill.name}</span>
            <div id={"skill_" + props.skill.name.toLowerCase().replace('/','_').replace(' ','_')}
                class={isOpen ? "mt-2" : "hidden mt-2"}
            >
                <div class="flex flex-col gap-1">
                    {props.skill.category.map((c) => (
                    <div class="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-gray-600 dark:text-gray-200 text-center">
                        {c}
                    </div>
                    ))}
                </div>
            </div>
        </a>
    );
};
