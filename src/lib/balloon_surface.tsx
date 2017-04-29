import * as React from "react";
import "react-dom";
import {
    DisplayObjectContainer,
    Sprite,
} from "react-pixi";
import {BalloonContent, BalloonContentProps} from "./balloon_content";
import {HasTextureBase, HasTextureProps, HasTextureStates} from "./has_texture_base";

/**
 * バルーンのsurface
 *
 * 子要素は<BalloonContent>などです。
 */
export class BalloonSurface extends HasTextureBase<HasTextureProps, HasTextureStates> {
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
