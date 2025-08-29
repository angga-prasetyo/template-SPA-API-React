type TCapitalizeOptions =
  | { split?: string; join?: string; isFirstCharOnly?: boolean }
  | undefined
  | null;

const capitalizeFirstChar = (value = '') => {
  return value?.charAt(0)?.toUpperCase() + value?.slice(1)?.toLowerCase();
};

export const capitalize = (
  value = '',
  options?: TCapitalizeOptions
): string => {
  const { split = ' ', join = ' ', isFirstCharOnly = false } = options || {};

  if (isFirstCharOnly) return capitalizeFirstChar(value);
  return value?.split(split)?.map(capitalizeFirstChar)?.join(join);
};
