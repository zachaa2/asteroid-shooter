import k from "./kaplayCtx";
import mainMenu from "./scenes/mainMenu";
import howToPlay from "./scenes/howToPlay";
import intro from "./scenes/intro";
import game from "./scenes/game";
import gameOver from "./scenes/gameOver";
import loadCooldownShader from "./shaders/cooldownShader";

// ----- LOAD GRAPHICS ----- //
loadCooldownShader();
k.loadSprite("space-bg", "graphics/bg_space.png");
k.loadSprite("button", "graphics/button.png");

k.loadSprite("asteroid", "graphics/asteroid_6x.png", {
    sliceX: 4,
    sliceY: 4,
    anims: {
        spin: { from: 0, to: 7, loop: true, speed: 20 },
        explosion: { from: 8, to: 15, speed: 30 },
    }
});

k.loadSprite("ship", "graphics/ship_6x.png", {
    sliceX: 4,
    sliceY: 4,
    anims: {
        idle: { from: 0, to: 15, loop: true, speed: 20 }
    }
});
k.loadSprite("ship-explosion", "graphics/explosion_6x.png", {
    sliceX: 4, 
    sliceY: 2,
    anims: {
        explode: { from: 0, to: 7, speed: 30 },
    },
});
k.loadSprite("double-booster", "graphics/double_booster.png", {
    sliceX: 4,
    sliceY: 2,
    anims: {
        idle: { from: 0, to: 7, loop: true, speed: 20 },
    },
});
k.loadSprite("triple-booster", "graphics/triple_booster.png", {
    sliceX: 4,
    sliceY: 2,
    anims: {
        idle: { from: 0, to: 7, loop: true, speed: 20 },
    },
});
k.loadSprite("mega-booster", "graphics/mega_booster.png", {
    sliceX: 4,
    sliceY: 2,
    anims: {
        idle: { from: 0, to: 7, loop: true, speed: 20 },
    },
});
k.loadSprite("bullet", "graphics/bullet.png");

// ----- LOAD FONTS ----- //
k.loadFont("mania", "fonts/mania.ttf");

// ----- LOAD AUDIO ----- //
k.loadSound("menu-music", "sounds/deep-space.mp3");
k.loadSound("game-music", "sounds/game-music.mp3");
k.loadSound("bullet-sound", "sounds/laser-zap.mp3");
k.loadSound("explosion", "sounds/explosion.mp3");
k.loadSound("game-over", "sounds/game_over.mp3");
k.loadSound("outro", "sounds/outro.mp3");

// ----- LOAD SCENES ----- //
k.scene("intro", intro);
k.scene("main-menu", mainMenu);
k.scene("game", game);
k.scene("game-over", gameOver);
k.scene("how-to-play", howToPlay);

// ----- INIT GAME ----- //
k.go("intro");