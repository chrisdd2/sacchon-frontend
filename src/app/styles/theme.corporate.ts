import { NbJSThemeOptions, CORPORATE_THEME as baseTheme } from '@nebular/theme';

const baseThemeVariables = baseTheme.variables;

export const CORPORATE_THEME = {
    name: 'corporate',
    base: 'corporate',
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

            firstAreaGradFrom: 'rgba(0, 0, 0, 0)',
            firstAreaGradTo: 'rgba(0, 0, 0, 0)',
            firstShadowLineDarkBg: 'rgba(0, 0, 0, 0)',

            // second line
            secondLineGradFrom: baseThemeVariables.primary,
            secondLineGradTo: baseThemeVariables.primaryLight,

            secondAreaGradFrom: 'rgba(0, 0, 0, 0)',
            secondAreaGradTo: 'rgba(0, 0, 0, 0)',
            secondShadowLineDarkBg: 'rgba(0, 0, 0, 0)',

            // third line
            thirdLineGradFrom: baseThemeVariables.danger,
            thirdLineGradTo: baseThemeVariables.dangerLight,

            thirdAreaGradFrom: 'rgba(0, 0, 0, 0)',
            thirdAreaGradTo: 'rgba(0, 0, 0, 0)',
            thirdShadowLineDarkBg: 'rgba(0, 0, 0, 0)',

            // forth line
            fourthLineGradFrom: baseThemeVariables.warning,
            fourthLineGradTo: baseThemeVariables.warningLight,

            fourthAreaGradFrom: 'rgba(0, 0, 0, 0)',
            fourthAreaGradTo: 'rgba(0, 0, 0, 0)',
            fourthShadowLineDarkBg: 'rgba(0, 0, 0, 0)',
        },
    },
} as NbJSThemeOptions;
