import { graphic } from 'echarts';

function getLine(eTheme) {
    return {
        name: '',
        type: 'line',
        smooth: true,
        symbolSize: 20,
        itemStyle: {
            normal: {
                opacity: 0,
            },
            emphasis: {
                color: '#ffffff',
                borderColor: eTheme.itemBorderColor,
                borderWidth: 2,
                opacity: 1,
            },
        },
        lineStyle: {
            normal: {
                width: eTheme.lineWidth,
                type: eTheme.lineStyle,
                color: graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: eTheme.firstLineGradFrom,
                    },
                    {
                        offset: 1,
                        color: eTheme.firstLineGradTo,
                    },
                ]),
            },
        },
        data: [],
    };
}

export function OPTIONS_E_CHART_FUN(config: any) {
    const drone_app = config.variables.drone_app;
    return {
        title: {
            show: false,
            text: 'echarts',
        },
        grid: {
            left: 70,
            top: 50,
            right: 20,
            bottom: 30,
        },
        color: [
            drone_app.firstLineGradFrom,
            drone_app.secondLineGradFrom,
            drone_app.thirdLineGradFrom,
            drone_app.fourthLineGradFrom,
        ],
        legend: {
            orient: 'horizontal',
            x: 'right',
            y: 'top',
            icon: 'pin',
            formatter: function (name) {
                return name;
            },
            // textStyle: {
            //     color: drone_app.tooltipTextColor,
            //     fontSize: drone_app.tooltipFontSize,
            //     fontWeight: drone_app.tooltipFontWeight,
            // },
            // backgroundColor: 'rgb(128, 128, 128, 0.2)',
            // borderRadius: 10,
            data: [],
        },
        toolbox: {
            show: false,
            orient: 'vertical',
            itemSize: 15,
            itemGap: 10,
            showTitle: true,
            top: 'middle',

            feature: {
                dataZoom: {
                    title: {
                        zoom: 'Area Zooming',
                        back: 'Restore Area Zooming',
                    },
                    yAxisIndex: 'none',
                },
                restore: {
                    show: true,
                    title: 'Restore',
                },
                saveAsImage: {
                    show: true,
                    title: 'Save as Image',
                    type: 'png',
                },
                dataView: {
                    show: true,
                    title: 'Data View',
                    readOnly: 'true',
                    lang: ['Data View', 'Close', 'Refresh'],

                    backgroundColor: drone_app.toolboxBg,
                    textareaColor: drone_app.toolboxBg,
                    textColor: drone_app.toolboxText,
                    buttonColor: drone_app.toolboxButton,
                    buttonTextColor: drone_app.toolboxButtonText,

                    optionToContent: function(opt) {
                        const axisData = opt.xAxis[0].data;
                        const series = opt.series;
                        let table = '<table style="width:100%;text-align:center"><tbody><tr>'
                                       + '<td>X Axis Intervals:</td>';
                        for (let i = 0; i < series.length; i++) {
                            if (series[i].name) {
                                table += '<td>' + series[i].name + '</td>';
                            }
                        }
                        table += '</tr>';

                        for (let i = 0, l = axisData.length; i < l; i++) {
                            table += '<tr>'
                                    + '<td>' + axisData[i] + '</td>';
                            for (let j = 0; j < series.length; j++) {
                                if (series[j].name) {
                                    table += '<td>' + series[j].data[i] + '</td>';
                                }
                            }
                            table += '</tr>';
                        }
                        table += '</tbody></table>';
                        return table;
                    },
                },
            },
        },
        dataZoom: [
            {
                show: true,
                realtime: true,
                start: 0,
                end: 100,
            },
            {
                type: 'inside',
                realtime: true,
                start: 0,
                end: 100,
            },
        ],
        tooltip: {
            trigger: 'item',
            axisPointer: {
                type: 'line',
                lineStyle: {
                    color: drone_app.tooltipLineColor,
                    width: drone_app.tooltipLineWidth,
                },
            },
            textStyle: {
                color: drone_app.tooltipTextColor,
                fontSize: drone_app.tooltipFontSize,
                fontWeight: drone_app.tooltipFontWeight,
            },
            position: 'top',
            backgroundColor: drone_app.tooltipBg,
            borderColor: drone_app.tooltipBorderColor,
            borderWidth: 1,
            formatter: (params) => {
                return Math.round(parseInt(params.value, 10));
            },
            extraCssText: drone_app.tooltipExtraCss,
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            offset: 5,
            data: [],
            axisTick: {
                show: true,
            },
            axisLabel: {
                color: drone_app.axisTextColor,
                fontSize: drone_app.axisFontSize,
            },
            axisLine: {
                lineStyle: {
                    color: drone_app.axisLineColor,
                    width: '2',
                },
            },
        },
        yAxis: {
            type: 'value',
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    color: drone_app.axisLineColor,
                    width: '1',
                },
            },
            axisLabel: {
                color: drone_app.axisTextColor,
                fontSize: drone_app.axisFontSize,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                lineStyle: {
                    color: drone_app.yAxisSplitLine,
                    width: '1',
                },
            },
        },
        series: [getLine(drone_app), getLine(drone_app), getLine(drone_app), getLine(drone_app)],
    };
}
