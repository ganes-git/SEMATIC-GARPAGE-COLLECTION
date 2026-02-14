import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { Play, TrendingUp, Clock, Calendar, Plus, Crown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getSubjectTheme } from "@/lib/deck-styles";

// Mock Data
const studyData = [
    { name: 'Mon', attempts: 24 },
    { name: 'Tue', attempts: 18 },
    { name: 'Wed', attempts: 45 },
    { name: 'Thu', attempts: 32 },
    { name: 'Fri', attempts: 56 },
    { name: 'Sat', attempts: 12 },
    { name: 'Sun', attempts: 0 },
];

const mockDecks = [
    { name: 'Computer Science 101', count: 45, due: 12 },
    { name: 'Spanish Vocabulary', count: 120, due: 25 },
    { name: 'History of Art', count: 30, due: 5 },
    { name: 'Physics Formulas', count: 15, due: 8 }
];

export default function Dashboard() {
    return (
        <div className="space-y-8">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/10 p-8 md:p-12">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-4 max-w-xl">
                        <div className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                            <Crown className="w-3 h-3 mr-1" /> Premium Member
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                            Ready to get into the <span className="text-primary">Flow?</span>
                        </h1>
                        <p className="text-lg text-muted-foreground text-balance">
                            You have <span className="font-bold text-foreground">12 cards</span> due for review today. Keep your 7-day streak alive!
                        </p>
                        <div className="flex flex-wrap gap-3 pt-2">
                            <Button size="lg" className="shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105" asChild>
                                <Link to="/study"><Play className="h-5 w-5 mr-2" /> Start Session</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="bg-background/50 backdrop-blur-sm" asChild>
                                <Link to="/decks/create"><Plus className="h-5 w-5 mr-2" /> Create Deck</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Illustration */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="hidden md:block w-64 md:w-80"
                    >
                        <img
                            src="/images/welcome-dashboard.svg"
                            alt="Welcome"
                            className="w-full h-auto drop-shadow-2xl animate-float"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement!.classList.add('flex', 'items-center', 'justify-center', 'h-64', 'bg-muted/30', 'rounded-2xl', 'aspect-square');
                                e.currentTarget.parentElement!.innerHTML += `<span class="text-4xl">👋</span>`;
                            }}
                        />
                    </motion.div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: 'Cards Due', value: '12', sub: '+4 from yesterday', icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                    { label: 'Accuracy', value: '84%', sub: '+2% this week', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                    { label: 'Study Time', value: '2.4h', sub: 'Past 7 days', icon: Clock, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                    { label: 'Streak', value: '7 Days', sub: 'Best: 14 days', icon: Crown, color: 'text-orange-500', bg: 'bg-orange-500/10' }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 * i }}
                    >
                        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                                <div className={`p-2 rounded-full ${stat.bg}`}>
                                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground">{stat.sub}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                {/* Chart */}
                <Card className="col-span-4 border-none shadow-md">
                    <CardHeader>
                        <CardTitle>Study Activity</CardTitle>
                        <CardDescription>Your daily focus sessions over the last week</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-0">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={studyData}>
                                <defs>
                                    <linearGradient id="colorAttempts" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="attempts" radius={[8, 8, 0, 0]}>
                                    {studyData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 4 ? "url(#colorAttempts)" : "hsl(var(--muted))"} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Recent Decks */}
                <Card className="col-span-3 border-none shadow-md h-full flex flex-col">
                    <CardHeader>
                        <CardTitle>Recent Decks</CardTitle>
                        <CardDescription>Continue where you left off</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <div className="space-y-4">
                            {mockDecks.map((deck, i) => {
                                const theme = getSubjectTheme(deck.name);
                                const Icon = theme.icon;
                                return (
                                    <div key={i} className="group flex items-center p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${theme.gradient} text-white shadow-md group-hover:scale-110 transition-transform`}>
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <div className="ml-4 space-y-1 flex-1">
                                            <p className="text-sm font-bold leading-none">{deck.name}</p>
                                            <p className="text-xs text-muted-foreground">{deck.due} due • {deck.count} cards</p>
                                        </div>
                                        <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Play className="h-4 w-4" />
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                    <div className="p-6 pt-0 mt-auto">
                        <Button variant="outline" className="w-full gap-2 group" asChild>
                            <Link to="/decks">
                                View All Decks <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
