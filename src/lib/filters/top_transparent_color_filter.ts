import * as PIXI from "pixi.js";

const fragment = `
varying vec2 vTextureCoord;

uniform sampler2D texture;

void main(void) {
    vec4 transparentColor = texture2D(texture, vec2(0.0, 0.0));
    vec4 currentColor = texture2D(texture, vTextureCoord);
    float colorDistance = distance(transparentColor, currentColor);
    gl_FragColor = colorDistance < 0.00000012 ? vec4(0.0, 0.0, 0.0, 0.0) : currentColor;
}
`;

export class TopTransparentColorFilter extends PIXI.Filter {
    constructor() {
        super(undefined, fragment);
        this.padding = 0;
    }
}
