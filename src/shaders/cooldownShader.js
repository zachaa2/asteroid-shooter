import k from "../kaplayCtx";

export default function loadCooldownShader() {
  /**
   * Fragment shader for the score booster sprite. 
   * Used as an indicator to the player about the booster's remaining lifespan. 
   * See below for shader uniforms.
   */
  k.loadShader(
    "cooldown-shader",
    null,
    `uniform float u_time_left;       // time left for booster (sec)
     uniform float u_total_time;      // total lifespan (sec)
     uniform float u_time;            // real time (sec)
     uniform float u_flash_threshold; // %time left to start flashing the sprite
     uniform float u_flash_freq;      // flash rate in Hz

     vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
       vec4 base = def_frag();

       // normalized remaining life
       float lifeNorm = clamp(u_time_left / u_total_time, 0.0, 1.0);

       // darken linearly from full brightness -> minBright
       float minBright = 0.25;
       float brightness = mix(minBright, 1.0, lifeNorm);

       // once we hit the threshold for life remaining, use a sine wave
       if (lifeNorm < u_flash_threshold) {
         float phase = u_time * u_flash_freq * 6.2831853; // freq -> radians/sec
         // remap sine vals from [-1, 1] -> [0, 1]
         float pulse = 0.5 + 0.5 * sin(phase);
         // interpolate based on pulse
         brightness = mix(minBright, 1.0, pulse);
       }

       base.rgb *= brightness;
       return base;
     }`
  );
}
