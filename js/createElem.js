export function elem(a, b, c, d, e, f, z) {
    let element = document.createElement(a);
    if (b) {
        element.className = b;
    }
    if (c) {
        element.textContent = c;
    }
    if (d) {
        element.width = d;
    }
    if (e) {
        element.height = e;
    }
    if (f) {
        element.src = f;
    }
    if (z) {
        element.id = z;
    }

    return element;
}