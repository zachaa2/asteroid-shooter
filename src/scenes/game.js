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

export default function game(menuSfx, shipYPos){
    menuSfx.paused = true;
    k.add([k.sprite("space-bg"), k.pos(0, 0), k.scale(1), k.opacity(0.8)]);

    const ship = makeShip(k.vec2(k.center().x, shipYPos));
    const SPEED = 500;

    k.onUpdate(() => {
        // get direction vector and move ship
        const dir = getDirVector();
        if (dir.len() > 0) {
            dir.unit();
            ship.move(dir.scale(SPEED));
        }
        // clamp pos to screen bounds
        ship.pos.x = k.clamp(ship.pos.x, 0 + ship.width / 2, k.width() - ship.width / 2);
        ship.pos.y = k.clamp(ship.pos.y, 0 + ship.height / 2, k.height() - ship.height / 2);

    });
}