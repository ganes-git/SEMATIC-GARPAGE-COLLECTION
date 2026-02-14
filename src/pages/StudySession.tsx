import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card as CardType, Rating } from '@/types';
import { StudyCard } from '@/components/StudyCard';
import { Button } from '@/components/ui/button';
import { useStudyStore } from '@/hooks/useStudyStore';
import { calculateSM2 } from '@/algorithms/sm2';
import { Play, Pause, RotateCcw, CheckCircle2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Mock Data for Demo
const MOCK_CARDS: CardType[] = [
    { id: '1', deck_id: 'd1', front: 'What is the powerhouse of the cell?', back: 'Mitochondria', ease_factor: 2.5, interval: 0, repetitions: 0, next_review: new Date().toISOString() },
    { id: '2', deck_id: 'd1', front: 'What is the time complexity of QuickSort?', back: 'O(n log n)', ease_factor: 2.5, interval: 0, repetitions: 0, next_review: new Date().toISOString() },
    { id: '3', deck_id: 'd1', front: 'Define: Polymorphism', back: 'The ability of an object to take on many forms.', ease_factor: 2.5, interval: 0, repetitions: 0, next_review: new Date().toISOString() },
];

export default function StudySession() {
    const { timeLeft, isActive, toggleTimer, resetTimer } = useStudyStore((state) => ({
        timeLeft: state.timeLeft,
        isActive: state.isActive,
        toggleTimer: state.isActive ? state.pauseTimer : state.startTimer,
        resetTimer: state.resetTimer,
    }));
    const tick = useStudyStore(state => state.tick);

    const [queue] = useState<CardType[]>(MOCK_CARDS);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [sessionComplete, setSessionComplete] = useState(false);

    // Timer Tick
    useEffect(() => {
        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, [tick]);

    const currentCard = queue[currentCardIndex];
    const progress = ((currentCardIndex) / MOCK_CARDS.length) * 100;

    // Safety check for TS and runtime
    if (!currentCard && !sessionComplete) return null;

    const handleFlip = useCallback(() => setIsFlipped(prev => !prev), []);

    const handleRate = useCallback((rating: Rating) => {
        if (!currentCard) return;

        // Apply SM-2 Algorithm
        const result = calculateSM2(currentCard, rating);

        // In a real app, we'd update Supabase here
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

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (sessionComplete) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] text-center space-y-6 animate-in zoom-in-50 duration-500">
                <div className="h-24 w-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
                </div>
                <h1 className="text-4xl font-bold">Session Complete!</h1>
                <p className="text-xl text-muted-foreground">You reviewed {queue.length} cards in this session.</p>
                <div className="flex gap-4">
                    <Button onClick={() => window.location.reload()}>Review Again</Button>
                    <Button variant="outline" onClick={() => window.location.href = '/'}>Back to Dashboard</Button>
                </div>
            </div>
        );
    }

    if (!currentCard) return null;

    return (
        <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-100px)]">
            {/* Header / Timer */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="text-4xl font-mono font-bold w-32 relative">
                        <span className={isActive ? "text-primary" : "text-muted-foreground"}>
                            {formatTime(timeLeft)}
                        </span>
                        {isActive && (
                            <motion.div
                                className="absolute -right-4 top-1 h-3 w-3 bg-red-500 rounded-full"
                                animate={{ opacity: [1, 0] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                            />
                        )}
                    </div>
                    <Button variant="outline" size="icon" onClick={toggleTimer}>
                        {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={resetTimer}>
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                </div>

                <div className="w-1/3">
                    <div className="flex justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>{currentCardIndex + 1} / {queue.length}</span>
                    </div>
                    <Progress value={progress} />
                </div>
            </div>

            {/* Card Area */}
            <div className="flex-1 flex flex-col items-center justify-center relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentCard.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.2 }}
                        className="w-full flex justify-center perspective-container"
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
            <div className="mt-8 h-24">
                {isFlipped ? (
                    <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto w-full animate-in slide-in-from-bottom-4 fade-in duration-300">
                        <Button
                            variant="secondary"
                            className="border-red-200 hover:bg-red-100 hover:text-red-900 border-t-4 border-t-red-500 h-16 flex flex-col gap-1"
                            onClick={() => handleRate(1)}
                        >
                            <span className="font-bold text-lg">Again</span>
                            <span className="text-xs opacity-70">&lt; 1m</span>
                        </Button>
                        <Button
                            variant="secondary"
                            className="border-orange-200 hover:bg-orange-100 hover:text-orange-900 border-t-4 border-t-orange-500 h-16 flex flex-col gap-1"
                            onClick={() => handleRate(2)}
                        >
                            <span className="font-bold text-lg">Hard</span>
                            <span className="text-xs opacity-70">2d</span>
                        </Button>
                        <Button
                            variant="secondary"
                            className="border-blue-200 hover:bg-blue-100 hover:text-blue-900 border-t-4 border-t-blue-500 h-16 flex flex-col gap-1"
                            onClick={() => handleRate(3)}
                        >
                            <span className="font-bold text-lg">Good</span>
                            <span className="text-xs opacity-70">4d</span>
                        </Button>
                        <Button
                            variant="secondary"
                            className="border-green-200 hover:bg-green-100 hover:text-green-900 border-t-4 border-t-green-500 h-16 flex flex-col gap-1"
                            onClick={() => handleRate(4)}
                        >
                            <span className="font-bold text-lg">Easy</span>
                            <span className="text-xs opacity-70">7d</span>
                        </Button>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <Button size="lg" className="w-64 h-14 text-lg" onClick={handleFlip}>
                            Show Answer <span className="ml-2 text-xs opacity-50 bg-black/20 px-2 py-0.5 rounded">Space</span>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
