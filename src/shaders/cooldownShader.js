import k from "../kaplayCtx";

export default function loadCooldownShader() {
    k.loadShader(
      "cooldown-shader",
      null,
        `uniform float u_progress;
        vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
          vec4 base = def_frag();
          // if we're below that normalized line, darken:
          if (uv.y < u_progress) {
            base.rgb *= 0.2;
          }
          return base;
        }`
    );
  }
