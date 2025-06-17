import k from "../kaplayCtx";

function makePolygon(n = 8, radius = 16) {
    const points = [];
    const step = (2 * Math.PI) / n;
    for (let i = 0; i < n; i++) {
      const angle = i * step;
      points.push(k.vec2(Math.cos(angle) * radius, Math.sin(angle) * radius));
    }
    return new k.Polygon(points);
  }

export default function makeAsteroid(pos, speed = 200) {
    const asteroid = k.add([
        k.sprite("asteroid", {anim: "spin"}),
        k.scale(1),
        k.opacity(1.0),
        k.area({ 
            shape: makePolygon(8, 64),
        }),
        k.anchor("center"),
        k.pos(pos),
        k.body(),
        k.offscreen(),
        "asteroid",
    ]);
    return asteroid;
}