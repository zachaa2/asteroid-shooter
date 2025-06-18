import k from "../kaplayCtx";

export function fadeAudioIn(audio, targetVol = 0.8, duration = 1.0){
    /**
     * Function to fade in the given audio player for a certain length of time, up to a certain volume
     * @param {AudioPlay}   audio       kaplay audio object
     * @param {number}      targetVol   target valume the audio fades into 
     * @param {number}      duration    how long the fade in lasts
     */
    let time = 0
    const handle = k.onUpdate(() => {
        time += k.dt();
        const t = Math.min(1, time / duration);
        audio.volume = t * targetVol;
        if (t >= 1){
            handle.cancel();
        }
    });
}

export function fadeAudioOut(audio, duration = 1.0){
    /**
     * Function to fade out the given audio player for a certain length of time.
     * @param {AudioPlay}   audio       kaplay audio object
     * @param {number}      duration    length of fade out
     */
    let time = 0;
    const startVol = audio.volume;
    const handle = k.onUpdate(() => {
        time += k.dt();
        const t = Math.min(1, time / duration);
        audio.volume = startVol * (1 - t);
        if (t >= 1){
            audio.paused = true;
            handle.cancel();
        }
    });
}