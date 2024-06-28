const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/quizgame', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const questionSchema = new mongoose.Schema({
    question: String,
    options: [String],
    answer: String,
});

const scoreSchema = new mongoose.Schema({
    name: String,
    score: Number,
});

const Question = mongoose.model('Question', questionSchema);
const Score = mongoose.model('Score', scoreSchema);

app.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find();
        console.log('Questions fetched:', questions); 
        res.json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
});

app.post('/scores', async (req, res) => {
    try {
        const newScore = new Score(req.body);
        await newScore.save();
        res.status(201).json(newScore);
    } catch (error) {
        console.error('Error saving score:', error); 
        res.status(500).json({ error: 'Failed to save score' });
    }
});

app.get('/scores', async (req, res) => {
    try {
        const scores = await Score.find().sort({ score: -1 }).limit(10);
        res.json(scores);
    } catch (error) {
        console.error('Error fetching scores:', error);
        res.status(500).json({ error: 'Failed to fetch scores' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
