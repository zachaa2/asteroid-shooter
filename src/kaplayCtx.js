import kaplay from "kaplay";

const k = kaplay({
    width: 1920, 
    height: 1080, 
    letterbox: true, 
    background: [0, 0, 0],
    global: false,
    touchToMouse: true,
    debugKey: 'd',
    debug: true, // TODO: change to false in prod

});

export default k;