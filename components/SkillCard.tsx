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
    return (
        <a
            class="relative px-3 py-1 m-2 rounded-md shadow-sm sm:py-2 sm:text-base ring ring-transparent group md:px-4 hover:rounded-lg hover:ring hover:ring-opacity-50 focus:ring-opacity-50 hover:ring-pink-600 focus:ring-pink-600 focus:bg-pink-200 hover:bg-pink-200 text-gray-900 bg-gray-200 dark:bg-gray-400 dark:text-gray-200 transition duration-150 ease-in-out"
            href={"#skill_" + props.skill.name.toLowerCase().replace('/','_').replace(' ','_')}
            data-te-collapse-init
            data-te-collapse-collapsed
            data-te-target={"#skill_" + props.skill.name.toLowerCase().replace('/','_').replace(' ','_')}
            aria-expanded="false"
            aria-controls={"skill_" + props.skill.name.toLowerCase().replace('/','_').replace(' ','_')}
            onClick={(e) => {
                e.stopPropagation();
                props.setSelectedCard(props.skill.name);
                props.setSelectedCardState(e.currentTarget.children[1].classList.contains("hidden"));
                props.setClickedTime(Date.now());
            }}
        >
            <span class="text-base align-middle hover:text-pink-600 focus:text-pink-600 dark:text-gray-700">{props.skill.icon_data}{props.skill.name}</span> 
            <div id={"skill_" + props.skill.name.toLowerCase().replace('/','_').replace(' ','_')}
                class={props.selectedCard == props.skill.name && props.selectedCardState ? "!visible mt-2" : "!visible hidden mt-2"}
                data-te-collapse-item
                data-te-collapse-show
            >
                <div class="flex flex-col">
                    {props.skill.category.map((c) => (
                    <div class="m-1 text-xs inline-flex text-center font-bold px-3 py-1 rounded-full bg-gray-50 text-gray-700 border">
                        {c}
                    </div>
                    ))}
                </div>
            </div>
        </a>
    );

};