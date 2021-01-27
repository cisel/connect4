import React from "react";

function Modal(props) {
    const {
        setModalState,
    } = props;
    
    return (
        <div className="modal">
            <div className="modal-content">
                {props.children[0] && <span className="close" onClick={() => setModalState([false, null])}>&times;</span>}
                <div className="modal-description">
                  { props.children }
                </div>
            </div>
        </div>
    )
}

export default Modal
