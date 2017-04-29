import * as React from "react";

export interface Props extends React.Props<{}> {}

export interface HasPositionProps extends Props {
    x?: number;
    y?: number;
}

export interface HasSizeProps extends Props {
    width?: number;
    height?: number;
}
