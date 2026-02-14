import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import StudySession from './pages/StudySession';
import CreateDeck from './pages/CreateDeck';
import Decks from './pages/Decks';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/study" element={<StudySession />} />
        <Route path="/decks" element={<Decks />} />
        <Route path="/decks/create" element={<CreateDeck />} />
        {/* Placeholder routes for now */}
        <Route path="/decks" element={<div className="text-center mt-20">My Decks Page (Coming Soon)</div>} />
        <Route path="/study" element={<div className="text-center mt-20">Study Page (Coming Soon)</div>} />
        <Route path="/analytics" element={<div className="text-center mt-20">Analytics Page (Coming Soon)</div>} />
        <Route path="/settings" element={<div className="text-center mt-20">Settings Page (Coming Soon)</div>} />
      </Routes>
    </MainLayout>
  );
}

export default App;
