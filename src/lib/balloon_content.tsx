import * as PIXI from "pixi.js";
import * as React from "react";
import {DisplayObjectContainer, Text} from "react-pixi";
import {SakuraScript, SakuraScriptToken} from "sakurascript";
import {Props} from "./renderer_base";

interface TextMetrics {
    text: string;
    style: PIXI.TextStyle;
    width: number;
    height: number;
    lines: string[];
    lineWidths: number[];
    lineHeight: number;
    maxLineWidth: number;
    fontProperties: object;
}

class TextBound {
    readonly width: number;
    readonly height: number;
    x: number;
    y: number;
    textStyleOptions: PIXI.TextStyleOptions;
    textStyle: PIXI.TextStyle;

    constructor(width: number, height: number, x = 0, y= 0) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.resetTextStyle();
    }

    getCharStart(char: string) {
        const {width, height} = this.getTextMetrics(char);
        if (this.x + width > this.width) {
            this.x = width;
            this.y += height;
            return {x: 0, y: this.y};
        } else {
            const start = {x: this.x, y: this.y};
            this.x += width;
            return start;
        }
    }

    getTextMetrics(char: string): TextMetrics {
        return (PIXI as any).TextMetrics.measureText(char, this.textStyle);
    }

    lineBreak(rate = 1) {
        const {height} = this.getTextMetrics(".");
        this.x = 0;
        this.y += height * rate;
    }

    updateTextStyle(textStyleOptions: PIXI.TextStyleOptions) {
        for (const name of Object.keys(textStyleOptions) as Array<keyof PIXI.TextStyleOptions>) {
            this.textStyleOptions[name] = textStyleOptions[name];
        }
        this.textStyle = new PIXI.TextStyle(this.textStyleOptions);
    }

    resetTextStyle() {
        this.textStyleOptions = {};
        this.textStyle = new PIXI.TextStyle(this.textStyleOptions);
    }
}

export const BalloonContent = (props: Props & {width: number, height: number, scrollOffset?: number}) => {
    const children: Array<React.ReactElement<any>> = [];
    let tokens;
    if (typeof props.children === "string") {
        tokens = SakuraScript.parse(props.children).tokens;
    } else {
        tokens = props.children as any as SakuraScriptToken[];
    }
    const textBound = new TextBound(props.width, props.height);
    for (const token of tokens) {
        if (token instanceof SakuraScriptToken.Char) {
            const start = textBound.getCharStart(token.char);
            children.push(<Text text={token.char} x={start.x} y={start.y} style={textBound.textStyle} />);
        } else if (token instanceof SakuraScriptToken.Font.Color) {
            textBound.updateTextStyle({fill: token.colorAsCss()});
        } else if (token instanceof SakuraScriptToken.Font.Name) {
            textBound.updateTextStyle({fontFamily: token.names});
        } else if (token instanceof SakuraScriptToken.Font.Height) {
            textBound.updateTextStyle({fontSize: token.height});
        } else if (token instanceof SakuraScriptToken.Font.Bold) {
            textBound.updateTextStyle({fontWeight: token.effective ? "bold" : undefined});
        } else if (token instanceof SakuraScriptToken.Font.Italic) {
            textBound.updateTextStyle({fontStyle: token.effective ? "italic" : undefined});
        } else if (token instanceof SakuraScriptToken.Font.Outline) {
        } else if (token instanceof SakuraScriptToken.Font.Strike) {
        } else if (token instanceof SakuraScriptToken.Font.ShadowColor) {
        } else if (token instanceof SakuraScriptToken.Font.Underline) {
        } else if (token instanceof SakuraScriptToken.Font.Sub) {
        } else if (token instanceof SakuraScriptToken.Font.Sup) {
        } else if (token instanceof SakuraScriptToken.Font.Default) {
            textBound.resetTextStyle();
        } else if (token instanceof SakuraScriptToken.LineBreak) {
            textBound.lineBreak();
        } else if (token instanceof SakuraScriptToken.HalfLineBreak) {
            textBound.lineBreak(0.5);
        } else if (token instanceof SakuraScriptToken.PercentLineBreak) {
            textBound.lineBreak(token.percent / 100);
        } else if (token instanceof SakuraScriptToken.Location) {
        } else if (token instanceof SakuraScriptToken.Image) {
        } else if (token instanceof SakuraScriptToken.InlineImage) {
        }
    }
    return <DisplayObjectContainer y={-(props.scrollOffset || 0)}>{children}</DisplayObjectContainer>;
};
