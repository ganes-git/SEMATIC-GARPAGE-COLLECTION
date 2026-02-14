import { Calculator, Beaker, Landmark, Languages, Monitor, BookOpen } from 'lucide-react';

export type SubjectTheme = {
    gradient: string;
    icon: any;
    text: string;
    bg: string;
    ring: string;
};

export const getSubjectTheme = (subject: string): SubjectTheme => {
    const normalized = subject.toLowerCase();

    if (normalized.includes('math') || normalized.includes('calculus') || normalized.includes('algebra')) {
        return {
            gradient: 'from-blue-500 to-cyan-500',
            icon: Calculator,
            text: 'text-blue-600 dark:text-blue-400',
            bg: 'bg-blue-50 dark:bg-blue-950/30',
            ring: 'ring-blue-500/20'
        };
    }

    if (normalized.includes('sci') || normalized.includes('physics') || normalized.includes('chem') || normalized.includes('bio')) {
        return {
            gradient: 'from-emerald-500 to-teal-500',
            icon: Beaker,
            text: 'text-emerald-600 dark:text-emerald-400',
            bg: 'bg-emerald-50 dark:bg-emerald-950/30',
            ring: 'ring-emerald-500/20'
        };
    }

    if (normalized.includes('hist') || normalized.includes('art') || normalized.includes('social')) {
        return {
            gradient: 'from-orange-500 to-amber-500',
            icon: Landmark,
            text: 'text-orange-600 dark:text-orange-400',
            bg: 'bg-orange-50 dark:bg-orange-950/30',
            ring: 'ring-orange-500/20'
        };
    }

    if (normalized.includes('lang') || normalized.includes('spanish') || normalized.includes('english') || normalized.includes('french')) {
        return {
            gradient: 'from-purple-500 to-pink-500',
            icon: Languages,
            text: 'text-purple-600 dark:text-purple-400',
            bg: 'bg-purple-50 dark:bg-purple-950/30',
            ring: 'ring-purple-500/20'
        };
    }

    if (normalized.includes('comp') || normalized.includes('code') || normalized.includes('programming')) {
        return {
            gradient: 'from-indigo-500 to-violet-500',
            icon: Monitor,
            text: 'text-indigo-600 dark:text-indigo-400',
            bg: 'bg-indigo-50 dark:bg-indigo-950/30',
            ring: 'ring-indigo-500/20'
        };
    }

    // Default
    return {
        gradient: 'from-slate-500 to-gray-500',
        icon: BookOpen,
        text: 'text-slate-600 dark:text-slate-400',
        bg: 'bg-slate-50 dark:bg-slate-950/30',
        ring: 'ring-slate-500/20'
    };
};
