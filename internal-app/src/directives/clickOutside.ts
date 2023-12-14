export function clickOutside(node: any) {
    const handleClick = (event: any) => {
        if (node.dataset.ignore) {
            if (
                event.target.parentElement.dataset.ignore === node.dataset.ignore ||
                event.target.dataset.ignore === node.dataset.ignore
            ) {
                return;
            }
        }

        if (node && !node.contains(event.target) && !event.defaultPrevented) {
            node.dispatchEvent(new CustomEvent("click_outside", node));
        }
    };

    document.addEventListener("mousedown", handleClick, true);

    return {
        destroy() {
            document.removeEventListener("mousedown", handleClick, true);
        },
    };
}
