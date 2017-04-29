import * as PIXI from "pixi.js";
import * as React from "react";
import "react-dom";
import {
    DisplayObjectContainer,
    Sprite,
} from "react-pixi";
import {BalloonContent, BalloonContentProps} from "./balloon_content";
import {Props} from "./renderer_base";

export interface BalloonSurfaceProps extends Props {
    image?: string;
    texture?: PIXI.Texture;
}

export interface BalloonSurfaceStates {
    texture: PIXI.Texture;
}

export class BalloonSurface extends React.Component<BalloonSurfaceProps, BalloonSurfaceStates> {
    constructor(props: BalloonSurfaceProps) {
        super(props);
        const texture = this.props.image ? PIXI.Texture.from(this.props.image) : this.props.texture as PIXI.Texture;
        texture.baseTexture.on("loaded", () =>
            this.setState({texture}),
        );
        this.state = {texture};
    }

    render() {
        if (!this.state.texture.baseTexture.hasLoaded) return <DisplayObjectContainer />;
        const children = React.Children.map(this.props.children, (child) => {
            if (child instanceof Object && (child as any).type === BalloonContent) {
                return React.cloneElement(child as React.DOMElement<BalloonContentProps, Element>, {
                    parentWidth: this.state.texture.width, parentHeight: this.state.texture.height,
                });
            } else {
                return child;
            }
        });
        return (
            <DisplayObjectContainer>
                <Sprite texture={this.state.texture}>
                    {children}
                </Sprite>
            </DisplayObjectContainer>
        );
    }
}
