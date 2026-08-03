# Grace Community Church Chatbot

A production-ready, AI-assisted conversational agent for Grace Community Church designed for accessibility, security, and low-latency response scoring. 

📱 **Live Demo & Conference Showcase:** Optimized for quick onboarding with dynamic QR-code routing used for live demos at tech meetups (FaithTech).

---

## Key Engineering & Security Highlights

* **🔒 Database Security & RLS Policies:** Integrated with a Supabase (Postgres) backend configured with strict Row Level Security (RLS) policies. Safely managed runtime environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) using encrypted GitHub Repository Secrets to enforce zero-trust key exposure.
* **♿ Web Accessibility (a11y) & Dark Mode Architecture:** Built a dual-theme UI audited with the **WAVE Evaluation Tool** to guarantee high-contrast WCAG compliance in both light and dark modes. Implemented an anti-flash blocking script in `index.html` to prevent Flash-of-Unstyled-Content (FOUC) prior to React hydration.
* **⚙️ Automated CI/CD & Deployment:** Engineered a modern GitHub Actions pipeline (Node 24) to handle automated dependency mapping, Vite base-path asset resolution for sub-directory hosting, and production build artifact management.
* **💾 Client State & Persistence:** Full chat history and user session logs persist seamlessly to Supabase and reload on client refresh.

---

## Tech Stack

* **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Lucide React
* **Backend & Database:** Supabase (PostgreSQL with RLS), RESTful patterns
* **DevOps & QA:** GitHub Actions, WAVE Evaluation Tool, ESLint

---

## Features & How It Works

* **Algorithmic Keyword Matching:** The engine (`src/lib/chatEngine.ts`) tokenizes input, strips stop words, and scores 30+ knowledge base entries by keyword/question overlap. Offers confidence-based fallback suggestions when input score is low.
* **Conversational Scope:** Handles common visitor inquiries including service times, family programs, pastoral care, and sacraments.
* **Custom Knowledge Base:** Modular configuration via `src/lib/knowledge.ts`.

---

## Local Development & Setup

### Prerequisites
* Node.js 18+
* A Supabase project (free tier)

### Quick Start

1. **Clone & Install Dependencies:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/church-chatbot.git](https://github.com/YOUR_USERNAME/church-chatbot.git)
   cd church-chatbot
   npm install
   
   ```

2. **Configure Environment Variables:**
Create a `.env` file from the template:
```bash
cp .env.example .env

```


Add your Supabase keys:
```env
VITE_SUPABASE_URL=[https://your-project.supabase.co](https://your-project.supabase.co)
VITE_SUPABASE_ANON_KEY=your-anon-key

```


3. **Run Database Migration:**
Execute `supabase/migrations/20260701003543_create_chat_messages_table.sql` in your Supabase SQL Editor to provision the `chat_messages` table and enable Row Level Security.
4. **Launch Dev Server:**
```bash
npm run dev

```



---

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite local development server |
| `npm run build` | Compile production build outputs |
| `npm run typecheck` | Run TypeScript compiler checks |
| `npm run lint` | Execute ESLint code checks |
| `npm run preview` | Locally preview production build |

---

## License

This project is open-source and provided for demonstration and portfolio showcase purposes.

```

```
