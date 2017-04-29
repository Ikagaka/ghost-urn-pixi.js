import * as PIXI from "pixi.js";
import * as React from "react";
import {
    CustomPIXIComponent,
    CustomPixiComponentClassFactory,
    DisplayObjectContainer,
} from "react-pixi";
import {Props} from "./renderer_base";
import {SakuraScriptContent, SakuraScriptContentProps} from "./sakura_script_content";

export interface BalloonContentProps extends Props {
    offsetLeft?: number;
    offsetTop?: number;
    offsetRight?: number;
    offsetBottom?: number;
    scrollOffset?: number;
    parentWidth?: number;
    parentHeight?: number;
}

function makeMask(offsetLeft: number, offsetTop: number, width: number, height: number) {
    const mask = new PIXI.Graphics();
    mask.beginFill(0x000000, 0);
    mask.drawRect(offsetLeft, offsetTop, width, height);
    mask.endFill();
    return mask;
}

export function BalloonContent(props: BalloonContentProps) {
    const parentWidth = props.parentWidth;
    const parentHeight = props.parentHeight;
    if (!parentWidth || !parentHeight) return <DisplayObjectContainer />;

    const contentWidth = props.parentWidth ?
            props.parentWidth - (props.offsetLeft || 0) - (props.offsetRight || 0) :
            0;
    const contentHeight = props.parentHeight ?
            props.parentHeight - (props.offsetTop || 0) - (props.offsetBottom || 0) :
            0;
    const mask = makeMask(props.offsetLeft || 0, props.offsetTop || 0, contentWidth, contentHeight);
    const maskComponent = <CustomGraphics {...{graphics: mask}} />;
    const children = React.Children.map(props.children, (child) => {
        if ((child as any).type === SakuraScriptContent) {
            return React.cloneElement(child as React.DOMElement<SakuraScriptContentProps, Element>, {
                width: contentWidth,
                height: contentHeight,
            });
        } else {
            return child;
        }
    });

    return (
        <DisplayObjectContainer>
            <DisplayObjectContainer
                x={props.offsetLeft} y={props.offsetTop} width={contentWidth} height={contentHeight} mask={mask}
            >
                <DisplayObjectContainer y={-(props.scrollOffset || 0)}>{children}</DisplayObjectContainer>
            </DisplayObjectContainer>
            {maskComponent}
        </DisplayObjectContainer>
    );
}

export const CustomGraphics: CustomPixiComponentClassFactory<{graphics: PIXI.Graphics}, PIXI.Graphics> =
    CustomPIXIComponent<{graphics: PIXI.Graphics}, PIXI.Graphics>({
    customDisplayObject(props) { return props.graphics; },
    customApplyProps() { return; },
});
