import { useEffect, useRef, useState, useCallback, Suspense } from 'react';
import {
  Send,
  Church,
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
  RefreshCw,
  Heart,
  Users,
  BookOpen,
  HandHeart,
  Sun,
  Moon,
  type LucideIcon,
} from 'lucide-react';
import { supabase, type ChatMessage, type ChatRole } from './lib/supabase';
import { getBotResponse, loadKnowledgeBase } from './lib/chatEngine';
import { CHURCH_INFO, SUGGESTED_QUESTIONS } from './lib/knowledge';
import { usePerformance } from './hooks/usePerformance';

interface DisplayMessage {
  id: string;
  role: ChatRole;
  content: string;
  created_at: string;
  pending?: boolean;
}

const WELCOME_MESSAGE: DisplayMessage = {
  id: 'welcome',
  role: 'bot',
  content:
    "Welcome to Grace Community Church! I'm here to answer your questions about our services, programs, and how we can support you. How can I help you today?",
  created_at: new Date().toISOString(),
};

const PAGE_SIZE = 10; // Paginate message history

function formatTime(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

type Theme = 'light' | 'dark';

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document !== 'undefined' && document.documentElement.classList.contains('dark')) {
      return 'dark';
    }
    return 'light';
  });

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      const root = document.documentElement;
      if (next === 'dark') root.classList.add('dark');
      else root.classList.remove('dark');
      try {
        localStorage.setItem('theme', next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}

function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="relative inline-flex h-9 w-16 items-center rounded-full bg-stone-700/60 ring-1 ring-stone-500/40 px-1 transition-colors dark:bg-stone-200/15 dark:ring-stone-400/30"
      role="switch"
      aria-checked={theme === 'dark'}
      aria-label="Toggle dark mode"
    >
      <span
        className={`flex h-7 w-7 transform items-center justify-center rounded-full bg-white text-amber-500 shadow transition-transform duration-300 dark:bg-amber-400 dark:text-stone-900 ${
          theme === 'dark' ? 'translate-x-7' : 'translate-x-0'
        }`}
      >
        {theme === 'dark' ? <Moon className="h-4 w-4" strokeWidth={2} /> : <Sun className="h-4 w-4" strokeWidth={2} />}
      </span>
    </button>
  );
}

function App() {
  usePerformance('App initialization');

  const { theme, toggleTheme } = useTheme();
  const [messages, setMessages] = useState<DisplayMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const knowledgeBaseLoadedRef = useRef(false);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  // Initialize knowledge base on mount
  useEffect(() => {
    if (!knowledgeBaseLoadedRef.current) {
      knowledgeBaseLoadedRef.current = true;
      loadKnowledgeBase().catch((err) => {
        console.error('Failed to load knowledge base:', err);
      });
    }
  }, []);

  // Load chat history from Supabase
  useEffect(() => {
    let cancelled = false;

    async function loadHistory() {
      try {
        const { data, error: queryError } = await supabase
          .from('Inquiries')
          .select('id, role, content, created_at')
          .order('created_at', { ascending: false })
          .limit(PAGE_SIZE);

        if (cancelled) return;

        if (queryError) throw queryError;

        if (data && data.length > 0) {
          const history: DisplayMessage[] = (data as ChatMessage[])
            .reverse()
            .map((m) => ({
              id: m.id,
              role: m.role,
              content: m.content,
              created_at: m.created_at,
            }));
          setMessages([WELCOME_MESSAGE, ...history]);
        }
      } catch (err) {
        console.error('Failed to load chat history:', err);
        if (!cancelled) setError('Unable to load chat history. New messages will still work.');
      } finally {
        if (!cancelled) setLoadingHistory(false);
      }
    }

    loadHistory();
    return () => {
      cancelled = true;
    };
  }, []);

  const persistMessage = useCallback(
    async (role: ChatRole, content: string): Promise<string | null> => {
      try {
        const { data, error: insertError } = await supabase
          .from('Inquiries')
          .insert({ role, content })
          .select('id, created_at')
          .single();

        if (insertError) throw insertError;
        return data?.id ?? null;
      } catch (err) {
        console.error('Failed to persist message:', err);
        return null;
      }
    },
    [],
  );

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      const userMessage: DisplayMessage = {
        id: `temp-${Date.now()}`,
        role: 'user',
        content: trimmed,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setIsTyping(true);
      setError(null);

      const response = getBotResponse(trimmed);

      const typingDelay = Math.min(1200, 500 + response.answer.length * 4);
      await new Promise((resolve) => setTimeout(resolve, typingDelay));

      const botId = `temp-bot-${Date.now()}`;
      const botMessage: DisplayMessage = {
        id: botId,
        role: 'bot',
        content: response.answer,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);

      persistMessage('user', trimmed);
      persistMessage('bot', response.answer);
    },
    [isTyping, persistMessage],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestion = (question: string) => {
    sendMessage(question);
    inputRef.current?.focus();
  };

  const handleClearChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setInput('');
    setError(null);
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 dark:bg-stone-950 dark:text-stone-100 flex flex-col transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-gradient-to-r from-stone-800 to-stone-900 text-stone-50 dark:from-stone-900 dark:to-black dark:border-b dark:border-stone-800 shadow-lg transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-amber-100/10 ring-1 ring-amber-200/30 flex items-center justify-center shrink-0">
              <Church className="w-6 h-6 text-amber-300" strokeWidth={1.75} />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-semibold tracking-tight truncate">
                {CHURCH_INFO.name}
              </h1>
              <p className="text-xs sm:text-sm text-stone-300 truncate">
                {CHURCH_INFO.tagline}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <button
              onClick={handleClearChat}
              className="hidden sm:inline-flex items-center gap-2 text-sm text-stone-300 hover:text-amber-300 transition-colors px-3 py-1.5 rounded-full hover:bg-white/5"
            >
              <RefreshCw className="w-4 h-4" strokeWidth={1.75} />
              New chat
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 flex-1">
          {/* Chat panel */}
          <section className="flex flex-col bg-white dark:bg-stone-900 rounded-2xl shadow-sm ring-1 ring-stone-200/70 dark:ring-stone-800 overflow-hidden min-h-[60vh] lg:min-h-[calc(100vh-220px)] transition-colors duration-300">
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-5 bg-stone-50/50 dark:bg-stone-900/50 transition-colors duration-300"
            >
              {loadingHistory && (
                <div className="flex items-center justify-center gap-2 text-stone-600 dark:text-stone-300 text-sm py-8">
                  <RefreshCw className="w-4 h-4 animate-spin" strokeWidth={1.75} />
                  Loading conversation…
                </div>
              )}

              {!loadingHistory &&
                messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}

              {isTyping && <TypingIndicator />}
            </div>

            {/* Input */}
            <div className="border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-4 sm:px-6 py-4 transition-colors duration-300">
              {error && (
                <p className="text-xs text-amber-700 bg-amber-50 ring-1 ring-amber-200 rounded-lg px-3 py-2 mb-3">
                  {error}
                </p>
              )}
              <form onSubmit={handleSubmit} className="flex items-end gap-2 sm:gap-3">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about service times, location, prayer requests…"
                    className="w-full rounded-full border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 px-5 py-3 pr-12 text-sm text-stone-800 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                    disabled={isTyping}
                    aria-label="Type your question"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-md hover:shadow-lg hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" strokeWidth={1.75} />
                </button>
              </form>
              <p className="text-xs text-stone-600 dark:text-stone-300 mt-2 text-center">
                This assistant can help with common questions. For urgent pastoral care, call{' '}
                <a 
                  href="tel:3195550142" 
                  className="font-semibold text-amber-700 dark:text-amber-400 underline underline-offset-2 hover:text-amber-800"
                >
                  (319) 555-0142
                </a>.
              </p>
            </div>
          </section>

          {/* Sidebar */}
          <aside className="space-y-4">
            {/* Quick questions */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-sm ring-1 ring-stone-200/70 dark:ring-stone-800 p-5 transition-colors duration-300">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-amber-500" strokeWidth={1.75} />
                <h2 className="text-sm font-semibold text-stone-700 dark:text-stone-200">Quick questions</h2>
              </div>
              <div className="flex flex-col gap-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSuggestion(q)}
                    disabled={isTyping}
                    className="text-left text-sm text-stone-600 dark:text-stone-300 px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:text-amber-700 dark:hover:text-amber-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Church info card */}
            <div className="bg-gradient-to-br from-stone-800 to-stone-900 dark:from-stone-900 dark:to-black text-stone-100 dark:text-stone-200 rounded-2xl shadow-md p-5 ring-1 ring-stone-800 dark:ring-stone-700 transition-colors duration-300">
              <h2 className="text-sm font-semibold text-amber-300 mb-4 flex items-center gap-2">
                <Church className="w-4 h-4" strokeWidth={1.75} />
                Visit us
              </h2>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-300/80 mt-0.5 shrink-0" strokeWidth={1.75} />
                  <span className="text-stone-200">{CHURCH_INFO.address}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-amber-300/80 mt-0.5 shrink-0" strokeWidth={1.75} />
                  <span className="text-stone-200">
                    Sundays 9:00 & 11:00 AM
                    <br />
                    Wednesdays 7:00 PM
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-amber-300/80 mt-0.5 shrink-0" strokeWidth={1.75} />
                  <a
                    href={`tel:${CHURCH_INFO.phone.replace(/[^0-9]/g, '')}`}
                    className="text-stone-200 hover:text-amber-300 transition"
                  >
                    {CHURCH_INFO.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-amber-300/80 mt-0.5 shrink-0" strokeWidth={1.75} />
                  <a
                    href={`mailto:${CHURCH_INFO.email}`}
                    className="text-stone-200 hover:text-amber-300 transition break-all"
                  >
                    {CHURCH_INFO.email}
                  </a>
                </li>
              </ul>
            </div>

            {/* Ministry highlights */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-sm ring-1 ring-stone-200/70 dark:ring-stone-800 p-5 transition-colors duration-300">
              <h2 className="text-sm font-semibold text-stone-700 dark:text-stone-200 mb-3">Our ministries</h2>
              <div className="grid grid-cols-2 gap-3">
                <MinistryTile icon={Users} label="Youth & Kids" />
                <MinistryTile icon={BookOpen} label="Bible Studies" />
                <MinistryTile icon={HandHeart} label="Prayer Team" />
                <MinistryTile icon={Heart} label="Outreach" />
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 text-center text-xs text-stone-600 dark:text-stone-400">
          {CHURCH_INFO.name} &middot; {CHURCH_INFO.tagline}
        </div>
      </footer>
    </div>
  );
}

function MessageBubble({ message }: { message: DisplayMessage }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ring-1 ${
          isUser
            ? 'bg-stone-700 ring-stone-600'
            : 'bg-gradient-to-br from-amber-400 to-amber-600 ring-amber-300/50'
        }`}
      >
        {isUser ? (
          <span className="text-xs font-semibold text-white">You</span>
        ) : (
          <Church className="w-5 h-5 text-white" strokeWidth={1.75} />
        )}
      </div>
      <div className={`flex flex-col max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words ${
            isUser
              ? 'bg-stone-700 text-stone-50 rounded-tr-sm'
              : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-100 ring-1 ring-stone-200 dark:ring-stone-700 rounded-tl-sm shadow-sm'
          }`}
        >
          {message.content}
        </div>
        <span className="text-xs text-stone-600 dark:text-stone-400 mt-1 px-1 font-normal tracking-wide">
          {formatTime(message.created_at)}
        </span>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3 flex-row">
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shrink-0 ring-1 ring-amber-300/50">
        <Church className="w-5 h-5 text-white" strokeWidth={1.75} />
      </div>
      <div className="flex items-center gap-1.5 px-4 py-3.5 rounded-2xl rounded-tl-sm bg-white dark:bg-stone-800 ring-1 ring-stone-200 dark:ring-stone-700 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}

function MinistryTile({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-stone-50 dark:bg-stone-800 ring-1 ring-stone-200/60 dark:ring-stone-700/60 text-center transition-colors duration-300">
      <Icon className="w-5 h-5 text-amber-600" strokeWidth={1.75} />
      <span className="text-xs font-medium text-stone-600 dark:text-stone-300">{label}</span>
    </div>
  );
}

export default App;
