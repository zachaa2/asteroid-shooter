import k from "../kaplayCtx";
import { makePolygonHitbox } from "../utils/makeHitbox";
import { BULLET_LIFESPAN, BULLET_SPEED } from "../utils/constants";

export default function makeBullet(pos) {
    const bullet = k.add([
        k.sprite("bullet"),
        k.scale(0.2),
        k.area({
            shape: makePolygonHitbox(8, 50),
        }),
        k.anchor("center"),
        k.pos(pos),
        k.opacity(0.9),
        k.move(k.UP, BULLET_SPEED),
        k.lifespan(BULLET_LIFESPAN),
        k.offscreen({destroy: true}),
        "bullet",
    ]);

    bullet.collisionHandler = bullet.onCollide("asteroid", (asteroid) => {
        k.destroy(bullet);
        if (asteroid.moveHandler){
            asteroid.moveHandler.cancel();
        };
        asteroid.use(k.area({
            shape: new k.Polygon([k.vec2(0, 0), k.vec2(0, 1), k.vec2(1, 0)]), // dummy hitbox
        }));
        k.shake(4 * asteroid.scaleSize * 6);
        k.play("explosion", { volume: 0.6 });
        asteroid.play("explosion");
        k.trigger("asteroid-destroyed", "score-text");
        k.wait(8 / 30, () => { // NOTE: (8 frame animation / speed of animation)
            k.destroy(asteroid);
        });
    });
    return bullet;
}