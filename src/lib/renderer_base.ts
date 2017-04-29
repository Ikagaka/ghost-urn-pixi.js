import * as React from "react";

/**
 * デフォルトのプロパティ
 */
export interface Props extends React.Props<{}> {}

/**
 * 位置情報を持つプロパティ
 */
export interface HasPositionProps extends Props {
    /** x */
    x?: number;
    /** y */
    y?: number;
}

/**
 * 大きさを持つプロパティ
 */
export interface HasSizeProps extends Props {
    /** 幅 */
    width?: number;
    /** 高さ */
    height?: number;
}
