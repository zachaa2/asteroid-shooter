import makeShip from "../entities/makeShip";
import k from "../kaplayCtx";

const getDirVector = () => {
    const vec = k.vec2(0, 0);
    if (k.isButtonDown("left")) vec.x -= 1;
    if (k.isButtonDown("right")) vec.x += 1;
    if (k.isButtonDown("up")) vec.y -= 1;
    if (k.isButtonDown("down")) vec.y += 1;
    return vec;
}

function clampShipToBounds(ship, velocity, k) {
    // clamp to screen bounds
    const halfW = ship.width / 2;
    const halfH = ship.height / 2;
    const minX = halfW;
    const maxX = k.width() - ship.width / 2;
    const minY = halfH;
    const maxY = k.height() - ship.height / 2;

    // clamp x pos and v_x 
    if (ship.pos.x < minX) {
        ship.pos.x = minX;
        if (velocity.x < 0) velocity.x = 0;
    } else if (ship.pos.x > maxX) {
        ship.pos.x = maxX;
        if (velocity.x > 0) velocity.x = 0;
    }

    // clamp y pos and v_y
    if (ship.pos.y < minY) {
        ship.pos.y = minY;
        if (velocity.y < 0) velocity.y = 0;
    } else if (ship.pos.y > maxY) {
        ship.pos.y = maxY;
        if (velocity.y > 0) velocity.y = 0;
    }
}

export default function game(menuSfx, shipYPos){
    menuSfx.paused = true;
    k.add([k.sprite("space-bg"), k.pos(0, 0), k.scale(1), k.opacity(0.8)]);
    const ship = makeShip(k.vec2(k.center().x, shipYPos));

    // movement vals
    const ACCEL = 1500;
    const MAX_VEL = 600;
    const FRICTION = 800;
    let velocity = k.vec2(0, 0);

    k.onUpdate(() => {
        const dt = k.dt();
        const dir = getDirVector()

        if (dir.len() > 0){
            // accel
            dir.unit();
            velocity = velocity.add(dir.scale(ACCEL * dt));
        } else {
            // decel
            if (velocity.len() > 0){
                const frictionVec = velocity.unit().scale(FRICTION * dt);
                // prevent vector flip
                if (frictionVec.len() > velocity.len()){
                    velocity = k.vec2(0, 0);
                } else {
                    velocity = velocity.sub(frictionVec);
                }
            }
        }
        // clamp max velocity
        if (velocity.len() > MAX_VEL){
            velocity = velocity.unit().scale(MAX_VEL);
        }
        // update pos
        ship.pos = ship.pos.add(velocity.scale(dt));
        clampShipToBounds(ship, velocity, k);
    });
}