import { motion } from 'framer-motion';
import { Card as CardType } from '@/types';
import { cn } from '@/lib/utils';

interface StudyCardProps {
    card: CardType;
    isFlipped: boolean;
    onFlip: () => void;
}

export function StudyCard({ card, isFlipped, onFlip }: StudyCardProps) {
    return (
        <div className="perspective-1000 w-full max-w-2xl h-[400px] cursor-pointer" onClick={onFlip}>
            <motion.div
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                className="w-full h-full relative preserve-3d shadow-xl rounded-xl"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front */}
                <div className={cn(
                    "absolute inset-0 backface-hidden w-full h-full bg-card rounded-xl border flex flex-col items-center justify-center p-8 text-center",
                    "hover:border-primary/50 transition-colors"
                )}>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Question</span>
                    <h2 className="text-3xl font-semibold leading-relaxed">{card.front}</h2>
                    <div className="absolute bottom-6 text-xs text-muted-foreground">Click or Space to flip</div>
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 backface-hidden w-full h-full bg-primary/5 rounded-xl border border-primary/20 flex flex-col items-center justify-center p-8 text-center"
                    style={{ transform: 'rotateY(180deg)' }}
                >
                    <span className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Answer</span>
                    <p className="text-2xl leading-relaxed">{card.back}</p>
                </div>
            </motion.div>
        </div>
    );
}
