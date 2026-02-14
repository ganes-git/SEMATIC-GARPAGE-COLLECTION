import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateCardsFromText, GeneratedCardPreview } from '@/algorithms/cardGenerator';
import { Sparkles, Save, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CreateDeck() {
    const [title, setTitle] = useState('');
    const [rawText, setRawText] = useState('');
    const [generatedCards, setGeneratedCards] = useState<GeneratedCardPreview[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = () => {
        setIsGenerating(true);
        // Simulate processing time for effect
        setTimeout(() => {
            const cards = generateCardsFromText(rawText);
            setGeneratedCards(cards);
            setIsGenerating(false);
        }, 800);
    };

    const handleSaveDeck = () => {
        console.log('Saving deck:', { title, cards: generatedCards });
        alert('Deck saved! (Mock)');
    };

    const removeCard = (id: string) => {
        setGeneratedCards(prev => prev.filter(c => c.id !== id));
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-10">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Create New Deck</h1>
                <Button onClick={handleSaveDeck} disabled={!title || generatedCards.length === 0}>
                    <Save className="h-4 w-4 mr-2" /> Save Deck
                </Button>
            </div>

            <div className="space-y-4">
                <div className="grid w-full gap-1.5">
                    <Label htmlFor="title">Deck Title</Label>
                    <Input
                        id="title"
                        placeholder="e.g., Biology Chapter 4"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
            </div>

            <Tabs defaultValue="generate" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="generate">Smart Generator</TabsTrigger>
                    <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                </TabsList>

                <TabsContent value="generate" className="space-y-4">
                    <div className="space-y-2">
                        <Label>Paste your notes, article, or list here:</Label>
                        <Textarea
                            className="min-h-[200px] font-mono text-sm"
                            placeholder="Paste text here...
Example:
Mitochondria is the powerhouse of the cell.
Photosynthesis is the process by which green plants create food.
E = mc^2"
                            value={rawText}
                            onChange={(e) => setRawText(e.target.value)}
                        />
                    </div>

                    <Button
                        className="w-full"
                        size="lg"
                        onClick={handleGenerate}
                        disabled={!rawText || isGenerating}
                    >
                        {isGenerating ? (
                            <span className="animate-pulse">Analyzing patterns...</span>
                        ) : (
                            <><Sparkles className="h-4 w-4 mr-2" /> Generate Flashcards</>
                        )}
                    </Button>
                </TabsContent>

                <TabsContent value="manual">
                    <div className="text-center py-10 text-muted-foreground">
                        Manual entry mode coming soon. Use the Smart Generator!
                    </div>
                </TabsContent>
            </Tabs>

            {/* Preview Section */}
            <AnimatePresence>
                {generatedCards.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">{generatedCards.length} Cards Generated</h3>
                            <Button variant="outline" size="sm" onClick={() => setGeneratedCards([...generatedCards, { id: Date.now().toString(), front: '', back: '', type: 'general', confidence: 1 }])}>
                                <Plus className="h-4 w-4 mr-2" /> Add Card
                            </Button>
                        </div>

                        <div className="grid gap-4">
                            {generatedCards.map((card, index) => (
                                <motion.div
                                    key={card.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Card>
                                        <CardContent className="p-4 flex gap-4 items-start pt-4">
                                            <div className="flex-1 space-y-2">
                                                <div className="flex gap-2">
                                                    <Label className="w-12 pt-2 text-muted-foreground">Front</Label>
                                                    <Input defaultValue={card.front} className="flex-1" />
                                                </div>
                                                <div className="flex gap-2">
                                                    <Label className="w-12 pt-2 text-muted-foreground">Back</Label>
                                                    <Input defaultValue={card.back} className="flex-1" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className={`text-[10px] uppercase font-bold px-2 py-1 rounded text-center border ${card.type === 'definition' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                        card.type === 'formula' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                                            'bg-slate-50 text-slate-700 border-slate-200'
                                                    }`}>
                                                    {card.type}
                                                </div>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => removeCard(card.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
