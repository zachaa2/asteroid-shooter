import k from "../kaplayCtx";
import { makePolygonHitbox } from "../utils/makeHitbox";

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
        k.move(k.UP, 1000),
        k.lifespan(1.5),
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
        asteroid.play("explosion");
        k.wait(8 / 30, () => { // NOTE: (8 frame animation / speed of animation)
            k.destroy(asteroid);
        });
    });
    return bullet;
}