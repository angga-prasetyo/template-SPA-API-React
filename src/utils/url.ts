import qs, { type StringifyOptions, type ParseOptions } from 'query-string';

export const paramStringify = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  object: Record<string, any>,
  options?: StringifyOptions | undefined
) =>
  qs.stringify(object, {
    skipEmptyString: true,
    skipNull: true,
    arrayFormat: 'comma',
    ...options,
  });

export const paramParsify = (query: string, options?: ParseOptions) =>
  qs.parse(query, {
    parseBooleans: true,
    arrayFormat: 'comma',
    ...options,
  });

export const generateUrlWithParams = (
  pathname: string,
  stringifiedParams: string
) => `${pathname}${stringifiedParams ? `?${stringifiedParams}` : ''}`;
