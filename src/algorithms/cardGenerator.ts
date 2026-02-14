import { v4 as uuidv4 } from 'uuid';

export interface GeneratedCardPreview {
    id: string;
    front: string;
    back: string;
    type: 'definition' | 'process' | 'formula' | 'date' | 'general';
    confidence: number;
}

export const generateCardsFromText = (text: string): GeneratedCardPreview[] => {
    const cards: GeneratedCardPreview[] = [];
    const lines = text.split('\n').filter(line => line.trim().length > 0);

    // 1. Definition patterns: "X is Y", "X refers to Y"
    const definitionRegex = /^(.+?)\s+(is|means|refers to|defined as)\s+(.+)$/i;

    // 2. Process patterns: "Step 1: ...", "First, ..."
    // const processRegex = /^(step\s+\d+|first|second|third|then|finally)[:\s]\s*(.+)$/i; // Unused

    // 3. Formula patterns: "X = Y"
    const formulaRegex = /^(.+?)\s*=\s*(.+)$/;

    // 4. Date patterns: "In 1990...", "On Jan 1st..."
    const dateRegex = /^(in|on)\s+(\d{4}|[a-zA-Z]+\s+\d{1,2}(st|nd|rd|th)?),?\s*(.+)$/i;

    // 5. Bullet points commonly used for lists - creates a "List" card if context allows, 
    // but for simple key-value, we might treat the bullet as the break.
    // For now, let's treat "Term: Definition" as a strong signal.
    const termDefRegex = /^(.+?):\s+(.+)$/;

    lines.forEach(line => {
        const cleanLine = line.trim();
        if (!cleanLine) return;

        let match;

        // Term: Definition
        if ((match = cleanLine.match(termDefRegex))) {
            cards.push({
                id: uuidv4(),
                front: match[1].trim(),
                back: match[2].trim(),
                type: 'definition',
                confidence: 0.9
            });
            return;
        }

        // Definitions "X is Y"
        if ((match = cleanLine.match(definitionRegex))) {
            // Avoid false positives like "This is good" -> Front: "This", Back: "good"
            if (match[1].split(' ').length < 5) {
                cards.push({
                    id: uuidv4(),
                    front: match[1].trim(),
                    back: match[3].trim(),
                    type: 'definition',
                    confidence: 0.8
                });
                return;
            }
        }

        // Formulas
        if ((match = cleanLine.match(formulaRegex))) {
            // Ensure it contains math-like symbols or is short
            if (cleanLine.includes('+') || cleanLine.includes('-') || cleanLine.includes('*') || cleanLine.includes('/') || cleanLine.length < 50) {
                cards.push({
                    id: uuidv4(),
                    front: match[1].trim(),
                    back: match[2].trim(),
                    type: 'formula',
                    confidence: 0.85
                });
                return;
            }
        }

        // Dates
        if ((match = cleanLine.match(dateRegex))) {
            cards.push({
                id: uuidv4(),
                front: `${match[1]} ${match[2]}`,
                back: match[4].trim(),
                type: 'date',
                confidence: 0.8
            });
            return;
        }

        // Cloze deletions for key terms (bolded text) **term**
        // This is checking within the line
        const clozeRegex = /\*\*(.+?)\*\*/g;
        let clozeMatch;
        while ((clozeMatch = clozeRegex.exec(cleanLine)) !== null) {
            const answer = clozeMatch[1];
            const question = cleanLine.replace(`**${answer}**`, '_____');
            cards.push({
                id: uuidv4(),
                front: question,
                back: answer,
                type: 'general',
                confidence: 0.95
            });
        }
    });

    return cards;
};
