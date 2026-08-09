import { useEffect } from 'react';

/**
 * Performance monitoring hook.
 * Logs a warning to console if a component/effect takes longer than the threshold (default 100ms).
 *
 * Usage:
 * function MyComponent() {
 *   usePerformance('MyComponent render', 50); // Warn if render takes > 50ms
 *   return <div>...</div>;
 * }
 */
export function usePerformance(label: string, warningThresholdMs: number = 100) {
  useEffect(() => {
    const start = performance.now();
    return () => {
      const duration = performance.now() - start;
      if (duration > warningThresholdMs) {
        console.warn(`⚠️ [Performance] ${label} took ${duration.toFixed(0)}ms (threshold: ${warningThresholdMs}ms)`);
      }
    };
  }, [label, warningThresholdMs]);
}
