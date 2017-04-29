import * as React from "react";
import {DisplayObjectContainer} from "react-pixi";
import {HasPositionProps} from "./renderer_base";

/**
 * シェル描画の起点
 *
 * 子要素は<Named>です。
 */
export const NamedManager = (props: HasPositionProps) =>
    <DisplayObjectContainer x={props.x} y={props.y}>{props.children}</DisplayObjectContainer>;
