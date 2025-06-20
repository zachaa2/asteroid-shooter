import k from "../kaplayCtx";
import { SCROLL_SPEED } from "./constants";

export default function scrollBackground(bg1, bg2, dt) {
    /**
     * handle infinite background scrolling in the main menu and game scenes. 
     * @param {GameObj} bg1     first background sprite
     * @param {GameObj} bg2     second background sprite
     * @param {number}  dt      delta time between frames (from update loop)
     */
    bg1.move(0, SCROLL_SPEED * dt);
    bg2.move(0, SCROLL_SPEED * dt);
    if (bg1.pos.y >= k.height()) bg1.pos.y -= 2 * k.height();
    if (bg2.pos.y >= k.height()) bg2.pos.y -= 2 * k.height();
}