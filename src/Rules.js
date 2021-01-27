import React from 'react'

function Rules() {
    return (
        <ul className="rules">
            <li key={1} className="rule-item">The first player inserts a checker into the grid. Only after the checker has been released can the second player make his or her move.</li>
            <li key={2} className="rule-item">Turns continue to alternate between the first and second players until someone gets four checkers of the same color lined up in a row or the board is filled without any winning moves.</li>
            <li key={3} className="rule-item"> A winner is declared when one player gets four of their colored checkers in a row vertically, horizontally or diagonally. Other configurations, such as squares, don’t count as winning combinations. The game is declared a stalemate or tie if all the pieces are played but nobody has four in a row.</li>
        </ul> 
    )
}

export default Rules
