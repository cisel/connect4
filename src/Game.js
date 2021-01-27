import React, {useState, useEffect} from "react";
import Board from "./Board.js";
import Modal from "./Modal.js";
import ScoreBoard from "./ScoreBoard.js";
import Results from "./Results.js";
import Rules from "./Rules.js";
import Checkbox from "./Checkbox.js"

function Game() {
    const board = [];
    for (var i = 0; i < 7; i += 1) {
        const col = [];
        for (var j = 0; j < 6; j += 1) {
            col.push(null);
        }
        board.push(col);
    }

    const firstSide = Math.round(Math.random());
    const teams = [
        {
            key: "team_1",
            val: "Yellow"
        },
        {
            key: "team_2",
            val: "Red"
        },
    ]

    const [boardState, setBoardState] = useState(board);
    const [isFull, setIsFull] = useState(false);
    const [possibleStates, setPossibleStates] = useState([]);
    const [turn, setTurn] = useState(0);
    const [winner, setWinner] = useState();
    const [winnerState, setWinnerState] = useState(false);
    const [scoreState, setScoreState] = useState([0, 0]);
    const [modalState, setModalState] = useState([false, null]);
    const [canAnimate, setCanAnimate] = useState(false);
    const [checkboxState, setCheckboxState] = useState(true);
    const [lastTurn, setLastTurn] = useState(0);
    const [startingSide, setStartingSide] = useState(firstSide);

    useEffect(() => {
        if (winnerState) {
            const newScore = [...scoreState];
            newScore[(turn + startingSide) % 2] += 1;
            setScoreState(newScore);
            setWinner((turn + startingSide) % 2);
            setPossibleStates([]);
            setModalState([true, "results"]);
        } else {
            setTurn(turn + 1);
        }
    }, [boardState])

    useEffect(() => {
        if (isFull) {
            setModalState([true, "results"]);
        }
    }, [isFull])

    useEffect(() => {
        if (checkboxState) {
            setLastTurn(lastTurn + 1);
        }
    }, [turn])

    function playAgain() {
        setBoardState(board);
        setTurn(0);
        setWinner("");
        setWinnerState(false);
        setIsFull(false);
        setModalState([false, null]);
    }
    
    function resetGame() {
        playAgain();
        setScoreState([0, 0]);
    }

    return (
        <>
            <h1 className="text-center mb-1 logo">Connect 4</h1>
            <div className="container">
                <button className="btn text-center mb-1" onClick={() => setModalState([true, "rules"])}>How to play</button>
                <Checkbox text={"Rotate the Board"} checkboxState={checkboxState} setCheckboxState={setCheckboxState} />
            </div>
            {modalState[0] && 
            <Modal type={modalState[1]} setModalState={setModalState}>
                {modalState[1] === "rules" && <Rules />}
                {modalState[1] === "results" && 
                <Results winnerState={winnerState} 
                    isFull={isFull} 
                    teams={teams} 
                    winner={winner} 
                    playAgain={playAgain} 
                    resetGame={resetGame} 
                />}
            </Modal>
            }
            <ScoreBoard teams={teams} 
                scoreState={scoreState} 
            />
            <Board boardState={boardState} 
                possibleStates={possibleStates} 
                winnerState={winnerState} 
                turn={turn} 
                lastTurn={lastTurn} 
                startingSide={startingSide}
                teams={teams} 
                canAnimate={canAnimate}
                checkboxState={checkboxState}
                setBoardState={setBoardState} 
                setCanAnimate={setCanAnimate}
                setPossibleStates={setPossibleStates} 
                setIsFull={setIsFull} 
                setWinnerState={setWinnerState} 
            />
        </>
    )
}

export default Game
