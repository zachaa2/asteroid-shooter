import k from "../kaplayCtx";

export default function makeBullet(pos) {
    const bullet = k.add([
        k.sprite("bullet"),
        k.scale(0.2),
        k.area(),
        k.anchor("center"),
        k.pos(pos),
        k.opacity(0.9),
        k.move(k.UP, 1000),
        k.lifespan(1.5),
        k.offscreen({destroy: true}),
        "bullet",
    ]);
    return bullet;
}