import * as React from "react";
import * as ReactDOM from "react-dom";
import {Stage} from "react-pixi";
import {
    BalloonSurface,
    Named,
    NamedManager,
    Scope,
    ScopeBalloon,
} from "../lib";

ReactDOM.render(
    (
        <Stage width={500} height={500} {...{transparent: true, backgroundColor: 0x000000} as any}>
            <NamedManager>
                <Named>
                    <Scope>
                        <ScopeBalloon x={100} y={50}>
                            <BalloonSurface image="foo.png" offsetLeft={10} offsetTop={10} scrollOffset={0}>
                                \f[height,12pt]a\f[height,8pt]a\f[height,2em]a\f[color,0,0,128]aa\\d\n
                                q\f[name,Meiryo]aji\f[bold,1]sjan
                                \_l[@2em,45]あいうえお\f[default]あいうえおあいうえおあいうえおあいうえお
                            </BalloonSurface>
                        </ScopeBalloon>
                    </Scope>
                </Named>
            </NamedManager>
        </Stage>
    ),
    document.getElementById("container"),
);
