import { Card } from '../types';

export const calculateReadiness = (cards: Card[], daysUntilExam: number): number => {
    if (cards.length === 0) return 0;

    // 1. Mastery Score: % of cards with > 3 repetitions (SM-2 defines 3+ as "remembered")
    const masteredObs = cards.filter(c => c.repetitions >= 3).length;
    const masteryScore = (masteredObs / cards.length) * 100;

    // 2. Retention Score: Average ease factor (normalized)
    const avgEase = cards.reduce((sum, c) => sum + c.ease_factor, 0) / cards.length;
    // Ease factor usually starts at 2.5. 1.3 is hard. 3+ is easy.
    // Normalize 1.3 -> 0%, 2.5 -> 70%, 3.0 -> 100%
    let retentionScore = 0;
    if (avgEase >= 2.5) {
        retentionScore = 70 + ((avgEase - 2.5) / 0.5) * 30; // Scale 2.5-3.0 to 70-100
    } else {
        retentionScore = ((avgEase - 1.3) / 1.2) * 70; // Scale 1.3-2.5 to 0-70
    }
    retentionScore = Math.min(100, Math.max(0, retentionScore));

    // 3. Time Pressure Penalty
    // If user has many cards due relative to days remaining.
    const cardsDue = cards.filter(c => new Date(c.next_review) <= new Date()).length;
    // Simple heuristic: if you can clear 50 cards/day
    const neededDays = cardsDue / 50;
    let timePenalty = 0;
    if (neededDays > daysUntilExam) {
        timePenalty = 20; // Significant penalty if behind schedule
    }

    // Weighting
    // Mastery (Verified knowledge): 60%
    // Retention (Potential recall): 30%
    // Time (Feasibility): 10%

    let readiness = (masteryScore * 0.6) + (retentionScore * 0.3) + (10 - (timePenalty / 20 * 10));

    return Math.round(readiness);
};

export const getReadinessMessage = (score: number, daysUntil: number): string => {
    if (score >= 90) return `You're crushing it! Maintain this pace for the exam in ${daysUntil} days.`;
    if (score >= 70) return `Good progress. Focus on your "Hard" cards to boost confidence.`;
    if (score >= 50) return `You're getting there. Increase your daily study sessions.`;
    return `Critical mode. You need to start cramming immediately!`;
};
