import { useCallback, useMemo } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDebounceCallback } from 'usehooks-ts';

import { generateUrlWithParams, paramParsify, paramStringify } from '@/utils';

import { type CTDebouncedSearchProps } from './types';

const CTDebouncedSearch: React.FC<CTDebouncedSearchProps> = ({
  customSearchParams,
  delayTime = 500,
  enableSearchParams = true,
  onFinishDebounce,
  onSearching,
  width = '100%',
  ...antdInputProps
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const parsed = useMemo(() => paramParsify(location?.search), [location]);
  const defaultKeyword = useMemo(
    () => String(parsed?.[customSearchParams ?? 'search'] ?? ''),
    [customSearchParams, parsed]
  );

  const debounced = useDebounceCallback((val) => {
    if (enableSearchParams) {
      const stringified = paramStringify({
        ...parsed,
        [customSearchParams ?? 'search']: val,
      });
      navigate(generateUrlWithParams(location?.pathname, stringified), {
        state: location?.state,
      });
    }

    onFinishDebounce?.(val);
    onSearching?.(false);
  }, delayTime);

  const handleOnChangeInput = useCallback(
    (value: string) => {
      onSearching?.(true);
      debounced(value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [parsed]
  );

  return (
    <Input
      allowClear
      size="large"
      placeholder="Search..."
      prefix={<SearchOutlined />}
      defaultValue={defaultKeyword}
      onChange={({ target: { value } }) => handleOnChangeInput(value)}
      style={{ width }}
      {...antdInputProps}
    />
  );
};

export default CTDebouncedSearch;
