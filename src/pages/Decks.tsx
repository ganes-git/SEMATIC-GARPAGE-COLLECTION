import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { DeckCard } from '@/components/DeckCard';

const MOCK_DECKS = [
    { id: '1', title: 'Biology 101: Cell Structure', cards: 45, mastery: 78, tags: ['Science', 'Biology'] },
    { id: '2', title: 'Spanish Vocabulary: Foods', cards: 120, mastery: 45, tags: ['Language', 'Spanish'] },
    { id: '3', title: 'React Hooks & Patterns', cards: 30, mastery: 92, tags: ['Coding', 'React'] },
    { id: '4', title: 'World History: WWII', cards: 65, mastery: 12, tags: ['History'] },
    { id: '5', title: 'Calculus Formulas', cards: 25, mastery: 5, tags: ['Math'] },
];

export default function Decks() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Decks</h1>
                    <p className="text-muted-foreground">Manage your flashcard collections.</p>
                </div>
                <Button asChild>
                    <Link to="/decks/create">
                        <Plus className="h-4 w-4 mr-2" /> Create New Deck
                    </Link>
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {MOCK_DECKS.map((deck, i) => (
                    <DeckCard key={deck.id} deck={deck} index={i} />
                ))}
            </div>
        </div>
    );
}
