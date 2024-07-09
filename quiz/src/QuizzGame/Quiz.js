import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuizById } from '../QuizzGame/Service';
import '../App.css';

const Quiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    getQuizById(id).then(response => {
      setQuiz(response.data);
    });
  }, [id]);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < quiz.questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="container">
      {showScore ? (
        <div className='score-section'>
          You scored {score} out of {quiz.questions.length}
        </div>
      ) : (
        <>
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {currentQuestionIndex + 1}</span>/{quiz.questions.length}
            </div>
            <div className='question-text'>{quiz.questions[currentQuestionIndex].question}</div>
          </div>
          <div className='answer-section'>
            {quiz.questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(option === quiz.questions[currentQuestionIndex].answer)}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
