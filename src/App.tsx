import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Achievements, Bible, Challenge, Home, Journey, Lesson, Login, Profile, Review } from './pages';
import './App.css';

function App() {
  return <BrowserRouter><Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Navigate to="/home" replace />} />
    <Route path="/home" element={<ProtectedRoute><Layout><Home /></Layout></ProtectedRoute>} />
    <Route path="/jornada" element={<ProtectedRoute><Layout><Journey /></Layout></ProtectedRoute>} />
    <Route path="/licao/:id" element={<ProtectedRoute><Layout><Lesson /></Layout></ProtectedRoute>} />
    <Route path="/biblia" element={<ProtectedRoute><Layout><Bible /></Layout></ProtectedRoute>} />
    <Route path="/revisao" element={<ProtectedRoute><Layout><Review /></Layout></ProtectedRoute>} />
    <Route path="/conquistas" element={<ProtectedRoute><Layout><Achievements /></Layout></ProtectedRoute>} />
    <Route path="/perfil" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
    <Route path="/desafio" element={<ProtectedRoute><Layout><Challenge /></Layout></ProtectedRoute>} />
    <Route path="*" element={<Navigate to="/home" replace />} />
  </Routes></BrowserRouter>;
}
export default App;
