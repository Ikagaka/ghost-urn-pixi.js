import * as React from "react";
import {DisplayObjectContainer} from "react-pixi";
import {Props} from "./renderer_base";

export const ScopeShell = (props: Props) =>
    <DisplayObjectContainer>{props.children}</DisplayObjectContainer>;
