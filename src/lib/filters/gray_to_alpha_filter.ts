import * as PIXI from "pixi.js";

const fragment = `
varying vec2 vTextureCoord;

uniform sampler2D texture;

void main(void) {
    vec4 currentColor = texture2D(texture, vTextureCoord);
    gl_FragColor = vec4(0.0, 0.0, 0.0, currentColor.r);
}
`;

export class GrayToAlphaFilter extends PIXI.Filter {
    constructor() {
        super(undefined, fragment);
        this.padding = 0;
    }
}
