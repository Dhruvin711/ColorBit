import React, { useState, useEffect } from "react";
import Tile from "./Components/Tile";
import axios from 'axios';

import "./styles.css";

function App() {
    const [gameState, setGameState] = useState({
        grid: Array.from({ length: 10 }, () => Array(10).fill(0)),
        playerScore: 0,
        isGameRunning: false,
        redTileSpeed: 250,
    });

    const getGrid = async (req, res) => {
        const apiURL = 'http://127.0.0.1:8000';

        try {
            const { data } = await axios.get(apiURL);
            const randomGrid = data.grid;

            setGameState({
                grid: randomGrid,
                playerScore: 0,
                isGameRunning: false,
                redTileSpeed: 250,
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getGrid();
    }, []);

    const [redIndex, setRedIndex] = useState(0);

    function startGame() {
        setGameState({ ...gameState, isGameRunning: true, playerScore: 0 });
    }

    function stopGame() {
        setGameState({ ...gameState, isGameRunning: false });
        setRedIndex(0);
    }

    function changeLevel(event) {
        const newSpeed = 250 - 50 * (event.target.value - 1);
        setGameState({ ...gameState, redTileSpeed: newSpeed });
    }

    function updateScore(tileColor) {
        var score = gameState.playerScore;
        if (tileColor === "blue") score += 10;
        else if (tileColor === "red") score += -10;

        console.log(score);

        if (gameState.isGameRunning) {
            setGameState({ ...gameState, playerScore: score });
        }
    }

    useEffect(() => {
        let game;
        if (gameState.isGameRunning) {
            game = setInterval(() => {
                setRedIndex((prevRedIndex) => (prevRedIndex + 2) % 10);
            }, gameState.redTileSpeed)
        }

        return () => (clearInterval(game));
    }, [gameState.isGameRunning])

    return (
        <div className="container">
            <h1>ColorBit Challange</h1>
            <div className="game-container">
                <div className="controls-container">
                    <button className="btn btn-success" onClick={startGame}>Start Game</button>
                    <button className="btn btn-danger" onClick={stopGame}>Stop Game</button>

                    <select className="level-container form-select" onChange={changeLevel} disabled={gameState.isGameRunning}>
                        <option value="1">Level 1</option>
                        <option value="2">Level 2</option>
                        <option value="3">Level 3</option>
                        <option value="4">Level 4</option>
                        <option value="5">Level 5</option>
                    </select>
                </div>

                {/* GRID : 10x10 */}
                <div className="grid-container">
                    {
                        gameState.grid.map((row, rowIndex) => (
                            row.map((col, colIndex) => (
                                <Tile
                                    key={rowIndex * 10 + colIndex}
                                    color={`${(colIndex === redIndex || colIndex === redIndex + 1 ? "red" : (col === 1 ? "blue" : "#000"))}`}
                                    onClick={() => updateScore(`${(colIndex === redIndex || colIndex === redIndex + 1 ? "red" : (col === 1 ? "blue" : "#000"))}`)}
                                />
                            ))
                        ))
                    }
                </div>

                <div className="score-container">
                    <span>Score</span>: {gameState.playerScore}
                </div>
            </div>
        </div>
    )
}

export default App;