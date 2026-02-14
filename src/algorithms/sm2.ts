import { Card, Rating } from '../types';

/**
 * SuperMemo 2 (SM-2) Algorithm Implementation
 * 
 * Reference: https://www.supermemo.com/en/archives1990-2015/english/ol/sm2
 * 
 * The algorithm calculates:
 * 1. Interval (I) - Days until next review
 * 2. Repetition Number (n) - Number of successful recalls in a row
 * 3. Ease Factor (EF) - Difficulty of the card (initial 2.5, min 1.3)
 */

interface SM2Result {
    interval: number;
    repetitions: number;
    ease_factor: number;
    next_review: Date;
}

export const calculateSM2 = (card: Card, rating: Rating): SM2Result => {
    let { interval, repetitions, ease_factor } = card;

    // Convert legacy/null values to defaults if necessary
    if (!ease_factor) ease_factor = 2.5;
    if (!repetitions) repetitions = 0;
    if (!interval) interval = 0;

    // Rating mapping:
    // 1: Again (Fail) - Complete blackout
    // 2: Hard (Pass) - Remembered with significant hesitation
    // 3: Good (Pass) - Remembered with some hesitation
    // 4: Easy (Pass) - Perfect recall

    // const grade = rating >= 3 ? rating + 1 : rating; // Unused
    // Actually, standard SM-2 uses 0-5. 
    // Our app uses 1-4.
    // 1 = Again -> SM2 0-2 (Fail)
    // 2 = Hard -> SM2 3 (Pass, hard)
    // 3 = Good -> SM2 4 (Pass, good)
    // 4 = Easy -> SM2 5 (Pass, easy)

    // Let's strictly follow the user's requirements and map to SM-2 standard logic.
    // If rating is 'Again' (1), we reset repetitions.

    if (rating === 1) {
        repetitions = 0;
        interval = 1;
    } else {
        // Correct response (Hard, Good, Easy)
        if (repetitions === 0) {
            interval = 1;
        } else if (repetitions === 1) {
            interval = 6;
        } else {
            interval = Math.round(interval * ease_factor);
        }
        repetitions += 1;
    }

    // Update Ease Factor
    // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    // q is quality of response (0-5).
    // Mapping our 1-4 to q:
    // 1 (Again) -> 0
    // 2 (Hard) -> 3
    // 3 (Good) -> 4
    // 4 (Easy) -> 5

    let q = 0;
    if (rating === 1) q = 0;
    else if (rating === 2) q = 3;
    else if (rating === 3) q = 4;
    else if (rating === 4) q = 5;

    ease_factor = ease_factor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));

    // Access constraints
    if (ease_factor < 1.3) ease_factor = 1.3;

    const next_review = new Date();
    next_review.setDate(next_review.getDate() + interval);
    // Reset time to start of day or specific time if desired, but keeping precise time is fine for now.

    return {
        interval,
        repetitions,
        ease_factor,
        next_review
    };
};

/**
 * Helper to get status text for UI
 */
export const getCardStatus = (next_review: string | Date): 'New' | 'Learning' | 'Due' | 'Fresh' => {
    const now = new Date();
    const reviewDate = new Date(next_review);

    if (reviewDate.getFullYear() === 1970) return 'New'; // Sentinel for new cards if used

    if (reviewDate <= now) return 'Due';

    return 'Fresh';
};
