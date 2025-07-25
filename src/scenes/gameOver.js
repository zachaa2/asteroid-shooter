import k from "../kaplayCtx";
import { fadeAudioIn, fadeAudioOut } from "../utils/audioFade";

export default function gameOver(){
    const highScore = k.getData("high-score");
    const currScore = k.getData("current-score");
    const gameOverSfx = k.play("outro", { 
        volume: 0.0, 
        loop: true 
    });
    fadeAudioIn(gameOverSfx, 0.5, 1.5);

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

    k.add([
        k.text("Press ENTER or SPACE to restart", { size: 64, font: "mania" }),
        k.anchor("center"),
        k.pos(k.center().x, k.height() - 100),
    ]);

    k.onButtonPress("restart", () => {
        k.go("game", gameOverSfx, k.center().y, 0, -k.height());
    });

}