import React from "react";

function Checkbox(props) {
    const {
        text,
        checkboxState,
        setCheckboxState,
    } = props;

    function noop() {}
    
    return (
        <div className="control" onClick={() => setCheckboxState(!checkboxState)}>
            <input className="regular-checkbox" type="checkbox" name="control" checked={checkboxState} onChange={noop} /> 
            <span className="control-text">{text}</span>
        </div>
    )
}

export default Checkbox
