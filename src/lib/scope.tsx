import * as React from "react";
import {DisplayObjectContainer} from "react-pixi";
import {HasPositionProps} from "./renderer_base";

/**
 * キャラクター1体分のシェル
 *
 * 子要素は<ScopeShell>と<ScopeBalloon>がそれぞれ1つずつです。
 */
export const Scope = (props: HasPositionProps) =>
    <DisplayObjectContainer x={props.x} y={props.y}>{props.children}</DisplayObjectContainer>;
