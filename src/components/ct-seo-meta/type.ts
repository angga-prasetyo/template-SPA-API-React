export type CTSeoMetaPropsMeta = {
  /**
   * Determine the title page on the browser tab.
   *
   * @default
   * 'Custom'
   */
  titlePage: string;
  /**
   * Determine the description page on the browser tab.
   *
   * @default
   * 'Custom Dashboard Template for React and written with TypeScript.'
   */
  descriptionPage?: string;
};
export interface CTSeoMetaProps {
  /**
   * Giving a meta data for each pages.
   *
   * Currently, only `titlePage` for **browser tab** that available on the options. If need something more, just add it here.
   */
  meta?: CTSeoMetaPropsMeta;
}
