import * as PIXI from "pixi.js";
import * as React from "react";
import {Props} from "./renderer_base";

/** 画像を使うプロパティ */
export interface HasTextureProps extends Props {
    /** 画像 */
    image?: string;
    /** テクスチャ */
    texture?: PIXI.Texture;
}

/** 画像を使う状態 */
export interface HasTextureStates {
    /** テクスチャ */
    texture: PIXI.Texture;
}

/** 画像を使うコンポーネント */
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
