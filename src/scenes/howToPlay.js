import k from "../kaplayCtx";
import makeButton from "../entities/makeButton";

export default function howToPlay(sfx) {
    // score booster sprites
    k.add([
        k.sprite("double-booster"),
        k.scale(0.65),
        k.anchor("center"),
        k.pos(k.center().x - 300, k.center().y - 100),
    ]);
    k.add([
        k.sprite("triple-booster"),
        k.scale(0.65),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y - 100),
    ]);
    k.add([
        k.sprite("mega-booster"),
        k.scale(0.65),
        k.anchor("center"),
        k.pos(k.center().x + 300, k.center().y - 100),
    ]);
    // text 
    k.add([
        k.text("SCORE BOOSTERS", { font: "mania", size: 48 }),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y - 200),
    ]);
    k.add([
        k.text("2x", { font: "mania", size: 32 }),
        k.anchor("center"),
        k.pos(k.center().x - 225, k.center().y - 100),
    ]);
    k.add([
        k.text("3x", { font: "mania", size: 32 }),
        k.anchor("center"),
        k.pos(k.center().x + 75, k.center().y - 100),
    ]);
    k.add([
        k.text("5x", { font: "mania", size: 32 }),
        k.anchor("center"),
        k.pos(k.center().x + 375, k.center().y - 100),
    ]);

    k.add([
        k.text("HOW TO PLAY", { size: 64, font: "mania" }),
        k.pos(k.center().x, 80),
        k.anchor("center"),
    ]);

    const instructions = `Move: Arrow Keys / W A S D\n
Shoot: Left Click\n
Collect Score Boosters to multiply your score for every asteroid hit\n
Note: Only the Highest Booster Applies!\n
Collecting boosters also increases your score even if it doesn't apply`;
    k.add([
        k.text(instructions, { size: 36 , font: "mania", width: 1440, lineSpacing: 2 }),
        k.pos(k.center().x, k.center().y + 175),
        k.anchor("center"),
    ]);

    const buttonPos = k.vec2(150, k.height() - 100);
    const button = makeButton(buttonPos, () => {
        k.go("main-menu", sfx);
    });
    k.add([
        k.text("Back", { size: 32, font: "mania" }), 
        k.anchor("center"), 
        k.pos(buttonPos),
    ])
    
}