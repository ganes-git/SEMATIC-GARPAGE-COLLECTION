# FlowState - Intelligent Study Session Optimizer

FlowState is a modern, AI-powered study companion designed to help you master any subject using Spaced Repetition (SM-2 Algorithm) and flow-inducing study sessions.

**Built for the 800-person Hackathon. 100% Free Tech Stack.**

![Dashboard](https://plus.unsplash.com/premium_photo-1661331911412-f3275b28d732?q=80&w=2669&auto=format&fit=crop)

## 🚀 Features

- **Smart Card Generator**: Paste raw notes (definitions, formulas, processes) and let our Regex engine auto-generate flashcards.
- **Spaced Repetition**: Proven SM-2 algorithm ensures you review cards at the optimal time to beat the "Forgetting Curve".
- **Flow Study Sessions**: Pomodoro-style timer with "Focus Mode" and immersive card flipping animations.
- **Focus Mode Extension**: Chrome extension that blocks distraction sites (Social Media, Netflix) while you study.
- **Analytics Dashboard**: Visual breakdown of your progress, streak, and mastery.
- **Dark Mode**: Easy on the eyes for late-night cramming.

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui, Framer Motion
- **Backend (Optional)**: Supabase (Auth, Database, Realtime)
- **Local Storage**: Offline-first architecture (Works without internet)
- **Extension**: Chrome Manifest V3

## ⚡ Quick Start (Demo Mode)

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd flowstate
   \`\`\`

2. **Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run Locally**
   \`\`\`bash
   npm run dev
   \`\`\`
   Open \`<http://localhost:5173\`> to see the app.

## 📦 Chrome Extension Setup

1. Open Chrome and navigate to \`chrome://extensions/\`.
2. Toggle **Developer mode** (top right).
3. Click **Load unpacked**.
4. Select the \`extension\` folder in this project directory.
5. The "FlowState Focus" extension is now active!
   - Click the icon to toggle Focus Mode.
   - Try visiting \`youtube.com\` or \`facebook.com\` to see the blocker in action.

## 🗄️ Supabase Setup (Optional for Cloud Sync)

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in dashboard.
3. Paste the contents of \`supabase_schema.sql\` and run it.
4. Copy \`.env.example\` to \`.env\` and fill in your Supabase credentials:
   \`\`\`env
   VITE_SUPABASE_URL=your_url
   VITE_SUPABASE_ANON_KEY=your_key
   \`\`\`

## 🧠 How it Works

### The SM-2 Algorithm

We use a modified SuperMemo-2 algorithm. When you rate a card:

- **Again (1)**: Interval resets to 1 day.
- **Hard (2)**: Interval grows by 1.2x.
- **Good (3)**: Interval grows by 2.5x (default).
- **Easy (4)**: Interval grows by 3.0x.

### Smart Pattern Matching

We scan your text for:

- "Term **is** Definition"
- "Step 1: ..."
- "In [Year]..."
- "**Bold** terms" (Cloze deletion)

## 🤝 Contributing

This is a hackathon project, but PRs are welcome!

1. Fork it
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

---

**License**: MIT
**Author**: Ganesh
