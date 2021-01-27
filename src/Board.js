import React, {useEffect} from "react";
import Cell from "./Cell.js";

function Board(props) {
    const {
        boardState,
        possibleStates,
        winnerState,
        turn,
        lastTurn,
        startingSide,
        teams,
        canAnimate,
        checkboxState,
        setBoardState,
        setCanAnimate,
        setPossibleStates,
        setIsFull,
        setWinnerState,
    } = props;

    useEffect(() => {
        setIsFull(isBoardFull());
    }, [possibleStates]);

    useEffect(() => {
        setPossibleStates(searchAllPossiblePlaces(boardState));
    }, [boardState])

    function updateBoard(e) {
        if (winnerState) {
            return;
        }

        const colIndex = e.target.getAttribute("colIndex");
        const col = boardState[colIndex];
        const possiblePlace = possibleStates[colIndex]
       
        if (possiblePlace === null) {
            return;
        }

        const updatedBoard = boardState.map((col) => [...col]);
        updatedBoard[colIndex][possiblePlace] = ((turn + startingSide) % 2);
        
        setWinnerState(checkWinner(colIndex, possiblePlace, ((turn + startingSide) % 2)));
        setBoardState(updatedBoard);
        setCanAnimate(checkboxState);
    }

    function isBoardFull() {
        return possibleStates.every(el => el === null) && possibleStates.length === boardState.length;
    }

    function searchAllPossiblePlaces(boardState) {
        return boardState.map(searchPossiblePlace);
    }
    
    function searchPossiblePlace(arr) {
        for (var i = arr.length - 1; i >= 0; i -= 1) {
            if (arr[i] === null) {
                return i;
            }
        }

        return null;
    }

    function checkHorizontal(i, j, value) {
        let count = 1;
        let c = Number.parseInt(i, 10) + 1;
        let r = Number.parseInt(j, 10);

        while (inBounds(boardState, c, r) && boardState[c][r] === value) {
            count += 1;
            c += 1;
        }

        if (count >= 4) {
            return true;
        }
        
        c = i - 1;
        
        while (inBounds(boardState, c, r) && boardState[c][r] === value) {
            count += 1;
            c -= 1;
        }
        
        return (count >= 4);
    }

    function checkVertical(i, j, value) {
        let count = 1;
        let c = Number.parseInt(i, 10);
        let r = Number.parseInt(j, 10) + 1;

        while (inBounds(boardState, c, r) && boardState[c][r] === value) {
            count += 1;
            r += 1;
        }

        if (count >= 4) {
            return true;
        }
        
        r = j - 1;
        
        while (inBounds(boardState, c, r) && boardState[c][r] === value) {
            count += 1;
            r -= 1;
        }
        
        return (count >= 4);
    }

    function checkLeftDiagonal(i, j, value) {
        let count = 1;
        let c = Number.parseInt(i, 10) - 1;
        let r = Number.parseInt(j, 10) - 1;

        while (inBounds(boardState, c, r) && boardState[c][r] === value) {
            count += 1;
            c -= 1;
            r -= 1;
        }
       
        if (count >= 4) {
            return true;
        }

        c = Number.parseInt(i, 10) + 1;
        r = Number.parseInt(j, 10) + 1;

        while (inBounds(boardState, c, r) && boardState[c][r] === value) {
            count += 1;
            c += 1;
            r += 1;
        }

        return (count >= 4);
    }

    function checkRightDiagonal(i, j, value) {
        let count = 1;
        let c = Number.parseInt(i, 10) + 1;
        let r = Number.parseInt(j, 10) - 1;

        while (inBounds(boardState, c, r) && boardState[c][r] === value) {
            count += 1;
            c += 1;
            r -= 1;
        }

        if (count >= 4) {
            return true;
        }

        c = Number.parseInt(i, 10) - 1;
        r = Number.parseInt(j, 10) + 1;

        while (inBounds(boardState, c, r) && boardState[c][r] === value) {
            count += 1;
            c -= 1;
            r += 1;
        }

        return (count >= 4);
    }

    function inBounds(boardState, c, r) {
        return c >= 0 && r >= 0 && c < boardState.length && r < boardState[0].length;
    }

    function checkWinner(i, j, value) {
        return checkHorizontal(i, j, value) || checkVertical(i, j, value) || checkLeftDiagonal(i, j, value) || checkRightDiagonal(i, j, value)
    }

    const animations = ["opponent", "myself"];
    const staticClasses = ["opponent_last", "myself_last"];

    return (
            <>
                <div className={`board ${canAnimate && animations[(lastTurn) % 2]} ${!canAnimate && staticClasses[(lastTurn) % 2]}`}>
                    <div className="face bottom"></div>
                    <div className="face right"></div>
                    {
                        ["front", "back"].map((face) =>
                            <div key ={face} className={`face ${face}`}>
                                { boardState.map((col, colIndex) => 
                                    <div className="col" 
                                        key={`col_${colIndex}`} 
                                        colindex={colIndex} 
                                        onClick={updateBoard} 
                                    >
                                        {
                                            col.map((cell, index) => 
                                                <Cell value={cell}
                                                    teams={teams}
                                                    key={`${colIndex}_${index}`} 
                                                    turn={((turn + startingSide) % 2)} 
                                                    possibleState={possibleStates[colIndex]} 
                                                    colindex={colIndex}
                                                    index={index}/>
                                            )
                                        }
                                    </div>
                                    )
                                }
                            </div>
                        )
                    }
                    <div className="face top"></div>
                    <div className="face left"></div>
                </div>
            </>
    )
}

export default Board