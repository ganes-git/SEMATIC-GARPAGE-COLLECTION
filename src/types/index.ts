export interface Card {
    id: string;
    deck_id: string;
    front: string;
    back: string;
    ease_factor: number;
    interval: number;
    repetitions: number;
    next_review: string | Date; // ISO string or Date object
    created_at?: string;
}

export interface Deck {
    id: string;
    user_id: string;
    title: string;
    description?: string;
    subject?: string;
    is_public: boolean;
    created_at?: string;
    cards?: Card[];
}

export type Rating = 1 | 2 | 3 | 4; // 1=Again, 2=Hard, 3=Good, 4=Easy

export interface ReviewLog {
    id: string;
    card_id: string;
    user_id: string;
    rating: Rating;
    response_time_seconds: number;
    created_at: string;
}

export interface StudySession {
    id: string;
    user_id: string;
    deck_id: string;
    cards_reviewed: number;
    correct_count: number;
    duration_minutes: number;
    focus_score: number;
    created_at: string;
}
