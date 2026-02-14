import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card as CardType, Rating } from '@/types';
import { StudyCard } from '@/components/StudyCard';
import { Button } from '@/components/ui/button';
import { useStudyStore } from '@/hooks/useStudyStore';
import { calculateSM2 } from '@/algorithms/sm2';
import { Play, Pause, CheckCircle2, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';

// Mock Data for Demo
const MOCK_CARDS: CardType[] = [
    { id: '1', deck_id: 'd1', front: 'What is the powerhouse of the cell?', back: 'Mitochondria', ease_factor: 2.5, interval: 0, repetitions: 0, next_review: new Date().toISOString() },
    { id: '2', deck_id: 'd1', front: 'What is the time complexity of QuickSort?', back: 'O(n log n)', ease_factor: 2.5, interval: 0, repetitions: 0, next_review: new Date().toISOString() },
    { id: '3', deck_id: 'd1', front: 'Define: Polymorphism', back: 'The ability of an object to take on many forms.', ease_factor: 2.5, interval: 0, repetitions: 0, next_review: new Date().toISOString() },
];

export default function StudySession() {
    const timeLeft = useStudyStore(state => state.timeLeft);
    const isActive = useStudyStore(state => state.isActive);
    const startTimer = useStudyStore(state => state.startTimer);
    const pauseTimer = useStudyStore(state => state.pauseTimer);

    // Derived state
    const toggleTimer = isActive ? pauseTimer : startTimer;
    const tick = useStudyStore(state => state.tick);

    const [queue] = useState<CardType[]>(MOCK_CARDS);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [sessionComplete, setSessionComplete] = useState(false);
    const [confetti, setConfetti] = useState<{ id: number; style: React.CSSProperties }[]>([]);

    // Timer Tick
    useEffect(() => {
        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, [tick]);

    // Confetti Effect on Complete
    useEffect(() => {
        if (sessionComplete) {
            const colors = ['#ef4444', '#22c55e', '#3b82f6', '#eab308'];
            const pieces = Array.from({ length: 50 }).map((_, i) => ({
                id: i,
                style: {
                    left: `${Math.random() * 100}%`,
                    top: `-20px`,
                    backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                    animationDuration: `${Math.random() * 3 + 2}s`,
                    animationDelay: `${Math.random() * 1}s`
                }
            }));
            setConfetti(pieces);
        }
    }, [sessionComplete]);

    const currentCard = queue[currentCardIndex];
    const progress = ((currentCardIndex) / queue.length) * 100;

    const handleFlip = useCallback(() => setIsFlipped(prev => !prev), []);

    const handleRate = useCallback((rating: Rating) => {
        if (!currentCard) return;

        // Apply SM-2 Algorithm
        const result = calculateSM2(currentCard, rating);
        console.log(`Card ${currentCard.id} rated ${rating}. Next review in ${result.interval} days.`);

        setIsFlipped(false);

        if (currentCardIndex < queue.length - 1) {
            setTimeout(() => setCurrentCardIndex(prev => prev + 1), 150);
        } else {
            setSessionComplete(true);
        }
    }, [currentCard, currentCardIndex, queue.length]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                e.preventDefault();
                if (!isFlipped) handleFlip();
            }
            if (!isFlipped) return; // Only rate when flipped

            if (e.key === '1') handleRate(1);
            if (e.key === '2') handleRate(2);
            if (e.key === '3') handleRate(3);
            if (e.key === '4') handleRate(4);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFlipped, handleRate, handleFlip]);

    // Safety check for TS and runtime
    if (!currentCard && !sessionComplete) return null;

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (sessionComplete) {
        return (
            <div className="relative min-h-[90vh] flex flex-col items-center justify-center p-4 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-100 via-background to-background dark:from-green-900/20" />

                {/* Confetti */}
                {confetti.map(piece => (
                    <div
                        key={piece.id}
                        className="confetti"
                        style={piece.style}
                    />
                ))}

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass max-w-lg w-full p-8 rounded-3xl text-center space-y-6 shadow-2xl border-green-200/50 dark:border-green-800/50"
                >
                    <div className="mx-auto h-24 w-24 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center animate-bounce">
                        <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">Session Complete!</h1>
                        <p className="text-lg text-muted-foreground">You reviewed {queue.length} cards in {formatTime(1500 - timeLeft)}.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 shadow-lg shadow-green-500/25" onClick={() => window.location.reload()}>
                            Review Again
                        </Button>
                        <Button size="lg" variant="outline" className="w-full" asChild>
                            <Link to="/">Back to Dashboard</Link>
                        </Button>
                    </div>
                </motion.div>

                <img
                    src="/images/success.svg"
                    alt="Success"
                    className="absolute bottom-0 opacity-50 max-w-sm pointer-events-none"
                    onError={(e) => e.currentTarget.style.display = 'none'}
                />
            </div>
        );
    }

    if (!currentCard) return null;

    return (
        <div className="relative max-w-5xl mx-auto flex flex-col items-center min-h-[calc(100vh-80px)] p-4 lg:p-8">
            {/* Background elements */}
            <div className="fixed inset-0 -z-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

            {/* Header / Timer Bar */}
            <div className="w-full max-w-3xl glass rounded-2xl p-4 mb-8 flex items-center justify-between shadow-sm sticky top-4 z-20">
                <Button variant="ghost" size="icon" asChild>
                    <Link to="/"><X className="w-5 h-5 text-muted-foreground" /></Link>
                </Button>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className={`text-2xl font-mono font-bold tabular-nums ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                            {formatTime(timeLeft)}
                        </div>
                        {isActive && <span className="absolute -top-1 -right-2 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>}
                    </div>
                    <div className="flex gap-1">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={toggleTimer}>
                            {isActive ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                        </Button>
                    </div>
                </div>

                <div className="w-24">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground mb-1 block text-right">Progress</span>
                    <Progress value={progress} className="h-2" />
                </div>
            </div>

            {/* Card Area */}
            <div className="flex-1 w-full flex flex-col items-center justify-center relative min-h-[400px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentCard.id}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20, transition: { duration: 0.15 } }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="w-full max-w-xl perspective-1000"
                    >
                        <StudyCard
                            card={currentCard}
                            isFlipped={isFlipped}
                            onFlip={handleFlip}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="w-full max-w-3xl h-24 mt-8 sticky bottom-8">
                {isFlipped ? (
                    <div className="grid grid-cols-4 gap-3 md:gap-6 animate-in slide-in-from-bottom-4 fade-in duration-300">
                        {[
                            { label: 'Again', time: '< 1m', color: 'red', val: 1 },
                            { label: 'Hard', time: '2d', color: 'orange', val: 2 },
                            { label: 'Good', time: '4d', color: 'blue', val: 3 },
                            { label: 'Easy', time: '7d', color: 'green', val: 4 },
                        ].map((btn) => (
                            <Button
                                key={btn.label}
                                variant="outline"
                                className={`h-20 flex flex-col gap-1 border-b-4 hover:translate-y-1 transition-all shadow-sm hover:shadow-md border-${btn.color}-500 hover:bg-${btn.color}-50 dark:hover:bg-${btn.color}-950/30`}
                                onClick={() => handleRate(btn.val as Rating)}
                            >
                                <span className={`font-bold text-lg text-${btn.color}-600 dark:text-${btn.color}-400`}>{btn.label}</span>
                                <span className="text-xs text-muted-foreground">{btn.time}</span>
                            </Button>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <Button
                            size="lg"
                            className="h-16 px-12 text-xl font-semibold shadow-xl shadow-primary/20 hover:scale-105 transition-all w-full md:w-auto rounded-2xl"
                            onClick={handleFlip}
                        >
                            Show Answer <span className="ml-3 text-xs bg-white/20 px-2 py-1 rounded text-white/80 font-mono">SPACE</span>
                        </Button>
                    </div>
                )}
            </div>

            <div className="mt-4 text-xs text-muted-foreground text-center opacity-50">
                Tip: Use number keys 1-4 to rate cards
            </div>
        </div>
    );
}
