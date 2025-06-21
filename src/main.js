import k from "./kaplayCtx";
import mainMenu from "./scenes/mainMenu";
import intro from "./scenes/intro";
import game from "./scenes/game";
import gameOver from "./scenes/gameOver";

// ----- LOAD GRAPHICS ----- //
k.loadSprite("space-bg", "graphics/bg_space.png");

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

// ----- INIT GAME ----- //
k.go("intro");