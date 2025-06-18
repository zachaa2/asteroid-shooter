import k from "../kaplayCtx";

function makeShipHitbox(offset = k.vec2(0, 25)) {
    const widthBottom = 150;
    const widthTop = 60;
    const height = 100;
    const sideHeight = 55;
    const halfBot = widthBottom / 2;
    const halfTop = widthTop / 2;
  
    const points = [
      // Bottom-left
      k.vec2(-halfBot, 0),
      // Left vertical side
      k.vec2(-halfBot, -sideHeight),
      // Left slanted up to top
      k.vec2(-halfTop, -height),
      // Right slanted from top
      k.vec2(halfTop, -height),
      // Right vertical side
      k.vec2(halfBot, -sideHeight),
      // Bottom-right
      k.vec2(halfBot, 0),
    ];
    return new k.Polygon(points.map(p => p.add(offset)));
  }

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
    ]);
    
    return ship;
}