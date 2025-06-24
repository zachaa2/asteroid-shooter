import k from "../kaplayCtx";
import makeButton from "../entities/makeButton";

export default function howToPlay() {
    k.add([
        k.text("HOW TO PLAY", { size: 64, font: "mania" }),
        k.pos(k.center().x, 80),
        k.anchor("center"),
    ]);

    const instructions = "Move: Arrow Keys / W A S D\nShoot: Left Click";

    k.add([
        k.text(instructions, { size: 28, font: "mania", width: 800, lineSpacing: 12 }),
        k.pos(k.center().x, k.center().y),
        k.anchor("center"),
    ]);
    const buttonPos = k.vec2(150, k.height() - 100);
    const button = makeButton(buttonPos, () => {
        k.go("main-menu");
    });
    k.add([
        k.text("Back", { size: 32, font: "mania" }), 
        k.anchor("center"), 
        k.pos(buttonPos),
    ])
    
}