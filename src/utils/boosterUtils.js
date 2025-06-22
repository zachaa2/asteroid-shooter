import k from "../kaplayCtx";
import makeScoreBooster from "../entities/makeScoreBooster";
import { BOOSTER_LIFESPAN } from "./constants";

export function destroyBoosterUI(boost) {
    /**
     * Util for cleaning up the boost UI comp when not needed
     * @param {Object} boost    boost UI game objects/update handle in an object
     */
    k.destroy(boost.text);
    k.destroy(boost.bar);
    k.destroy(boost.bar_bg);
    boost.handle.cancel();
}

export function spawnBooster(activeBoosters, multiplier) {
    /**
     * Attempts to spawn a score booster entity onto the game scene, and scedules it for destruction after a certain time. 
     * If there is already an active booster of that type, then does nothing.
     * @param {Object} activteBoosters      object holding the active booster objects for each booster type
     * @param {number} multiplier           multiplier of the booster to spawn in
     */
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