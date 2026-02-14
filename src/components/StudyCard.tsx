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
                    "absolute inset-0 backface-hidden w-full h-full bg-card/80 backdrop-blur-xl rounded-xl border-2 border-border/50 flex flex-col items-center justify-center p-8 text-center shadow-2xl",
                    "group-hover:border-primary/50 transition-colors"
                )} style={{ backfaceVisibility: 'hidden' }}>
                    <div className="absolute top-6 left-6 w-12 h-1 bg-gradient-to-r from-primary to-transparent rounded-full opacity-50" />
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">Question</span>
                    <h2 className="text-3xl font-bold leading-relaxed text-balance">{card.front}</h2>
                    <div className="absolute bottom-6 text-xs text-muted-foreground font-mono bg-muted/50 px-3 py-1 rounded-full">SPACE to flip</div>
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 backface-hidden w-full h-full bg-gradient-to-br from-primary/5 to-purple-500/5 backdrop-blur-xl rounded-xl border-2 border-primary/20 flex flex-col items-center justify-center p-8 text-center shadow-2xl"
                    style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                >
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-purple-500" />
                    <span className="text-xs font-bold text-primary uppercase tracking-widest mb-6">Answer</span>
                    <p className="text-2xl font-medium leading-relaxed text-balance">{card.back}</p>
                </div>
            </motion.div>
        </div>
    );
}
