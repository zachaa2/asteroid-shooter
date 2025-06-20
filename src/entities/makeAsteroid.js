import k from "../kaplayCtx";
import { makePolygonHitbox }from "../utils/makeHitbox.js"
import { ASTEROID_SPEED } from "../utils/constants.js";

export default function makeAsteroid(pos) {
    const asteroid = k.add([
        k.sprite("asteroid", {anim: "spin"}),
        k.scale(k.rand(0.8 / 6, 1.5 / 6)),
        k.opacity(1.0),
        k.area({ 
            shape: makePolygonHitbox(8, 360),
        }),
        k.anchor("center"),
        k.pos(pos),
        k.body(),
        k.offscreen(),
        "asteroid",
    ]);
    // asteroid object handlers
    asteroid.moveHandler = asteroid.onUpdate(() => {
      asteroid.move(0, ASTEROID_SPEED);
    });
    asteroid.screenHandler = asteroid.onExitScreen(() => {
      if (asteroid.pos.y > k.height()){
          k.destroy(asteroid);
      }
    });

    return asteroid;
}