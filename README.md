# Grace Community Church Chatbot

A friendly chatbot for Grace Community Church that answers common visitor questions about service times, location, children's programs, prayer requests, and more. Built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

* **Conversational Q&A** — 30+ knowledge entries covering services, visits, family programs, pastoral care, sacraments, outreach, and more.
* **Chat persistence** — every conversation is saved to Supabase and reloads on page refresh.
* **Quick questions** — clickable suggestions for common queries.
* **Responsive design** — works on mobile and desktop with a warm, church-themed UI.

## Tech Stack

* **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Lucide React icons
* **Backend:** Supabase (Postgres database with Row Level Security)

## Getting Started

### Prerequisites

* Node.js 18+
* A Supabase project (free tier works fine)

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/YOUR_USERNAME/church-chatbot.git](https://github.com/YOUR_USERNAME/church-chatbot.git)
   cd church-chatbot

```

2. Install dependencies:
```bash
npm install

```


3. Create a `.env` file based on the example:
```bash
cp .env.example .env

```


4. Then fill in your Supabase project URL and anon key:
```env
VITE_SUPABASE_URL=[https://your-project.supabase.co](https://your-project.supabase.co)
VITE_SUPABASE_ANON_KEY=your-anon-key

```


5. Run the database migration. In your Supabase SQL editor, run the contents of `supabase/migrations/20260701003543_create_chat_messages_table.sql`. This creates the `chat_messages` table with Row Level Security enabled.
6. Start the dev server:
```bash
npm run dev

```



## Customizing the Knowledge Base

The chatbot's answers are defined in `src/lib/knowledge.ts`. Each entry has keywords, a question, an answer, and a category. To add or modify answers, edit the `knowledgeBase` array in that file. The church's contact info and tagline are in the `CHURCH_INFO` object at the top of the same file.

## How It Works

* When a user sends a message, the chat engine (`src/lib/chatEngine.ts`) tokenizes the input, removes stop words, and scores each knowledge entry by keyword and question overlap.
* The best-scoring entry's answer is returned. If confidence is low, the bot offers the closest matches as suggestions instead of guessing.
* Both user and bot messages are persisted to the `chat_messages` table in Supabase, and prior history loads on page refresh.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Build for production |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build |

## License

This project is provided as-is for demonstration purposes.

---

## 🛠️ DevOps & Deployment Optimization (July 2026 Update)

Successfully modernized, debugged, and deployed this application to a production-ready cloud hosting environment using modern CI/CD patterns.

### Technical Engineering Accomplishments:
Automated CI/CD Pipeline Architecture: Formulated a custom GitHub Actions workflow (deploy.yml) utilizing Node 24 to manage background environment builds, automated dependency mapping, and artifact hosting on every codebase push.

**Production Build Debugging & Integrity Auditing:** Resolved strict deployment configuration compilation errors (exit code 1 and JSONParseError) by auditing and restructuring structural constraints inside package.json and asset paths within vite.config.ts.

**Tailwind Theme Architecture & State Persistence Engineering:** Implemented a full-stack client-side dark mode system by enabling class-based theme switching in tailwind.config.js and auditing the global UI layer to map dark: variant classes across all components. Solved potential "flash-of-unstyled-content" (FOUC) layout bugs by embedding a blocking anti-flash script directly in index.html to inject the theme state before React mounts, managing the final UI layer state with a custom useTheme React hook linked to localStorage.

**Version Control Audit & Codebase Restructuring:** Successfully diagnosed and resolved a Git state regression issue where automatic platform syncs rolled back configuration and layout files (tailwind.config.js, src/App.tsx). Audited the active codebase, manually re-applied the theme layer architectures, and validated the local production build outputs to verify compiled .dark CSS selector integrity.

**Sub-directory Routing & Theme Asset Resolution:** Diagnosed and corrected absolute vs. relative routing path errors (404 asset failures) by mapping Vite's base directory parameter to align precisely with GitHub's sub-domain layout structure (/church-chat-bot/), ensuring smooth deployment of responsive layouts and dark-mode styles.

**Secure Environment Secret Management:** Safely migrated the pipeline build process to an active production cloud database configuration on Supabase. Securely mapped private runtime tokens (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY) by injecting encrypted environment keys straight into GitHub Repository Secrets, ensuring Zero-Trust visibility for client API data.

## ✨ Key Improvements

* **Database State & RLS Security:** Conversation logs persist across page refreshes via Supabase. Built with configured Row Level Security (RLS) policies using publishable environment keys to ensure safe client access while giving admins visibility into message logs via the Supabase dashboard.
* **Accessibility (a11y) & Dark Mode:** Equipped with a light/dark mode switch. audited with the **WAVE Evaluation Tool** to ensure high-contrast compliance for text and UI elements in both color schemes.
* **Live Demo Ready:** Streamlined layout tested for instant access via scanned QR codes at conferences and public meetups.
