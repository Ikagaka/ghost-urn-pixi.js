import * as React from "react";
import {DisplayObjectContainer} from "react-pixi";
import {Props} from "./renderer_base";

/**
 * シェル
 *
 * 子要素は<ShellSurface>です。
 */
export const ScopeShell = (props: Props) =>
    <DisplayObjectContainer>{props.children}</DisplayObjectContainer>;
