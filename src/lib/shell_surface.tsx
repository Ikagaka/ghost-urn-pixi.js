import * as React from "react";
import "react-dom";
import {
    DisplayObjectContainer,
    Sprite,
} from "react-pixi";
import {TopTransparentColorFilter} from "./filters/top_transparent_color_filter";
import {HasTextureBase, HasTextureProps, HasTextureStates} from "./has_texture_base";

export class ShellSurface extends HasTextureBase<HasTextureProps, HasTextureStates> {
    render() {
        if (!this.state.texture.baseTexture.hasLoaded) return <DisplayObjectContainer />;
        const filters = [new TopTransparentColorFilter(this.state.texture.width, this.state.texture.height)];
        return (
            <DisplayObjectContainer>
                <Sprite texture={this.state.texture} filters={filters}>
                    {this.props.children}
                </Sprite>
            </DisplayObjectContainer>
        );
    }
}
