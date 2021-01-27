import React from "react";

function Cell(props) {
    const {
        value,
        teams,
        possibleState,
        turn,
        colindex,
        index
    } = props;

    const isPossible = possibleState === index;

    return (
        <div 
            className={`cell ${(typeof teams[value] !== 'undefined') ? teams[value].key : ''} ${isPossible ? `possible_${teams[turn].key}` : ''}`} 
            colindex={colindex} 
            index={index}>
        </div>
    )
}

export default Cell
