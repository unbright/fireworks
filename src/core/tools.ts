export function randomHsla() {
    const hue = Math.random() * 360;
    const hueVariance = 30;
    const hues = Math.floor(Math.random() * ((hue + hueVariance) - (hue - hueVariance))) + (hue - hueVariance);
    const brightness = Math.floor(Math.random() * 21) + 50;
    const alpha = (Math.floor(Math.random() * 61) + 40) / 100;
    return { hues, brightness, alpha }
}

export function randomNum(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function setRafInterval(callback: () => void, delay: number = 0): { id: number | NodeJS.Timer } {
    if (typeof requestAnimationFrame === typeof undefined) {
        return {
            id: setInterval(callback, delay),
        };
    }
    let start = new Date().getTime();
    const handle = {
        id: 0,
    };
    const loop = () => {
        const current = new Date().getTime();
        if (current - start >= delay) {
            callback();
            start = new Date().getTime();
        }
        handle.id = requestAnimationFrame(loop);
    };
    handle.id = requestAnimationFrame(loop);
    return handle;
}

function cancelAnimationFrameIsNotDefined(t: any): t is NodeJS.Timer {
    return typeof cancelAnimationFrame === typeof undefined;
}

export function clearRafInterval(handle: { id: number | NodeJS.Timer }) {
    if (cancelAnimationFrameIsNotDefined(handle.id)) {
        return clearInterval(handle.id);
    }
    cancelAnimationFrame(handle.id);
}

export function getUrlParam(key: string): string {
    const url = new URL(document.URL)
    return url.searchParams.get(key)
}