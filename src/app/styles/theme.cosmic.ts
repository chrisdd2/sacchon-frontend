import { NbJSThemeOptions, COSMIC_THEME as baseTheme } from '@nebular/theme';

const baseThemeVariables = baseTheme.variables;

export const COSMIC_THEME = {
  name: 'cosmic',
  base: 'cosmic',
  variables: {
    drone_app: {
      tooltipBg: baseThemeVariables.bg,
      tooltipLineColor: 'rgba(0, 0, 0, 0)',
      tooltipLineWidth: '0',
      tooltipBorderColor: baseThemeVariables.border2,
      tooltipExtraCss: 'border-radius: 10px; padding: 8px 24px;',
      tooltipTextColor: baseThemeVariables.fgText,
      tooltipFontWeight: 'normal',
      tooltipFontSize: '20',

      toolboxBg: baseThemeVariables.bg,
      toolboxText: baseThemeVariables.fg,
      toolboxButton: baseThemeVariables.primary,
      toolboxButtonText: 'rgba(255, 255, 255, 0.9)',

      axisLineColor: baseThemeVariables.border4,
      axisFontSize: '12',
      axisTextColor: baseThemeVariables.fg,
      yAxisSplitLine: baseThemeVariables.separator,

      itemBorderColor: baseThemeVariables.primary,
      lineStyle: 'solid',
      lineWidth: '4',

      // first line
      firstLineGradFrom: baseThemeVariables.success,
      firstLineGradTo: baseThemeVariables.successLight,

      firstAreaGradFrom: 'rgba(0, 214, 143, 0.2)',
      firstAreaGradTo: 'rgba(0, 214, 143, 0)',
      firstShadowLineDarkBg: 'rgba(0, 0, 0, 0)',

      // second line
      secondLineGradFrom: baseThemeVariables.primary,
      secondLineGradTo: baseThemeVariables.primaryLight,

      secondAreaGradFrom: 'rgba(51, 102, 255, 0.2)',
      secondAreaGradTo: 'rgba(51, 102, 255, 0)',
      secondShadowLineDarkBg: 'rgba(0, 0, 0, 0)',

      // third line
      thirdLineGradFrom: baseThemeVariables.danger,
      thirdLineGradTo: baseThemeVariables.dangerLight,

      thirdAreaGradFrom: 'rgba(255, 61, 113, 0.2)',
      thirdAreaGradTo: 'rgba(255, 61, 113, 0)',
      thirdShadowLineDarkBg: 'rgba(0, 0, 0, 0)',

      // forth line
      fourthLineGradFrom: baseThemeVariables.warning,
      fourthLineGradTo: baseThemeVariables.warningLight,

      fourthAreaGradFrom: 'rgba(255, 170, 0, 0.2)',
      fourthAreaGradTo: 'rgba(255, 170, 0, 0)',
      fourthShadowLineDarkBg: 'rgba(0, 0, 0, 0)',
    },

  },
} as NbJSThemeOptions;
