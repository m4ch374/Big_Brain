import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes';
import Dashboard from './pages/Dashboard';
import EditQuestion from './pages/EditQuestion';
import EditQuiz from './pages/EditQuiz';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<ProtectedRoutes />}>
        <Route path='/' element={<Dashboard />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/quiz/:quizId' element={<EditQuiz />} />
        <Route path='/question/:quizId/:questionId' element={<EditQuestion />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
