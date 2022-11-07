

export function clearDiv(a) {
    let arrNode = Array.from(a);
    for (const el of arrNode) {
        el.remove();
    }
}