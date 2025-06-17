import k from "./kaplayCtx";
import mainMenu from "./scenes/mainMenu";
import intro from "./scenes/intro";
import game from "./scenes/game";

// ----- LOAD GRAPHICS ----- //
k.loadSprite("space-bg", "graphics/bg_space.png");

k.loadSprite("asteroid", "graphics/asteroid_6x.png", {
    sliceX: 4,
    sliceY: 2,
    anims: {
        spin: { from: 0, to: 7, loop: true, speed: 20 } 
    }
});

k.loadSprite("ship", "graphics/ship_6x.png", {
    sliceX: 4,
    sliceY: 4,
    anims: {
        idle: { from: 0, to: 15, loop: true, speed: 20 }
    }
});

// ----- LOAD FONTS ----- //
k.loadFont("mania", "fonts/mania.ttf");

// ----- LOAD AUDIO ----- //
k.loadSound("menu-music", "sounds/deep-space.mp3");

// ----- LOAD SCENES ----- //
k.scene("intro", intro);
k.scene("main-menu", mainMenu);
k.scene("game", game);
k.scene("game-over", () => {});

// ----- INIT GAME ----- //
k.go("intro");