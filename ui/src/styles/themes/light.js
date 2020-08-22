const colors = {
  white: '#fff',
  black: '#131d2a',
  transparent: 'rgba(0,0,0,0)',

  primaryDarker: '#00022e',
  primaryDark: '#120078',
  primary: '#00e092',
  primaryLight: '#b6d4ff',
  primaryLighter: '#b6d4ff',
  primaryLightest: '#f4f5f9',

  secondary: '#00000',

  neutralDarkest: '#555c66',
  neutralDarker: '#333333',
  neutralDark: '#676767',
  neutral: '#999999',
  neutralLight: '#c3c9ce',
  neutralLighter: '#ececf0',
  neutralLightest: '#fafbfc',

  green: '#00c582',
  yellow: '#ffc85e',
  violet: '#c66ce0',
  blue: '#43d1ff',
  purple: '#8b74ff',
  orange: '#ff824c',
  success: '#21ba45',
  warning: '#fbbd08',
  danger: '#ff5353',
}

const shadows = {
  light: '1px 2px 4px 0 rgba(0, 0, 0, 0.05)',
  medium: '0px 2px 8px rgba(0, 0, 0, 0.1);',
  heavy: '1px 2px 4px 0 rgba(0, 0, 0, 0.2)',
  primary: '0 4px 9px rgba(0, 161, 255, 0.33)',
}

const borders = {
  thin: `1px solid`,
  medium: `2px solid`,
  thick: `3px solid`,
  weird: `4px solid ${colors.primary}`,
  discrete: `1px solid ${colors.neutralLighter}`,
}

const breakpoints = ['200px', '52em', '64em']

const mediaQueries = {
  small: `@media screen and (min-width: ${breakpoints[0]})`,
  medium: `@media screen and (min-width: ${breakpoints[1]})`,
  large: `@media screen and (min-width: ${breakpoints[2]})`,
}

export default {
  colors,
  shadows,
  borders,
  containers: {
    'grid-12': {
      display: 'grid',
      gridTemplate: 'auto / repeat(12, auto)',
      gridGap: '24px',
    },
    'grid-6': {
      display: 'grid',
      gridTemplate: 'auto / repeat(6, auto)',
      gridGap: '16px',
    },
    padded: {
      padding: '24px 32px',
    },
  },
  buttons: {
    primary: { background: colors.primary, color: colors.white },
    secondary: { background: colors.secondary, color: colors.white },
    neutral: { background: colors.neutralLighter, color: colors.neutralDark },
    discrete: { background: 'none', color: colors.neutralDark },
    warning: { background: colors.transparent, color: colors.warning, border: borders.thin },
    danger: { background: colors.danger, color: colors.white },
    primaryInverted: {
      background: colors.transparent,
      border: borders.thin,
      borderColor: colors.primary,
      color: colors.primary,
    },
    dangerInverted: {
      background: colors.transparent,
      color: colors.danger,
      border: borders.thin,
      borderColor: colors.danger,
    },
  },
  colorStyles: {
    darkHighContrast: {
      background: colors.primaryDark,
      color: colors.neutralLight,
      borderColor: colors.neutralLight,
      fill: colors.neutralLight,
    },
    lightHighContrast: {
      background: colors.white,
      color: colors.neutralDark,
      borderColor: colors.neutralDark,
      fill: colors.neutralDark,
    },
  },
  textStyles: {
    title: {
      fontSize: 32,
      fontWeight: '500',
      fontFamily: 'Roboto',
      lineHeight: '40px',
      color: colors.neutralDarkest,
    },
    subtitle: {
      fontSize: 24,
      fontFamily: 'Raleway',
      fontWeight: '500',
      lineHeight: '18px',
      color: colors.neutralDarker,
    },
    heading: {
      fontSize: 18,
      fontFamily: 'Raleway',
      fontWeight: 'bold',
      lineHeight: '18px',
      color: colors.neutralDarkest,
    },
    description: {
      fontSize: 16,
      fontFamily: 'sans-serif',
      fontWeight: '400',
      lineHeight: '22px',
      color: colors.neutralDark,
    },
    body: {
      fontSize: 15,
      fontFamily: 'Lato',
      fontWeight: '400',
      lineHeight: '18px',
      color: colors.neutralDark,
    },
    strong: {
      fontSize: 14,
      fontFamily: 'Lato',
      fontWeight: '600',
      lineHeight: '18px',
      color: colors.neutralDarker,
    },
    detail: {
      fontSize: 11,
      fontFamily: 'sans-serif',
      fontWeight: '400',
      lineHeight: '14px',
      color: colors.neutral,
    },
    code: {
      fontSize: 14,
      fontFamily: 'open-sans',
      fontWeight: '400',
      lineHeight: '16px',
      color: colors.neutralDark,
    },
  },
  fontSizes: [10, 12, 14, 16, 20, 24, 32, 48, 64, 72],
  sizes: [0.5, 1, 2, 4, 8, 16, 32, 48, 64, 72, 96, 128],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  breakpoints,
  mediaQueries,
}
