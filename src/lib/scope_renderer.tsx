import {Scope} from "ghost-urn";
import * as React from "react";
import {DisplayObjectContainer} from "react-pixi";
import {RendererBase, RendererProps, RendererState} from "./renderer_base";
import {ScopeBalloonRenderer} from "./scope_balloon_renderer";
import {ScopeShellRenderer} from "./scope_shell_renderer";

export class ScopeRenderer extends RendererBase<RendererProps<Scope>, RendererState, Scope> {
    render() {
        return (
            <DisplayObjectContainer x={this.model.position.x} y={this.model.position.y}>
                <ScopeShellRenderer key="shell" model={this.model.shell.value} />
                <ScopeBalloonRenderer key="balloon" model={this.model.balloon.value} />
            </DisplayObjectContainer>
        );
    }
}
