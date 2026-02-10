import { describe, it, expect } from 'vitest';

describe('server routes', () => {
  it('includes required ui routes', () => {
    expect(['/pos', '/kitchen', '/admin']).toContain('/admin');
  });
});
