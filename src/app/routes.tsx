import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { ProtectedRoute } from '../components/common/ProtectedRoute';
import { Achievements, Bible, BibleReader, Challenge, CompetitionResult, Competitions, Friends, Home, Journey, Lesson, Login, Missions, Notifications, Onboarding, Profile, Ranking, Register, Review, Settings, Social, Teams, Tournaments } from '../pages';

function ProtectedPage({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute><Layout>{children}</Layout></ProtectedRoute>;
}

export function AppRoutes() {
  return <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/cadastro" element={<Register />} />
    <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
    <Route path="/" element={<Navigate to="/home" replace />} />
    <Route path="/home" element={<ProtectedPage><Home /></ProtectedPage>} />
    <Route path="/jornada" element={<ProtectedPage><Journey /></ProtectedPage>} />
    <Route path="/licao/:id" element={<ProtectedPage><Lesson /></ProtectedPage>} />
    <Route path="/biblia" element={<ProtectedPage><Bible /></ProtectedPage>} />
    <Route path="/biblia/:book" element={<ProtectedPage><BibleReader /></ProtectedPage>} />
    <Route path="/biblia/:book/:chapter" element={<ProtectedPage><BibleReader /></ProtectedPage>} />
    <Route path="/revisao" element={<ProtectedPage><Review /></ProtectedPage>} />
    <Route path="/conquistas" element={<ProtectedPage><Achievements /></ProtectedPage>} />
    <Route path="/perfil" element={<ProtectedPage><Profile /></ProtectedPage>} />
    <Route path="/perfil/:id" element={<ProtectedPage><Profile /></ProtectedPage>} />
    <Route path="/desafio" element={<ProtectedPage><Challenge /></ProtectedPage>} />
    <Route path="/desafio/:id" element={<ProtectedPage><Challenge /></ProtectedPage>} />
    <Route path="/missoes" element={<ProtectedPage><Missions /></ProtectedPage>} />
    <Route path="/social" element={<ProtectedPage><Social /></ProtectedPage>} />
    <Route path="/amigos" element={<ProtectedPage><Friends /></ProtectedPage>} />
    <Route path="/ranking" element={<ProtectedPage><Ranking /></ProtectedPage>} />
    <Route path="/competicoes" element={<ProtectedPage><Competitions /></ProtectedPage>} />
    <Route path="/competicoes/resultado" element={<ProtectedPage><CompetitionResult /></ProtectedPage>} />
    <Route path="/competicoes/:id" element={<ProtectedPage><Layout><Competitions /></Layout></ProtectedPage>} />
    <Route path="/duplas" element={<ProtectedPage><Competitions /></ProtectedPage>} />
    <Route path="/equipes" element={<ProtectedPage><Teams /></ProtectedPage>} />
    <Route path="/torneios" element={<ProtectedPage><Tournaments /></ProtectedPage>} />
    <Route path="/notificacoes" element={<ProtectedPage><Notifications /></ProtectedPage>} />
    <Route path="/configuracoes" element={<ProtectedPage><Settings /></ProtectedPage>} />
    <Route path="*" element={<Navigate to="/home" replace />} />
  </Routes>;
}
