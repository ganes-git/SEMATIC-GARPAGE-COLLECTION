import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, MoreVertical, Play } from 'lucide-react';
import { getSubjectTheme } from '@/lib/deck-styles';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface DeckProps {
    id: string;
    title: string;
    cards: number;
    mastery: number;
    tags: string[];
}

interface DeckCardProps {
    deck: DeckProps;
    index?: number;
}

export function DeckCard({ deck, index = 0 }: DeckCardProps) {
    const theme = getSubjectTheme(deck.title);
    const Icon = theme.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5 }}
        >
            <Card className="flex flex-col h-full border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <CardHeader className="relative pb-0">
                    <div className={cn("absolute inset-0 opacity-10 bg-gradient-to-br", theme.gradient)} />
                    <div className="flex justify-between items-start relative z-10 p-2">
                        <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-lg mb-4 bg-gradient-to-br", theme.gradient)}>
                            <Icon className="h-6 w-6" />
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-background/50">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-4 pt-2">
                    <div className="space-y-1">
                        <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">{deck.title}</CardTitle>
                        <CardDescription>{deck.cards} cards • Last studied 2d ago</CardDescription>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {deck.tags.map(tag => (
                            <span key={tag} className={cn("text-xs px-2 py-0.5 rounded-full border bg-background/50 backdrop-blur-sm", theme.text)}>
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Mastery</span>
                            <span>{deck.mastery}%</span>
                        </div>
                        <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
                            <div
                                className={cn("h-full rounded-full bg-gradient-to-r", theme.gradient)}
                                style={{ width: `${deck.mastery}%` }}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-4 pb-4 border-t bg-muted/5">
                    <Button variant="default" size="sm" className={cn("gap-2 shadow-md hover:shadow-lg transition-all", theme.bg)} asChild>
                        <Link to={`/study?deckId=${deck.id}`}>
                            <Play className="h-3 w-3" /> Study
                        </Link>
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:bg-background/80">
                        <Share2 className="h-3 w-3 mr-2" /> Share
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
