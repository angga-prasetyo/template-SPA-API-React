import { describe, it, expect } from 'vitest';

import { paramStringify, paramParsify, generateUrlWithParams } from './url';

// ─── paramStringify ───────────────────────────────────────
describe('paramStringify', () => {
  describe('default behavior', () => {
    it('stringifies a plain object', () => {
      expect(paramStringify({ name: 'john', age: 20 })).toBe(
        'age=20&name=john',
      );
    });

    it('skips null values by default', () => {
      expect(paramStringify({ name: 'john', age: null })).toBe('name=john');
    });

    it('skips undefined values by default', () => {
      expect(paramStringify({ name: 'john', age: undefined })).toBe(
        'name=john',
      );
    });

    it('skips empty strings by default', () => {
      expect(paramStringify({ name: 'john', city: '' })).toBe('name=john');
    });

    it('skips both null and empty string values', () => {
      expect(paramStringify({ name: 'john', age: null, city: '' })).toBe(
        'name=john',
      );
    });

    it('does not skip falsy value 0', () => {
      expect(paramStringify({ name: 'john', page: 0 })).toBe(
        'name=john&page=0',
      );
    });

    it('does not skip falsy value false', () => {
      expect(paramStringify({ name: 'john', active: false })).toBe(
        'active=false&name=john',
      );
    });

    it('stringifies number and boolean values', () => {
      expect(paramStringify({ page: 1, active: true })).toBe(
        'active=true&page=1',
      );
    });

    it('joins arrays with comma by default', () => {
      expect(paramStringify({ tags: ['foo', 'bar', 'foobar'] })).toBe(
        'tags=foo,bar,foobar',
      );
    });

    it('returns empty string for empty object', () => {
      expect(paramStringify({})).toBe('');
    });

    it('returns empty string when all values are null or empty', () => {
      expect(paramStringify({ a: null, b: '' })).toBe('');
    });
  });

  describe('override options', () => {
    it('overrides skipNull to false', () => {
      expect(
        paramStringify({ name: 'john', age: null }, { skipNull: false }),
      ).toBe('age&name=john');
    });

    it('overrides skipEmptyString to false', () => {
      expect(
        paramStringify({ name: 'john', city: '' }, { skipEmptyString: false }),
      ).toBe('city=&name=john');
    });

    it('overrides arrayFormat to bracket', () => {
      expect(
        paramStringify({ tags: ['foo', 'bar'] }, { arrayFormat: 'bracket' }),
      ).toBe('tags[]=foo&tags[]=bar');
    });

    it('overrides arrayFormat to index', () => {
      expect(
        paramStringify({ tags: ['foo', 'bar'] }, { arrayFormat: 'index' }),
      ).toBe('tags[0]=foo&tags[1]=bar');
    });

    it('overrides arrayFormat to none', () => {
      expect(
        paramStringify({ tags: ['foo', 'bar'] }, { arrayFormat: 'none' }),
      ).toBe('tags=foo&tags=bar');
    });
  });
});

// ─── paramParsify ─────────────────────────────────────────
describe('paramParsify', () => {
  describe('default behavior', () => {
    it('parses a plain query string', () => {
      expect(paramParsify('name=john&age=20')).toEqual({
        name: 'john',
        age: '20',
      });
    });

    it('parses boolean strings into booleans', () => {
      expect(paramParsify('active=true&verified=false')).toEqual({
        active: true,
        verified: false,
      });
    });

    it('parses comma-separated values into arrays', () => {
      expect(paramParsify('tags=foo,bar,foobar')).toEqual({
        tags: ['foo', 'bar', 'foobar'],
      });
    });

    it('returns empty object for empty query string', () => {
      expect(paramParsify('')).toEqual({});
    });

    it('returns single value as string, not array', () => {
      expect(paramParsify('tags=foo')).toEqual({ tags: 'foo' });
    });

    it('parses numeric strings as strings, not numbers', () => {
      expect(paramParsify('age=20')).toEqual({ age: '20' });
    });
  });

  describe('override options', () => {
    it('overrides parseBooleans to false', () => {
      expect(paramParsify('active=true', { parseBooleans: false })).toEqual({
        active: 'true',
      });
    });

    it('overrides arrayFormat to bracket', () => {
      expect(
        paramParsify('tags[]=foo&tags[]=bar', { arrayFormat: 'bracket' }),
      ).toEqual({ tags: ['foo', 'bar'] });
    });

    it('overrides arrayFormat to index', () => {
      expect(
        paramParsify('tags[0]=foo&tags[1]=bar', { arrayFormat: 'index' }),
      ).toEqual({ tags: ['foo', 'bar'] });
    });

    it('overrides arrayFormat to none', () => {
      expect(
        paramParsify('tags=foo&tags=bar', { arrayFormat: 'none' }),
      ).toEqual({ tags: ['foo', 'bar'] });
    });
  });
});

// ─── roundtrip ────────────────────────────────────────────
describe('paramStringify + paramParsify roundtrip', () => {
  it('plain object survives stringify then parsify', () => {
    const original = { name: 'john', active: 'true' };
    const stringified = paramStringify(original);
    const parsed = paramParsify(stringified);
    expect(parsed).toEqual({ name: 'john', active: true });
  });

  it('array survives stringify then parsify', () => {
    const stringified = paramStringify({ tags: ['foo', 'bar', 'foobar'] });
    const parsed = paramParsify(stringified);
    expect(parsed).toEqual({ tags: ['foo', 'bar', 'foobar'] });
  });

  it('null and empty values are dropped after roundtrip', () => {
    const stringified = paramStringify({ name: 'john', age: null, city: '' });
    const parsed = paramParsify(stringified);
    expect(parsed).toEqual({ name: 'john' });
  });
});

// ─── generateUrlWithParams ────────────────────────────────
describe('generateUrlWithParams', () => {
  it('appends params to pathname with ?', () => {
    expect(generateUrlWithParams('/users', 'name=john')).toBe(
      '/users?name=john',
    );
  });

  it('returns pathname only when params is empty', () => {
    expect(generateUrlWithParams('/users', '')).toBe('/users');
  });

  it('handles pathname with trailing slash', () => {
    expect(generateUrlWithParams('/users/', 'name=john')).toBe(
      '/users/?name=john',
    );
  });

  it('handles root pathname', () => {
    expect(generateUrlWithParams('/', 'name=john')).toBe('/?name=john');
  });

  it('handles empty pathname', () => {
    expect(generateUrlWithParams('', 'name=john')).toBe('?name=john');
  });

  it('returns empty string when both pathname and params are empty', () => {
    expect(generateUrlWithParams('', '')).toBe('');
  });
});
