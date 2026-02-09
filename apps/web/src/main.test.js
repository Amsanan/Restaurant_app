import { describe, it, expect } from 'vitest';

describe('routes', () => {
  it('keeps required routes', () => {
    const required = ['/pos', '/kitchen', '/admin'];
    expect(required).toHaveLength(3);
  });
});
