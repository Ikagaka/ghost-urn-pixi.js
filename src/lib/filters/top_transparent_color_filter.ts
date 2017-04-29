import * as PIXI from "pixi.js";

const fragment = `
varying vec2 vTextureCoord;

uniform sampler2D texture;

void main(void) {
    vec4 transparentColor = texture2D(texture, vec2(0.0, 0.0));
    vec4 currentColor = texture2D(texture, vTextureCoord);
    gl_FragColor = all(equal(transparentColor, currentColor)) ? vec4(0.0, 0.0, 0.0, 0.0) : currentColor;
}
`;

export class TopTransparentColorFilter extends PIXI.Filter {
    constructor() {
        super(undefined, fragment);
        this.padding = 0;
    }
}
