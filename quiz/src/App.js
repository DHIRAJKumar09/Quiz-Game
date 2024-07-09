import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizList from './QuizzGame/QuizList';
import Quiz from './QuizzGame/Quiz';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<QuizList />} />
          <Route path='/quiz/:id' element={<Quiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
