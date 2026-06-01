import { describe, it, expect } from 'vitest';

import { capitalize } from './string';

describe('capitalize', () => {
  // Default behavior
  it('should capitalize the first letter of a string', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('HELLO')).toBe('Hello');
    expect(capitalize('hello world')).toBe('Hello World');
    expect(capitalize('hELLO wORLD')).toBe('Hello World');
  });

  it('should return an empty string if input is empty', () => {
    expect(capitalize('')).toBe('');
  });

  it('should handle single character strings', () => {
    expect(capitalize('a')).toBe('A');
    expect(capitalize('A')).toBe('A');
  });

  it('should handle non-alphabetic characters', () => {
    expect(capitalize('123abc')).toBe('123abc');
    expect(capitalize('@hello')).toBe('@hello');
  });
  // End of default behavior tests

  // Custom split and join
  it('should capitalize words based on custom split and join', () => {
    expect(capitalize('hello-world', { split: '-', join: '-' })).toBe(
      'Hello-World',
    );
    expect(capitalize('hello_world', { split: '_', join: '-' })).toBe(
      'Hello-World',
    );
    expect(capitalize('hello.world', { split: '.' })).toBe('Hello World');
    expect(capitalize('hello world', { join: '_' })).toBe('Hello_World');
  });

  // First character only
  it('should capitalize only the first character when isFirstCharOnly is true', () => {
    expect(capitalize('hello world', { isFirstCharOnly: true })).toBe(
      'Hello world',
    );
    expect(capitalize('hELLO wORLD', { isFirstCharOnly: true })).toBe(
      'Hello world',
    );
  });

  // First character only with custom split and join (should ignore split and join)
  it('should ignore split and join when isFirstCharOnly is true', () => {
    expect(
      capitalize('hello-world', {
        split: '-',
        join: '-',
        isFirstCharOnly: true,
      }),
    ).toBe('Hello-world');
    expect(
      capitalize('hello_world', {
        split: '_',
        join: '-',
        isFirstCharOnly: true,
      }),
    ).toBe('Hello_world');
  });

  // Edge cases
  it('should handle undefined values gracefully', () => {
    expect(capitalize(undefined)).toBe('');
  });
});
