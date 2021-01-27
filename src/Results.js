import React from "react";

function Results(props) {
    const {
        isFull,
        teams,
        winner,
        playAgain,
        resetGame
    } = props;

    return (
        <div className="results">
            <>
                <div className="result mb-1">
                    { isFull && <p>Draw!</p>}
                    { !isFull && <p>Team {teams[winner].val} won!</p>}
                </div>   
                <div className="result-buttons">
                    <button className="btn" onClick={playAgain}>Play Again</button>
                    <button className="btn" onClick={resetGame}>Reset Scores</button>    
                </div>             
            </>
        </div>
    )
}

export default Results
