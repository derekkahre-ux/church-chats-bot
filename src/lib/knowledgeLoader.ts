import type { KnowledgeEntry } from './knowledge';

let cachedKnowledge: KnowledgeEntry[] | null = null;

/**
 * Lazy-loads the knowledge base on first use.
 * Subsequent calls return the cached version.
 * This defers bundle loading until the chat engine is actually needed.
 */
export async function loadKnowledgeBase(): Promise<KnowledgeEntry[]> {
  if (cachedKnowledge) {
    return cachedKnowledge;
  }

  const module = await import('./knowledge');
  cachedKnowledge = module.knowledgeBase;
  return cachedKnowledge;
}

/**
 * Synchronous getter for already-loaded knowledge base.
 * Only safe to use after loadKnowledgeBase() has been called.
 */
export function getCachedKnowledgeBase(): KnowledgeEntry[] | null {
  return cachedKnowledge;
}
