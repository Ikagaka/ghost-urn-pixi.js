import * as React from "react";
import {DisplayObjectContainer} from "react-pixi";
import {HasPositionProps} from "./renderer_base";

export const Named = (props: HasPositionProps) =>
    <DisplayObjectContainer x={props.x} y={props.y}>{props.children}</DisplayObjectContainer>;
