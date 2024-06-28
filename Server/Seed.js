const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/quizgame');

const questionSchema = new mongoose.Schema({
    question: String,
    options: [String],
    answer: String,
});

const Question = mongoose.model('Question', questionSchema);

const questions = [
    {
        question: 'What is the capital of France?',
        options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
        answer: 'Paris',
    },
    {
        question: 'Which planet is known as the Red Planet?',
        options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
        answer: 'Mars',
    },
    {
        question: 'Who wrote "To Kill a Mockingbird"?',
        options: ['Harper Lee', 'Mark Twain', 'Ernest Hemingway', 'F. Scott Fitzgerald'],
        answer: 'Harper Lee',
    },
   
];

Question.insertMany(questions)
    .then(() => {
        console.log('Questions seeded successfully');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error seeding questions:', err);
    });
