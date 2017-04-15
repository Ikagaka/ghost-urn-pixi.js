import * as PIXI from "pixi.js";
import * as React from "react";
import "react-dom";
import {
    CustomPIXIComponent,
    CustomPixiComponentClassFactory,
    DisplayObjectContainer,
    Sprite,
} from "react-pixi";
import {BalloonContent} from "./balloon_content";
import {Props} from "./renderer_base";

(window as any).React = React;
(window as any).PIXI = PIXI;

export interface BalloonSurfaceProps extends Props {
    image?: string;
    texture?: PIXI.Texture;
    offsetLeft?: number;
    offsetTop?: number;
    offsetRight?: number;
    offsetBottom?: number;
    scrollOffset?: number;
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
        const width = this.state.texture.width - (this.props.offsetLeft || 0) - (this.props.offsetRight || 0);
        const height = this.state.texture.width - (this.props.offsetTop || 0) - (this.props.offsetBottom || 0);
        const mask = new PIXI.Graphics();
        mask.beginFill(0x000000, 0);
        mask.drawRect(this.props.offsetLeft || 0, this.props.offsetTop || 0, width, height);
        mask.endFill();
        const maskComponent = <CustomGraphics {...{graphics: mask}} />;
        return (
            <DisplayObjectContainer>
                <Sprite texture={this.state.texture}>
                    <DisplayObjectContainer
                        x={this.props.offsetLeft} y={this.props.offsetTop} width={width} height={height} mask={mask}
                    >
                        <BalloonContent width={width} height={height} scrollOffset={this.props.scrollOffset}>
                            {this.props.children}
                        </BalloonContent>
                    </DisplayObjectContainer>
                </Sprite>
                {maskComponent}
            </DisplayObjectContainer>
        );
    }
};

export const CustomGraphics: CustomPixiComponentClassFactory<{graphics: PIXI.Graphics}, PIXI.Graphics> =
    CustomPIXIComponent<{graphics: PIXI.Graphics}, PIXI.Graphics>({
    customDisplayObject(props) { return props.graphics; },
    customApplyProps() { return; },
});
