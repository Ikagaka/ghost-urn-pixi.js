import * as React from "react";

export interface Props extends React.Props<{}> {}

export interface HasPositionProps extends Props {
    x?: number;
    y?: number;
}
