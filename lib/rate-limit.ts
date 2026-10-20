const MAX_TRACKED_KEYS = 1000;

export function createRateLimiter(limit: number, windowMs: number) {
  const hits = new Map<string, number[]>();

  return function isRateLimited(key: string): boolean {
    const now = Date.now();
    const timestamps = (hits.get(key) ?? []).filter((time) => now - time < windowMs);
    timestamps.push(now);
    hits.set(key, timestamps);

    if (hits.size > MAX_TRACKED_KEYS) {
      for (const [entryKey, times] of hits) {
        if (times.every((time) => now - time >= windowMs)) {
          hits.delete(entryKey);
        }
      }
    }

    return timestamps.length > limit;
  };
}
