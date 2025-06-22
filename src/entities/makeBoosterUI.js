import k from "../kaplayCtx";

export default function makeBoosterUI(multiplier, duration){
    /**
     * Creates the booster UI object and returns it tot the caller (game scene)
     * @param {number} multiplier   The score multiplier (e.g., 2, 3, 5)
     * @param {number} duration     Duration in seconds the boost lasts
     * @returns {Object}            The UI elements and update handle
     */
    const label = `SCORE x${multiplier} BOOST`;
    const barWidth = 300;
    const barHeight = 20;
    const margin = 20;

    // text label
    const text = k.add([
        k.text(label, { size: 36, font: "mania" }),
        k.color(255, 255, 255),
        k.anchor("topright"),
        k.pos(k.width() - margin, margin),
        k.opacity(1),
    ]);

    // progress bar bg
    const bar_bg = k.add([
        k.rect(barWidth, barHeight),
        k.color(60, 60, 60),
        k.anchor("topright"),
        k.pos(k.width() - margin, margin + 50),
    ]);

    // progress bar
    const bar = k.add([
        k.rect(barWidth, barHeight),
        k.color(255, 200, 0),
        k.anchor("topright"),
        k.pos(k.width() - margin, margin + 50),
        {
            maxWidth: barWidth,
            timeLeft: duration,
            totTime: duration,
        },
    ]);

    // UI update loop
    const handle = k.onUpdate(() => {
        bar.timeLeft -= k.dt();
        const progress = Math.max(bar.timeLeft / bar.totTime, 0);
        bar.width = bar.maxWidth * progress;
        if (bar.timeLeft <= 0){
            k.destroy(bar_bg);
            k.destroy(bar);
            k.destroy(text);
            handle.cancel();
            k.trigger("reset-boost", "ship");
        }
    });
    return { multiplier, bar, bar_bg, text, handle };
}