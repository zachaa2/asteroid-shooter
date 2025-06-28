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
    const totalTime = BOOSTER_LIFESPAN[multiplier];
    let timeLeft = totalTime;

    const booster = k.add([
        k.sprite(spriteName, { anim: "idle"}),
        k.scale(0.65),
        k.opacity(0.8),
        k.area({
            shape: new k.Rect(k.vec2(0, -10), 120, 140),
        }),
        k.anchor("center"),
        k.pos(pos),
        k.shader("cooldown-shader", () => ({
            u_time_left: timeLeft,
            u_total_time: totalTime,
            u_time: k.time(),
            u_flash_threshold: 0.10, 
            u_flash_freq: 5.0,
        })),
        "booster",
        {
            value: multiplier,
        },
    ]);
    // collision handler
    booster.shipCollisionHandler = booster.onCollide("ship", () => {
        k.play("power-up", { volume: 0.70 });
        k.trigger("booster-collected", "score-text", booster.value);
        k.destroy(booster);
    });
    // update time left
    booster.onUpdate(() => {
        timeLeft = Math.max(timeLeft - k.dt(), 0);
    });

    return booster;
}