import { describe, expect, it } from 'vitest';

import { isPending, pendingHint } from './pending';

describe('isPending', () => {
  it('detects a marker that is the whole value', () => {
    expect(isPending('[[TODO: retail locations delivered]]')).toBe(true);
    expect(isPending('  [[TODO: with surrounding space]]  ')).toBe(true);
    expect(isPending('')).toBe(true);
  });

  it('does not detect a marker embedded in a sentence', () => {
    // The rule AGENTS.md states: a partial marker would leak its brackets to production,
    // so such a string must be split into two keys instead.
    expect(isPending('We delivered [[TODO: n]] stores')).toBe(false);
  });

  it('leaves real content alone', () => {
    expect(isPending('42 locations')).toBe(false);
  });
});

describe('pendingHint', () => {
  it('returns what we still owe the client', () => {
    expect(pendingHint('[[TODO: largest facility in m²]]')).toBe('largest facility in m²');
    expect(pendingHint('38,000 m²')).toBe('');
  });
});
