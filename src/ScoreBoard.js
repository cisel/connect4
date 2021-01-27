import React from "react"

function ScoreBoard(props) {
    const {
        teams,
        scoreState
    } = props;
    
    return (
        <div className="score-board text-center mb-2">
            <p>Team {teams[0].val} {scoreState[0]} - {scoreState[1]} Team {teams[1].val}</p>
        </div>
    )
}

export default ScoreBoard
