import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import styles from "../css/pythonEditor.css";
import CodeEditor from "../components/python-code-editor/PythonCodeEditor";
import "brace/mode/python";
import "brace/theme/monokai";

let logs = [];

console.oldLog = console.log;

console.log = function (value) {
    if (value !== "using indexedDB for stdlib modules cache") {
        console.oldLog(value);
        logs.push(`${value}`);
    }
};

const Scripts = (props) => {
    const { code } = props;
    return <script type="text/python">{code}</script>;
};

const output = (arr) => {
    let out = "";
    for (let i = 0; i < arr.length; i += 1) {
        if (i !== arr.length - 1) {
            out = out.concat(`${arr[i]}\n`);
        } else {
            out = out.concat(arr[i]);
        }
    }
    return out;
};

class PythonCodeEditor extends React.Component {
    state = {
        code: "",
        outputArr: [],
    };

    run() {
        try {
            window.brython([1]);
        } catch (error) {
            console.oldLog(error);
        }

        setTimeout(() => {
            this.setState({
                outputArr: logs,
            });
            console.oldLog("logsgasga", logs);
        }, 100);
    }

    clearLogs() {
        logs = [];
        this.setState({
            outputArr: logs,
        });
    }

    handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            this.setState({
                code: reader.result,
            });
        };
        reader.readAsText(file);
        this.setState({
            selectedFile: file,
        });
    };

    render() {
        const { code, outputArr } = this.state;
        return (
            <div className={styles.pythonEditorContainer}>
                <Helmet>
                    <script
                        type="text/javascript"
                        src="https://cdnjs.cloudflare.com/ajax/libs/brython/3.7.1/brython.min.js"
                    />
                    <script
                        type="text/javascript"
                        src="https://cdnjs.cloudflare.com/ajax/libs/brython/3.7.1/brython_stdlib.js"
                    />
                </Helmet>
                <Scripts code={code} />
                <div className={styles.pythonEditorInput}>
                    <input
                        type="file"
                        accept=".py"
                        onChange={this.handleFileChange}
                    />
                    <CodeEditor
                        className={styles.pythonCodeEditor}
                        value={code}
                        mode="python"
                        theme="solarized_light"
                        onChange={(text) => this.setState({ code: text })}
                        width={`${window.innerWidth / 2}px`}
                        height={`${window.innerHeight}px`}
                        fontSize={"1rem"}
                    />
                </div>
                <div className={styles.pythonEditorOutput}>
                    <div className={styles.btnWrapper}>
                        <button
                            type="button"
                            onClick={() => this.run()}
                            className={styles.runBtn}
                        >
                            Run
                        </button>
                        <button type="button" onClick={() => this.clearLogs()}>
                            Clear
                        </button>
                    </div>
                    <textarea
                        className={styles.pythonOutput}
                        readOnly
                        value={output(outputArr)}
                        placeholder="> output goes here..."
                    />
                </div>
            </div>
        );
    }
}

Scripts.propTypes = {
    code: PropTypes.string.isRequired,
};

export default PythonCodeEditor;
