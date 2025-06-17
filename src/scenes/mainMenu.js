import k from "../kaplayCtx";
import makeShip from "../entities/makeShip";

export default function mainMenu() {
    if (!k.getData("high-score")) k.setData("high-score", 0);
    const menuSfx = k.play("menu-music", {
        volume: 0.8,
        loop: true,
    });
    
    k.onMousePress("left", () => {
        k.go("game", menuSfx);
    });

    k.add([k.sprite("space-bg"), k.pos(0, 0), k.scale(1), k.opacity(0.8)]);

    k.add([
        k.text("ASTEROID SHOOTER", { font: "mania", size: 96}),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y - 300),
    ]);
    k.add([
        k.text("Press Mouse1 to start", {font: "mania", size: 64}),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y - 200),
    ]);

    const ship = makeShip(k.vec2(k.center().x, k.center().y + 100));
    ship.floatOriginY = ship.pos.y;
    ship.floatTime = 0;

    k.onUpdate(() => {
        ship.floatTime += k.dt();
        ship.pos.y = ship.floatOriginY + Math.sin(ship.floatTime * 1.75) * 20;
    });
}