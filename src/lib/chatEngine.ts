import { getCachedKnowledgeBase, loadKnowledgeBase } from './knowledgeLoader';
import type { KnowledgeEntry } from './knowledge';

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'do', 'does', 'did', 'doing', 'have', 'has', 'had', 'having',
  'i', 'me', 'my', 'we', 'our', 'you', 'your', 'he', 'she', 'it', 'they', 'their',
  'to', 'of', 'in', 'on', 'at', 'for', 'with', 'about', 'as', 'by',
  'and', 'or', 'but', 'if', 'then', 'so', 'because', 'than',
  'this', 'that', 'these', 'those', 'there', 'here',
  'can', 'could', 'would', 'should', 'will', 'would', 'may', 'might', 'must',
  'what', 'when', 'where', 'why', 'how', 'who', 'which',
  'from', 'into', 'out', 'up', 'down', 'over', 'under', 'again',
  'just', 'also', 'too', 'very', 'really', 'much', 'many', 'some', 'any',
]);

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(text: string): string[] {
  return normalize(text)
    .split(' ')
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t));
}

function scoreEntry(query: string, entry: KnowledgeEntry): number {
  const normalizedQuery = normalize(query);
  const tokens = tokenize(query);
  let score = 0;

  for (const keyword of entry.keywords) {
    const kw = keyword.toLowerCase();
    if (normalizedQuery.includes(kw)) {
      score += kw.split(' ').length * 3;
    }
  }

  for (const token of tokens) {
    for (const keyword of entry.keywords) {
      const kw = keyword.toLowerCase();
      if (kw === token) {
        score += 4;
      } else if (kw.includes(token) || token.includes(kw)) {
        score += 1;
      }
    }
  }

  const questionTokens = tokenize(entry.question);
  const sharedTokens = tokens.filter((t) => questionTokens.includes(t));
  score += sharedTokens.length * 2;

  return score;
}

export interface ChatResponse {
  answer: string;
  matchedEntry: KnowledgeEntry | null;
  confidence: number;
}

/**
 * Get bot response for a user message.
 * Uses the lazy-loaded knowledge base (must be loaded via loadKnowledgeBase first).
 */
export function getBotResponse(userMessage: string): ChatResponse {
  const knowledgeBase = getCachedKnowledgeBase();

  if (!knowledgeBase) {
    return {
      answer:
        "I'm starting up. Please try your question again in a moment!",
      matchedEntry: null,
      confidence: 0,
    };
  }

  const scored = knowledgeBase
    .map((entry) => ({ entry, score: scoreEntry(userMessage, entry) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return {
      answer:
        "That's a great question! I'm not sure I have the right answer for that, but I'd love to help. You can reach our church office at (319) 555-0142 or hello@gracecommunity.org, and someone from our team will be happy to assist!",
      matchedEntry: null,
      confidence: 0,
    };
  }

  const best = scored[0];
  const confidence = best.score / (scored[0].score + (scored[1]?.score ?? 0) + 0.001);

  if (confidence < 0.35 && scored.length > 1) {
    const topThree = scored.slice(0, 3);
    const suggestions = topThree.map((s) => s.entry.question);
    return {
      answer:
        "I want to make sure I give you the right answer. Were you asking about any of these?\n\n" +
        suggestions.map((s, i) => `${i + 1}. ${s}`).join('\n') +
        "\n\nIf not, please call our office at (319) 555-0142 or email hello@gracecommunity.org — we'd love to help!",
      matchedEntry: best.entry,
      confidence,
    };
  }

  return {
    answer: best.entry.answer,
    matchedEntry: best.entry,
    confidence,
  };
}

// Export the knowledge base loader for initialization
export { loadKnowledgeBase };
