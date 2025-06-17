import k from "../kaplayCtx";

export default function makeShip(pos){
    const ship = k.add([
        k.sprite("ship", {anim: "idle"}),
        k.scale(1), 
        k.area({
            shape: new k.Rect(k.vec2(0, -16), 168, 128),
        }), 
        k.anchor("center"), 
        k.pos(pos),
        k.body(),
        "ship",
    ]);
    
    return ship;
}