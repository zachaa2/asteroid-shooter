import k from "../kaplayCtx";

export default function makeButton(pos, onClick) {
    const button = k.add([
        k.sprite("button"),
        k.scale(1),
        k.anchor("center"),
        k.area(),
        k.pos(pos),
    ]);
    button.onClick(() => {
        if (typeof onClick === "function"){
            onClick();
        }
    });
    return button;
}