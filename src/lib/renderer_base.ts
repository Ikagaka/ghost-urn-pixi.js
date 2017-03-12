import {Model} from "ghost-urn";
import * as React from "react";

export interface RendererProps<M extends Model> {
    model: M;
}

export interface RendererState {

}

export class RendererBase<P extends RendererProps<M>, S extends RendererState, M extends Model>
    extends React.Component<P, S> {
    get id() { return this.model.id; }
    get model() { return this.props.model; }
}