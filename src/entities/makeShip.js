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
    ]);
    
    return ship;
}