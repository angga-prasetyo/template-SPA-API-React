import { type InputProps } from "antd";

export interface CTDebouncedSearchProps extends InputProps {
  customSearchParams?: string;
  delayTime?: number;
  enableSearchParams?: boolean;
  onFinishDebounce?: (keyword: string) => void;
  onSearching?: (isSearching: boolean) => void;
  width?: string;
}
