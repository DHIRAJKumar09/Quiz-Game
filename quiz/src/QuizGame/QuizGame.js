import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuizGame.css'; 
import Loader from './Loader';

const QuizGame = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/questions')
            .then(response => {
                console.log('Questions received:', response.data); 
                setQuestions(response.data);
            })
            .catch(error => {
                console.error('Error fetching questions:', error); 
            });
    }, []);

    const handleAnswer = (option) => {
        if (questions[currentQuestionIndex].answer === option) {
            setScore(score + 1);
        }

        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            setIsGameOver(true);
            const playerName = prompt('Game Over! Enter your name:');
            if (playerName) {
                axios.post('http://localhost:5000/scores', { name: playerName, score })
                    .then(response => console.log('Score saved:', response.data))
                    .catch(error => console.error('Error saving score:', error));
            }
        }
    };

    if (isGameOver) {
        return <div className="game-over">Game Over! Your score is: {score}</div>;
    }

    if (!questions.length) {
        return <div>
            <Loader/>
        </div>;
    }

    return (
        <div className="quiz-game">
            <h1>Quiz Game</h1>
            <div className="question">
                <h2>{questions[currentQuestionIndex].question}</h2>
                <div className="options">
                    {questions[currentQuestionIndex].options.map(option => (
                        <button key={option} onClick={() => handleAnswer(option)}>
                            {option}
                        </button>
                    ))}
                </div>
            </div>
            <p>Score: {score}</p>
        </div>
    );
};

export default QuizGame;
