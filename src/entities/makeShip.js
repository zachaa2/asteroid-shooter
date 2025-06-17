import k from "../kaplayCtx";

export default function makeShip(pos){
    const ship = k.add([
        k.sprite("ship", {anim: "idle"}),
        k.scale(1), 
        k.area(), 
        k.anchor("center"), 
        k.pos(pos),
        k.body(),
    ]);
    
    return ship;
}