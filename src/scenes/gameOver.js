import k from "../kaplayCtx";
import { fadeAudioOut } from "../utils/audioFade";

export default function gameOver(gameMusicSfx){
    fadeAudioOut(gameMusicSfx, 0.25);
    const highScore = k.getData("high-score");
    const currScore = k.getData("current-score");
    
    // temp Background
    k.add([k.sprite("space-bg"), k.pos(0, 0), k.scale(1), k.opacity(0.8)]);

    k.add([
        k.text("GAME OVER", { size: 96, font: "mania"}),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y - 200),
    ]);

    k.add([
        k.text(`Score: ${currScore}`, { size: 64, font: "mania" }),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y - 80),
    ]);

    k.add([
        k.text(`High Score: ${highScore}`, { size: 64, font: "mania" }),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y),
    ]);
}