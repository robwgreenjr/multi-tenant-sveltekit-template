import type {ActionReturn} from "svelte/action";

export function clickOutside(node: HTMLElement, parameters?: string[]): ActionReturn<void> {
    const handleClick = (event: Event) => {
        const target = (event.target as HTMLElement);

        if (parameters) {
            for (const param of parameters) {
                if (
                    target.parentElement?.parentElement?.dataset.ignore === param ||
                    target.parentElement?.dataset.ignore === param ||
                    target.dataset.ignore === param
                ) {
                    return;
                }
            }
        }

        if (node && !node.contains(target) && !event.defaultPrevented) {
            node.dispatchEvent(new CustomEvent("click_outside"));
        }
    };

    document.addEventListener("mousedown", handleClick, true);

    return {
        destroy() {
            document.removeEventListener("mousedown", handleClick, true);
        },
    };
}