import * as PIXI from "pixi.js";
import * as React from "react";
import {
    CustomPIXIComponent,
    CustomPixiComponentClassFactory,
    DisplayObjectContainer,
    Sprite,
} from "react-pixi";
import {GrayToAlphaFilter} from "./filters/gray_to_alpha_filter";
import {TopTransparentColorFilter} from "./filters/top_transparent_color_filter";
import {Props} from "./renderer_base";

/** 画像を使うプロパティ */
export interface HasTextureProps extends Props {
    /** 画像 */
    image?: string;
    /** テクスチャ */
    texture?: PIXI.Texture;
    /** 透明度定義画像 */
    alphaImage?: string;
    /** 透明度定義テクスチャ */
    alphaTexture?: PIXI.Texture;
}

/** 画像を使う状態 */
export interface HasTextureStates {
    /** テクスチャ */
    texture: PIXI.Texture;
    /** 透明度定義テクスチャ */
    alphaTexture?: PIXI.Texture;
}

/** 画像を使うコンポーネント */
export class HasTextureBase<P extends HasTextureProps, T extends HasTextureStates> extends React.Component<P, T> {
    constructor(props: P) {
        super(props);
        const texture =
            props.image ? PIXI.Texture.from(props.image) : props.texture as PIXI.Texture;
        const alphaTexture =
            props.alphaImage ? PIXI.Texture.from(props.alphaImage) : props.alphaTexture;
        let loadCount = alphaTexture ? 2 : 1;
        const onLoaded = () => {
            loadCount--;
            if (!loadCount) this.setState({texture, alphaTexture});
        };
        texture.baseTexture.on("loaded", onLoaded);
        if (alphaTexture) alphaTexture.baseTexture.on("loaded", onLoaded);
        this.state = {texture, alphaTexture} as T;
    }

    render() {
        if (!this.state.texture.baseTexture.hasLoaded) return <DisplayObjectContainer />;
        let mask;
        let maskComponent;
        if (this.state.alphaTexture) {
            mask = new PIXI.Sprite(this.state.alphaTexture);
            mask.filters = [new GrayToAlphaFilter()];
            maskComponent = <CustomSprite {...{sprite: mask}} />;
        }
        return (
            <DisplayObjectContainer>
                <Sprite texture={this.state.texture} filters={[new TopTransparentColorFilter()]} mask={mask}>
                    {this.renderChildren()}
                </Sprite>
                {maskComponent}
            </DisplayObjectContainer>
        );
    }

    renderChildren() {
        return this.props.children;
    }
}

export const CustomSprite: CustomPixiComponentClassFactory<{sprite: PIXI.Sprite}, PIXI.Sprite> =
    CustomPIXIComponent<{sprite: PIXI.Sprite}, PIXI.Sprite>({
    customDisplayObject(props) { return props.sprite; },
    customApplyProps() { return; },
});
