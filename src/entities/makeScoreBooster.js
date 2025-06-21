import k from "../kaplayCtx";
import { BOOSTER_LIFESPAN } from "../utils/constants";

export default function makeScoreBooster(pos, multiplier){
    let spriteName = "";

    switch (multiplier) {
        case 2:
            spriteName = "double-booster";
            break;
        case 3:
            spriteName = "triple-booster";
            break;
        case 5:
            spriteName = "mega-booster";
            break;
        default:
            return;
    }

    const booster = k.add([
        k.sprite(spriteName, { anim: "idle"}),
        k.scale(0.65),
        k.opacity(0.8),
        k.area({
            shape: new k.Rect(k.vec2(0, -10), 120, 140),
        }),
        k.anchor("center"),
        k.pos(pos),
        "booster",
        {
            value: multiplier
        },
    ]);
    return booster;
}