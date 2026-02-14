import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Brain, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <div className="relative overflow-hidden bg-background">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] animate-pulse-soft" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] animate-pulse-soft delay-1000" />
            </div>

            <div className="container px-4 py-20 mx-auto md:py-32">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">

                    {/* Text Content */}
                    <div className="space-y-8 text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm">
                                <Sparkles className="w-4 h-4 mr-2" />
                                <span>AI-Powered Study Companion</span>
                            </div>

                            <h1 className="text-5xl font-extrabold tracking-tight lg:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-secondary animate-gradient-x p-1">
                                Master Any Subject <br /> with FlowState.
                            </h1>

                            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto md:mx-0">
                                Optimize your learning with spaced repetition, focus modes, and smart flashcards. The ultimate tool for students who want to achieve more in less time.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                        >
                            <Button size="lg" className="h-14 px-8 text-lg gap-2 shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all" asChild>
                                <Link to="/decks/create">
                                    Get Started Free <ArrowRight className="w-5 h-5" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="h-14 px-8 text-lg backdrop-blur-sm bg-background/50 hover:bg-background/80" asChild>
                                <Link to="/study">
                                    Try Demo Session
                                </Link>
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="flex items-center justify-center md:justify-start gap-8 pt-8 text-muted-foreground"
                        >
                            <div className="flex items-center gap-2">
                                <Brain className="w-5 h-5 text-primary" />
                                <span>Smart Recall</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="w-5 h-5 text-yellow-500" />
                                <span>Focus Mode</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-purple-500 rounded-full blur-[80px] opacity-20 animate-pulse" />
                        <img
                            src="/images/hero-study.svg"
                            alt="Student Studying"
                            className="relative z-10 w-full h-auto drop-shadow-2xl animate-float"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement!.innerHTML += `
                  <div class="flex items-center justify-center w-full aspect-square bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border-2 border-dashed border-primary/20">
                    <div class="text-center p-8">
                       <p class="text-primary font-bold text-lg mb-2">Illustration Missing</p>
                       <p class="text-muted-foreground text-sm">Please download 'hero-study.svg' to /public/images/</p>
                    </div>
                  </div>
                `;
                            }}
                        />

                        {/* Floating Cards Decor */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -right-6 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-border/50 max-w-[200px]"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
                                <span className="font-bold text-sm">Streak Saved!</span>
                            </div>
                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                <div className="h-full w-[85%] bg-green-500 rounded-full" />
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-10 -left-6 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-border/50"
                        >
                            <div className="flex items-center gap-3">
                                <div className="text-3xl font-bold text-primary">94%</div>
                                <div className="text-xs text-muted-foreground leading-tight">Retention<br />Rate</div>
                            </div>
                        </motion.div>

                    </motion.div>
                </div>
            </div>
        </div>
    );
}
