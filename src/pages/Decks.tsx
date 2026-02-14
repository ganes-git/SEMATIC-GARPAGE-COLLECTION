import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, BookOpen, Share2, MoreVertical } from 'lucide-react';

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
                {MOCK_DECKS.map((deck) => (
                    <Card key={deck.id} className="flex flex-col hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <CardTitle className="leading-tight">{deck.title}</CardTitle>
                                    <CardDescription>{deck.cards} cards</CardDescription>
                                </div>
                                <Button variant="ghost" size="icon" className="-mr-2 h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {deck.tags.map(tag => (
                                    <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Mastery</span>
                                    <span>{deck.mastery}%</span>
                                </div>
                                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary"
                                        style={{ width: `${deck.mastery}%` }}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-4 border-t">
                            <Button variant="outline" size="sm" asChild>
                                <Link to="/study">
                                    <BookOpen className="h-3 w-3 mr-2" /> Study
                                </Link>
                            </Button>
                            <Button variant="ghost" size="sm">
                                <Share2 className="h-3 w-3 mr-2" /> Share
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
