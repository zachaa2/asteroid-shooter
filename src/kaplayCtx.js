import kaplay from "kaplay";
const isDev = import.meta.env.MODE === "development";

const k = kaplay({
    width: 1920, 
    height: 1080, 
    letterbox: true, 
    background: [0, 0, 0],
    global: false,
    buttons: {
        up: {
            keyboard: ["w", "up"]
        },
        down: {
            keyboard: ["s", "down"]
        },
        left: {
            keyboard: ["a", "left"]
        },
        right: {
            keyboard: ["d", "right"]
        },
        restart: {
            keyboard: ["space", "enter"]
        },
    },
    touchToMouse: true,
    debugKey: 'd',
    debug: isDev,
});

export default k;