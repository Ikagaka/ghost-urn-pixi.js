import {NamedManager} from "ghost-urn";
import * as React from "react";
import {DisplayObjectContainer} from "react-pixi";
import {NamedRenderer} from "./named_renderer";
import {RendererBase, RendererProps, RendererState} from "./renderer_base";

export class NamedManagerRenderer extends RendererBase<RendererProps<NamedManager>, RendererState, NamedManager> {
    render() {
        return (
            <DisplayObjectContainer x={0} y={0}>
                {this.model.nameds.map((named) => <NamedRenderer key={named.id} model={named} />)}
            </DisplayObjectContainer>
        );
    }
}
