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
        const apiURL = 'http://127.0.0.1:8000' || 'https://colorbit-server.onrender.com';

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

    const [popupMessage, setPopupMessage] = useState(null);

    function updateScore(tileColor) {
        if (gameState.isGameRunning) {
            let scoreChange = 0;

            if (tileColor === "blue") {
                scoreChange = 10;
                setPopupMessage("+10, Good Job!");
            }
            else if (tileColor === "red") {
                scoreChange = -10;
                setPopupMessage("-10, Oops!");
            }

            const newScore = gameState.playerScore + scoreChange;
            setGameState({ ...gameState, playerScore: newScore });

            // Hide popup message after 1 second
            setTimeout(() => {
                setPopupMessage(null);
            }, 1000);
        }
    }

    useEffect(() => {
        let game;
        let direction = 1; // 1 for forward, -1 for backward
        let currentIndex = 0;

        if (gameState.isGameRunning) {
            game = setInterval(() => {
                setRedIndex((prevRedIndex) => {
                    currentIndex = prevRedIndex + direction * 2;

                    if (currentIndex === 8) {
                        // If reached the end, change direction to backward
                        direction = -1;
                    } else if (currentIndex === 0) {
                        // If reached the start, change direction to forward
                        direction = 1;
                    }

                    return currentIndex;
                });
            }, gameState.redTileSpeed);
        }

        return () => clearInterval(game);
    }, [gameState.isGameRunning]);


    return (
        <div className="container">
            <h1>ColorBit Challange</h1>
            <div className="game-container">
                <div className="controls-container">
                    <button className="btn btn-success" onClick={startGame} style={{cursor: `${gameState.isGameRunning ? "not-allowed" : ""}`}}>Start Game</button>
                    <button className="btn btn-danger" onClick={stopGame} style={{cursor: `${!gameState.isGameRunning ? "not-allowed" : ""}`}}>Stop Game</button>

                    <select className="level-container form-select" onChange={changeLevel} disabled={gameState.isGameRunning}
                        style={{cursor: `${gameState.isGameRunning ? "not-allowed" : "pointer"}`}}>
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

                {popupMessage && (
                    <div className="popup">
                        {popupMessage}
                    </div>
                )}
            </div>
        </div>
    )
}

export default App;