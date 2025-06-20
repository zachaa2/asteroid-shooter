import k from "../kaplayCtx";

export function makePolygonHitbox(n = 8, radius = 16) {
    /**
     * Makes an equilateral polygon for "circle" hitboxes. The more sides, the more circular the 
     * polygon is.
     * @param {number} n        number of sides in the polygon
     * @param {number} radius   radius of each point to the center of the polygon
     */
    const points = [];
    const step = (2 * Math.PI) / n;
    for (let i = 0; i < n; i++) {
      const angle = i * step;
      points.push(k.vec2(Math.cos(angle) * radius, Math.sin(angle) * radius));
    }
    return new k.Polygon(points);
}

export function makeShipHitbox(offset = k.vec2(0, 25)) {
    const widthBottom = 150;
    const widthTop = 60;
    const height = 100;
    const sideHeight = 55;
    const halfBot = widthBottom / 2;
    const halfTop = widthTop / 2;
  
    const points = [
        // Bottom-left
        k.vec2(-halfBot, 0),
        // Left vertical side
        k.vec2(-halfBot, -sideHeight),
        // Left slanted up to top
        k.vec2(-halfTop, -height),
        // Right slanted from top
        k.vec2(halfTop, -height),
        // Right vertical side
        k.vec2(halfBot, -sideHeight),
        // Bottom-right
        k.vec2(halfBot, 0),
    ];
    return new k.Polygon(points.map(p => p.add(offset)));
}