import * as React from "react";
import * as ReactDOM from "react-dom";
import {Stage} from "react-pixi";
import {
    BalloonContent,
    BalloonSurface,
    Named,
    NamedManager,
    SakuraScriptContent,
    Scope,
    ScopeBalloon,
    ScopeShell,
    ShellSurface,
} from "../lib";

ReactDOM.render(
    (
        <Stage width={500} height={500} transparent={true} backgroundColor={0x000000}>
            <NamedManager>
                <Named>
                    <Scope>
                        <ScopeShell>
                            <ShellSurface image="foo.png" />
                        </ScopeShell>
                        <ScopeBalloon x={100} y={50}>
                            <BalloonSurface image="foo.png">
                                <BalloonContent
                                    offsetLeft={10} offsetTop={10} offsetRight={10} offsetBottom={10} scrollOffset={7}
                                >
                                    <SakuraScriptContent>
                                        \f[height,12pt]a\f[height,8pt]a\f[height,2em]a\f[color,0,0,128]aa\\d\n
                                        q\f[name,Meiryo]aji\f[bold,1]sjan
                                        \_l[@2em,45]あいうえお\f[default]あいうえおあいうえおあいうえおあいうえお
                                    </SakuraScriptContent>
                                </BalloonContent>
                            </BalloonSurface>
                        </ScopeBalloon>
                    </Scope>
                </Named>
            </NamedManager>
        </Stage>
    ),
    document.getElementById("container"),
);
