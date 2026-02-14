import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MainLayout } from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import StudySession from './pages/StudySession';
import CreateDeck from './pages/CreateDeck';
import Decks from './pages/Decks';

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="h-full"
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();

  return (
    <MainLayout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Dashboard /></PageWrapper>} />
          <Route path="/study" element={<PageWrapper><StudySession /></PageWrapper>} />
          <Route path="/decks" element={<PageWrapper><Decks /></PageWrapper>} />
          <Route path="/decks/create" element={<PageWrapper><CreateDeck /></PageWrapper>} />

          {/* Placeholder routes */}
          <Route path="/analytics" element={<PageWrapper><div className="flex items-center justify-center h-[60vh] text-muted-foreground">Analytics Page (Coming Soon)</div></PageWrapper>} />
          <Route path="/settings" element={<PageWrapper><div className="flex items-center justify-center h-[60vh] text-muted-foreground">Settings Page (Coming Soon)</div></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </MainLayout>
  );
}

export default App;
