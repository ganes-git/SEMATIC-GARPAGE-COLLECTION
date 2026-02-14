import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";

interface EmptyStateProps {
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
    image?: string; // One of: 'decks', 'cards', 'search'
}

export function EmptyState({ title, description, actionLabel, onAction, image = 'decks' }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center animate-in fade-in-50 zoom-in-95 duration-500">
            <div className="w-64 h-64 mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse-soft" />
                {/* Fallback SVG if image not found */}
                <img
                    src={image === 'decks' ? '/images/empty-decks.svg' : '/images/search-empty.svg'}
                    alt="Empty State"
                    className="relative z-10 w-full h-full object-contain drop-shadow-xl"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.classList.add('flex', 'items-center', 'justify-center', 'bg-muted/50', 'rounded-full');
                        e.currentTarget.parentElement!.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground"><circle cx="12" cy="12" r="10"/><path d="m16 16-4-4"/><path d="m16 12-4 4"/></svg>`;
                    }}
                />
            </div>

            <h3 className="text-2xl font-bold tracking-tight mb-2">{title}</h3>
            <p className="text-muted-foreground max-w-sm mb-8 text-lg">{description}</p>

            {actionLabel && onAction && (
                <Button onClick={onAction} size="lg" className="gap-2 group shadow-lg hover:shadow-primary/25 transition-all hover:scale-105">
                    <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                    {actionLabel}
                </Button>
            )}
        </div>
    );
}
