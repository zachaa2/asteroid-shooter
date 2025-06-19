import k from "../kaplayCtx";
import makeShip from "../entities/makeShip";
import makeAsteroid from "../entities/makeAsteroid";
import { fadeAudioIn, fadeAudioOut } from "../utils/audioFade";
import makeBullet from "../entities/makeBullet";

// movement vals
const ACCEL = 1500;
const MAX_VEL = 600;
const FRICTION = 800;

// asteroid spawning
const SPAWN_INTERVAL = 1.0; // sec
const ASTEROID_SPEED = 250;

const getDirVector = () => {
    /**
     * Function to get the unnormalized direction vector of the ship, based on the movement key presses.
     * @return {vec2} direction vector
     */
    const vec = k.vec2(0, 0);
    if (k.isButtonDown("left")) vec.x -= 1;
    if (k.isButtonDown("right")) vec.x += 1;
    if (k.isButtonDown("up")) vec.y -= 1;
    if (k.isButtonDown("down")) vec.y += 1;
    return vec;
}

function getVelocityVector(dir, dt, velocity){
    /**
     * Function to return the new velocity vector for the current frame based on the
     * direction vector, previous velocity, and delta_t from last frame.
     * @param  {vec2}   dir         direction vector
     * @param  {number} dt          Delta time from previous frame
     * @param  {vec2}   velocity    previous velocity
     * @return {vec2}   Velocity vector for the current frame.
    */
    let new_Velocity = k.vec2(0, 0);
    if (dir.len() > 0){
        // accel
        dir.unit();
        new_Velocity = velocity.add(dir.scale(ACCEL * dt));
    } else {
        // decel
        if (velocity.len() > 0){
            const frictionVec = velocity.unit().scale(FRICTION * dt);
            // prevent vector flip
            if (frictionVec.len() > velocity.len()){
                new_Velocity = k.vec2(0, 0);
            } else {
                new_Velocity = velocity.sub(frictionVec);
            }
        }
    }
    // clamp max velocity
    if (new_Velocity.len() > MAX_VEL){
        new_Velocity = new_Velocity.unit().scale(MAX_VEL);
    }
    return new_Velocity;
}

function clampShipToBounds(ship, velocity, k) {
    /**
     * Function to handle position and velocity clipping at the borders of the screen. The x and y values of the 
     * velocity vector need to be zero'd out at the horizontal or vertical borders resectively. Prevents the borders from feeling "sticky".
     * @param {GameObj}     ship        ship game object
     * @param {vec2}        velocity    speed vector
     * @param {KAPLAYCtx}   k           Kaplay Context
     */
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

function spawnAsteroid() {
    /**
     * Asteroid Spawner Routine.
     */
    const spawnX = k.rand(50, k.width() - 50);
    const spawnY = k.rand(50);
    const asteroid = makeAsteroid(k.vec2(spawnX, spawnY));
    asteroid.onUpdate(() => {
        asteroid.move(0, ASTEROID_SPEED);
    });
    asteroid.onExitScreen(() => {
        if (asteroid.pos.y > k.height()){
            k.destroy(asteroid);
        }
    });
    k.wait(SPAWN_INTERVAL, spawnAsteroid);
}

export default function game(menuSfx, shipYPos){
    fadeAudioOut(menuSfx, 1.0);
    const gameMusicSfx = k.play("game-music", {
        volume: 0.0,
        loop: true,
    });
    fadeAudioIn(gameMusicSfx, 0.65, 0.5);

    // add game objs to scene
    k.add([k.sprite("space-bg"), k.pos(0, 0), k.scale(1), k.opacity(0.8)]);
    const ship = makeShip(k.vec2(k.center().x, shipYPos));
    spawnAsteroid(); // asteroid spawner routine

    k.onMousePress("left", () => {
        const bulletLeft = makeBullet(k.vec2(ship.pos.x - 72, ship.pos.y - 40));
        const bulletRight = makeBullet(k.vec2(ship.pos.x + 72, ship.pos.y - 40));
    });

    let velocity = k.vec2(0, 0); // init vel
    // game update loop
    k.onUpdate(() => {
        const dt = k.dt();

        const dir = getDirVector()
        velocity = getVelocityVector(dir, dt, velocity);
        // update pos
        ship.pos = ship.pos.add(velocity.scale(dt));
        clampShipToBounds(ship, velocity, k);
    });
}