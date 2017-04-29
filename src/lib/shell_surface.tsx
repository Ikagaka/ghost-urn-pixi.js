import * as PIXI from "pixi.js";
import * as React from "react";
import "react-dom";
import {
    DisplayObjectContainer,
    Sprite,
} from "react-pixi";
import {Props} from "./renderer_base";

export interface ShellSurfaceProps extends Props {
    image?: string;
    texture?: PIXI.Texture;
}

export interface ShellSurfaceStates {
    texture: PIXI.Texture;
}

export class ShellSurface extends React.Component<ShellSurfaceProps, ShellSurfaceStates> {
    constructor(props: ShellSurfaceProps) {
        super(props);
        const texture = this.props.image ? PIXI.Texture.from(this.props.image) : this.props.texture as PIXI.Texture;
        texture.baseTexture.on("loaded", () =>
            this.setState({texture}),
        );
        this.state = {texture};
    }

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
