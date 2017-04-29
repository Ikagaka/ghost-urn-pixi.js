import * as React from "react";
import "react-dom";
import {
    DisplayObjectContainer,
    Sprite,
} from "react-pixi";
import {HasTextureBase, HasTextureProps, HasTextureStates} from "./has_texture_base";

export class ShellSurface extends HasTextureBase<HasTextureProps, HasTextureStates> {
    render() {
        if (!this.state.texture.baseTexture.hasLoaded) return <DisplayObjectContainer />;
        return (
            <DisplayObjectContainer>
                <Sprite texture={this.state.texture}>
                    {this.props.children}
                </Sprite>
            </DisplayObjectContainer>
        );
    }
}
