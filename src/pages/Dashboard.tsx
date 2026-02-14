import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { Play, TrendingUp, Clock, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

// Mock Data for Demo
const studyData = [
    { name: 'Mon', attempts: 24 },
    { name: 'Tue', attempts: 18 },
    { name: 'Wed', attempts: 45 },
    { name: 'Thu', attempts: 32 },
    { name: 'Fri', attempts: 56 },
    { name: 'Sat', attempts: 12 },
    { name: 'Sun', attempts: 0 },
];

export default function Dashboard() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome back, Student</h1>
                    <p className="text-muted-foreground">You have 12 cards due for review today.</p>
                </div>
                <Button size="lg" className="gap-2">
                    <Play className="h-4 w-4" /> Start Review Session
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Cards Due</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">+4 from yesterday</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
                        <TrendingUp className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">84%</div>
                        <p className="text-xs text-muted-foreground">+2% this week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Study Time</CardTitle>
                        <Clock className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2.4h</div>
                        <p className="text-xs text-muted-foreground">Past 7 days</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Streak</CardTitle>
                        <div className="text-xs font-bold text-orange-500">🔥 Day 7</div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">7 Days</div>
                        <p className="text-xs text-muted-foreground">Keep it up!</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Chart */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Study Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={studyData}>
                                <XAxis
                                    dataKey="name"
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value}`}
                                />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="attempts" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Recent Decks */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Decks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {['Computer Science 101', 'Spanish Vocabulary', 'History of Art', 'Physics Formulas'].map((deck, i) => (
                                <div key={i} className="flex items-center">
                                    <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                        {deck[0]}
                                    </div>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">{deck}</p>
                                        <p className="text-sm text-muted-foreground">Due for review</p>
                                    </div>
                                    <div className="ml-auto font-medium text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                                        {10 + i * 5} cards
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full mt-6" asChild>
                            <Link to="/decks">View All Decks</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
