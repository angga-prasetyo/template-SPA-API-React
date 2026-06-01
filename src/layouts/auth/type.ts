import { CTSeoMetaProps } from '@/components/ct-seo-meta/type';

export interface CTLayoutAuthProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title'>,
    CTSeoMetaProps {
  /**
   * To make your logo disappear from the layout.
   *
   * @default
   * false
   */
  isWithoutLogo?: boolean;
  /**
   * Title for the layout.
   */
  title?: string;
  /**
   * Subtitle for the layout. If the value is undefined, it will removed from the DOM.
   */
  subtitle?: string;
  children?: React.ReactNode;
}
