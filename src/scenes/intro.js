import k from "../kaplayCtx";

export default function intro(){
    k.add([
    k.text(
      `
        This is a free game make using assets from 
        Freesound, OpenGameArt and Sonic Mania. 
        Sonic is owned by SEGA.
      `,
      { font: "mania", size: 38 }
    ),
  ]);

  k.add([
    k.text("Press Space/Click/Touch to Start The Game", {
      font: "mania",
      size: 64,
    }),
    k.anchor("center"),
    k.pos(k.center()),
  ]);

  k.onMousePress("left", () => k.go("main-menu"));
}