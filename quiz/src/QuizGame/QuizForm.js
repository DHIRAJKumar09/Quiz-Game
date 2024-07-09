import React, { useState } from 'react';
import { createQuiz } from '../QuizzGame/Service';

const QuizForm = () => {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], answer: '' }]);

    const handleQuestionChange = (index, event) => {
        const newQuestions = [...questions];
        newQuestions[index][event.target.name] = event.target.value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (qIndex, oIndex, event) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = event.target.value;
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { question: '', options: ['', '', '', ''], answer: '' }]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await createQuiz({ title, questions });
        setTitle('');
        setQuestions([{ question: '', options: ['', '', '', ''], answer: '' }]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create a New Quiz</h1>
            <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Quiz Title"
                required
            />
            {questions.map((q, qIndex) => (
                <div key={qIndex}>
                    <input
                        type="text"
                        name="question"
                        value={q.question}
                        onChange={(e) => handleQuestionChange(qIndex, e)}
                        placeholder="Question"
                        required
                    />
                    {q.options.map((option, oIndex) => (
                        <input
                            key={oIndex}
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                            placeholder={`Option ${oIndex + 1}`}
                            required
                        />
                    ))}
                    <input
                        type="text"
                        name="answer"
                        value={q.answer}
                        onChange={(e) => handleQuestionChange(qIndex, e)}
                        placeholder="Answer"
                        required
                    />
                </div>
            ))}
            <button type="button" onClick={addQuestion}>Add Question</button>
            <button type="submit">Create Quiz</button>
        </form>
    );
};

export default QuizForm;
