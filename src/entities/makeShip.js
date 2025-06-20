import k from "../kaplayCtx";
import { makeShipHitbox } from "../utils/makeHitbox.js";

export default function makeShip(pos){
    const ship = k.add([
        k.sprite("ship", {anim: "idle"}),
        k.scale(1), 
        k.area({
            shape: makeShipHitbox(),
        }), 
        k.anchor("center"), 
        k.pos(pos),
        k.body(),
        "ship",
        {
            isDestroyed: false,
        },
    ]);

    ship.collisionHandler = ship.onCollide("asteroid", (asteroid) => {
        // handle ship
        if (ship.isDestroyed) return;
        ship.isDestroyed = true;
        ship.hidden = true;
        ship.use(k.area({ // dummy hitbox for ship (just in case, not sure if it's necessary)
            shape: new k.Polygon([
                k.vec2(ship.pos.x, ship.pos.y), 
                k.vec2(ship.pos.x, ship.pos.y + 1), 
                k.vec2(ship.pos.x - 1, ship.pos.y)
            ]), 
        }));
        // handle asteroid
        if (asteroid.moveHandler) {
            asteroid.moveHandler.cancel();
        }
        asteroid.use(k.area({
            shape: new k.Polygon([k.vec2(0, 0), k.vec2(0, 1), k.vec2(1, 0)]), // dummy hitbox
        }));
        k.play("explosion");
        asteroid.play("explosion");
        k.wait(8 / 30, () => {
            k.destroy(asteroid);
        });
        // ship explosion animation
        const explosion = k.add([
            k.sprite("ship-explosion", { anim: "explode" }),
            k.pos(ship.pos.x, ship.pos.y),
            k.anchor("center"),
        ]);
        k.wait(8 / 30, () => {
            k.destroy(explosion);
            // TODO: trigger a game over event and handle in the game scene - probably better to have scenes navigate to other scenes.
        });
    });
    
    return ship;
}