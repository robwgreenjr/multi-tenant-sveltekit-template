import type {ActionReturn} from "svelte/action";

export function clickOutside(node: HTMLElement): ActionReturn<void> {
    const handleClick = (event: Event) => {
        const target = (event.target as HTMLElement);
        if (node.dataset.ignore) {
            if (
                target.parentElement?.dataset.ignore === node.dataset.ignore ||
                target.dataset.ignore === node.dataset.ignore
            ) {
                return;
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