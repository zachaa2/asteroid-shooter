import k from "../kaplayCtx";
import { makePolygonHitbox }from "../utils/makeHitbox.js"

export default function makeAsteroid(pos) {
    const asteroid = k.add([
        k.sprite("asteroid", {anim: "spin"}),
        k.scale(k.rand(0.8, 1.5)),
        k.opacity(1.0),
        k.area({ 
            shape: makePolygonHitbox(8, 64),
        }),
        k.anchor("center"),
        k.pos(pos),
        k.body(),
        k.offscreen(),
        "asteroid",
    ]);
    return asteroid;
}