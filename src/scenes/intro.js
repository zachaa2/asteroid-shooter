import k from "../kaplayCtx";

export default function intro(){
    k.add([
    k.text(
      `
        This is a free game made using assets from 
        ZapSplat, Freesound, OpenGameArt and Sonic Mania. 
        Sonic is owned by SEGA.
      `,
      { font: "mania", size: 38 }
    ),
  ]);

  k.add([
    k.text("Click Any Key to Proceed", {
      font: "mania",
      size: 64,
    }),
    k.anchor("center"),
    k.pos(k.center()),
  ]);

    k.onKeyPress(() => k.go("main-menu"));
    k.onMousePress(() => k.go("main-menu"));
}