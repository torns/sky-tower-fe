import React from 'react';
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/keymap/sublime";
import "codemirror/theme/monokai.css";
import './index.less';

class Codeblock extends React.Component {
  state = {

  };

  render() {
    const { code, language } = this.props;
    
    return (
        <div className="codeblock">
            <CodeMirror
                value={code}
                options={{
                    theme: "monokai",
                    keyMap: "sublime",
                    mode: language,
                    lineNumbers: false,
                    readOnly: true
                }}
            />
        </div>
    );
  }
}

export default Codeblock;
