import React, { useEffect } from "react";
import { Terminal as XTerminal } from "xterm";
import "xterm/css/xterm.css";
import styles from "../../css/pythonEditor.css";

function Terminal({ output }) {
    useEffect(() => {
        const terminal = new XTerminal();
        terminal.open(document.getElementById("terminal"));
        terminal.write(output);
        return () => {
            terminal.dispose();
        };
    }, [output]);

    return <div id="terminal" className={styles.pythonOutput} />;
}

export default Terminal;
