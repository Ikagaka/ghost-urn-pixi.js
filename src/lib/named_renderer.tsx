import {Named} from "ghost-urn";
import * as React from "react";
import {DisplayObjectContainer} from "react-pixi";
import {RendererBase, RendererProps, RendererState} from "./renderer_base";
import {ScopeRenderer} from "./scope_renderer";

export class NamedRenderer extends RendererBase<RendererProps<Named>, RendererState, Named> {
    render() {
        return (
            <DisplayObjectContainer x={0} y={0}>
                {this.model.scopes.map((scope) => <ScopeRenderer key={scope.id} model={scope} />)}
            </DisplayObjectContainer>
        );
    }
}
