import { ThemeConfig } from 'antd';

import { ctColorNeutral, ctColorPrimary } from '@/constants/colors';

export const antdTheme: (isDarkMode: boolean) => ThemeConfig = (isDarkMode) => {
  const borderRadius = 8;
  const headerBg = isDarkMode ? ctColorNeutral[5] : ctColorNeutral[0];
  const bodyBg = isDarkMode ? ctColorNeutral[4] : ctColorNeutral[1];
  const colorText = isDarkMode ? ctColorNeutral[0] : ctColorNeutral.main;
  const tableHeaderBg = isDarkMode ? ctColorPrimary[4] : ctColorPrimary[2];
  return {
    components: {
      Layout: {
        headerBg,
        siderBg: headerBg,
        bodyBg,
        triggerBg: 'transparent',
        triggerColor: ctColorNeutral.main,
      },
      Menu: {
        itemBg: headerBg,
        itemSelectedBg: ctColorPrimary[1],
        itemSelectedColor: ctColorPrimary[3],
        subMenuItemBg: isDarkMode ? ctColorNeutral[4] : ctColorNeutral[1],
        subMenuItemSelectedColor: ctColorPrimary.main,
        subMenuItemBorderRadius: borderRadius,
      },
      Typography: {
        titleMarginBottom: 0,
      },
      Switch: {
        fontSize: 20,
      },
      Table: {
        headerBg: tableHeaderBg,
        borderColor: ctColorPrimary[1],
      },
      Tooltip: {
        colorBgSpotlight: headerBg,
      },
    },
    token: {
      borderRadius,
      colorText,
      colorLink: ctColorPrimary.main,
      colorPrimary: ctColorPrimary.main,
      colorTextBase: colorText,
      colorBgElevated: headerBg,
      colorBgContainer: headerBg,
      fontFamily: 'Poppins, sans-serif',
    },
  };
};
