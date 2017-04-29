import * as PIXI from "pixi.js";
import * as React from "react";
import {Props} from "./renderer_base";

export interface HasTextureProps extends Props {
    image?: string;
    texture?: PIXI.Texture;
}

export interface HasTextureStates {
    texture: PIXI.Texture;
}

export class HasTextureBase<P extends HasTextureProps, T extends HasTextureStates> extends React.Component<P, T> {
    constructor(props: P) {
        super(props);
        const texture = props.image ? PIXI.Texture.from(props.image) : props.texture as PIXI.Texture;
        texture.baseTexture.on("loaded", () =>
            this.setState({texture}),
        );
        this.state = {texture} as T;
    }
}
