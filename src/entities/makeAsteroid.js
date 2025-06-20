import k from "../kaplayCtx";
import { makePolygonHitbox }from "../utils/makeHitbox.js"
import { ASTEROID_SPEED } from "../utils/constants.js";

export default function makeAsteroid(pos, scale) {
    const asteroid = k.add([
        k.sprite("asteroid", {anim: "spin"}),
        k.scale(scale),
        k.opacity(1.0),
        k.area({ 
            shape: makePolygonHitbox(8, 360),
        }),
        k.anchor("center"),
        k.pos(pos),
        k.body(),
        k.offscreen(),
        "asteroid",
        {
          scaleSize: scale,
        }
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