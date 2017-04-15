import * as PIXI from "pixi.js";
import * as React from "react";
import {DisplayObjectContainer, Text} from "react-pixi";
import {SakuraScript, SakuraScriptToken} from "sakurascript";
import {Props} from "./renderer_base";

export const BalloonContent = (props: Props & {width: number, height: number, scrollOffset?: number}) => {
    const children: Array<React.ReactElement<any>> = [];
    let tokens;
    if (typeof props.children === "string") {
        tokens = SakuraScript.parse(props.children).tokens;
    } else {
        tokens = props.children as any as SakuraScriptToken[];
    }
    const textPosition = {x: 0, y: 0};
    const textStyleOptions: PIXI.TextStyleOptions = {};
    let textStyle = new PIXI.TextStyle(textStyleOptions);
    for (const token of tokens) {
        if (token instanceof SakuraScriptToken.Char) {
            const textMetrics = (PIXI as any).TextMetrics.measureText(token.char, textStyle);
            children.push(<Text text={token.char} x={textPosition.x} style={textStyle} />);
            textPosition.x += textMetrics.width;
        } else if (token instanceof SakuraScriptToken.Font.Color) {
            textStyleOptions.fill = token.colorAsCss();
            textStyle = new PIXI.TextStyle(textStyleOptions);
        } else if (token instanceof SakuraScriptToken.Font.Name) {
            textStyleOptions.fontFamily = token.names;
            textStyle = new PIXI.TextStyle(textStyleOptions);
        } else if (token instanceof SakuraScriptToken.Font.Height) {
            textStyleOptions.fontSize = token.height;
            textStyle = new PIXI.TextStyle(textStyleOptions);
        } else if (token instanceof SakuraScriptToken.Font.Bold) {
            textStyleOptions.fontWeight = token.effective ? "bold" : undefined;
            textStyle = new PIXI.TextStyle(textStyleOptions);
        } else if (token instanceof SakuraScriptToken.Font.Italic) {
            textStyleOptions.fontStyle = token.effective ? "italic" : undefined;
            textStyle = new PIXI.TextStyle(textStyleOptions);
        }
    }
    return <DisplayObjectContainer y={-(props.scrollOffset || 0)}>{children}</DisplayObjectContainer>;
};
