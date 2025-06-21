import k from "../kaplayCtx";
import makeScoreBooster from "../entities/makeScoreBooster";
import { BOOSTER_LIFESPAN } from "./constants";

export default function spawnBooster(activeBoosters, multiplier) {
    if (activeBoosters[multiplier]) return;

    // choose random spawn pos
    const x = k.rand(100, k.width() - 100);
    const y = k.rand(100, k.height() / 2 - 100);
    
    const booster = makeScoreBooster(k.vec2(x, y), multiplier);
    if (!booster) return;

    // activate booster and schedule for destruction
    activeBoosters[multiplier] = booster;
    k.wait(BOOSTER_LIFESPAN[multiplier], ()=> {
        if (booster.exists()) k.destroy(booster);
        activeBoosters[multiplier] = null;
    });
}
