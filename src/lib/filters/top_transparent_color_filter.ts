import * as PIXI from "pixi.js";

const fragment = `
varying vec2 vTextureCoord;

uniform sampler2D texture;
uniform vec2 uResolution;
uniform float width;
uniform float height;

void main(void) {
    vec4 transparentColor = texture2D(texture, vec2(3.5 / width, 3.5 / height));
    vec4 currentColor = texture2D(texture, vTextureCoord);
    float colorDistance = distance(transparentColor, currentColor);
    gl_FragColor = colorDistance < 0.00000012 ? vec4(0.0, 0.0, 0.0, 0.0) : currentColor;
}
`;

export class TopTransparentColorFilter extends PIXI.Filter {
    constructor(width: number, height: number) {
        super(undefined, fragment);
        this.uniforms.width = width;
        this.uniforms.height = height;
    }
}
