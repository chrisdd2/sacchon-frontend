import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

import { NbThemeService } from '@nebular/theme';

import { ChartDataService } from '../../services/chart-data.service';

import { OPTIONS_E_CHART_FUN } from './charts.component-settings';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit, OnChanges, OnDestroy {
    private alive = true;
    autoResize = true;

    // Chart variables
    echartsIntance: any;
    options: any = {};

    // Chart Variables
    chartData: { title: string; data: any[]; legend: string[] } = {
        title: '',
        data: [],
        legend: [],
    };
    chartZoom: boolean = false;
    chartToolbox: boolean = false;

    // =========== Component Methods ===========
    constructor(private theme: NbThemeService, private chartDataService: ChartDataService) {}

    ngOnInit() {
        // this.chartDataService.get_chart_data()
        //     .then((res) => {
        //         this.updateChart(
        //             res['title'],
        //             res['data'],
        //             res['legend']    
        //         );
        //      })
        //     .catch((err) => {})
        //     .finally(() => {})
        this.updateChart(
            'Chart-Title',
            {
                data: [
                    this.getPeriodData(24, 1000),
                    this.getPeriodData(24, 1000),
                    this.getPeriodData(24, 1000),
                    this.getPeriodData(24, 1000)
                ],
                labels: this.getAllDayHours(),
            },
            ["Field-1", "Field-2", "Field-3", "Field-4"]
        );
    }

    ngOnChanges() {}

    ngOnDestroy(): void {
        this.alive = false;
    }

    // =========== Component Custom Methods ===========
    private getRandomInt(max: number) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    private getPeriodData(n: number, max: number) {
        const data: any = [];
        for (let i = 1; i <= n; i++) {
            data.push(this.getRandomInt(max));
        }
        return data;
    }

    private getAllDayHours() {
        const hours = ['00'];
        const times = [];
        for (let i = 0; i < 24; i++) {
            for (let j = 0; j < hours.length; j++) {
                if (i < 10) {
                    times.push('0' + i + ':' + hours[j]);
                } else {
                    times.push(i + ':' + hours[j]);
                }
            }
        }
        return times;
    }

    private updateChart(chartTitle, chartData, legendData) {
        this.theme
            .getJsTheme()
            .pipe(takeWhile(() => this.alive))
            .subscribe((config) => {
                this.setOptions(config);
                this.updateChartOptions(chartTitle, chartData, legendData);
            });
    }

    private setOptions(config) {
        this.options = OPTIONS_E_CHART_FUN(config);
    }

    private updateChartOptions(chartTitle, chartData, legendData) {
        const options = this.options;
        const series = this.getNewSeries(
            options.series,
            chartData.data,
            legendData
        );
        const xAxis = this.getNewXAxis(options.xAxis, chartData.labels);
        const title = this.getNewTitle(options.title, chartTitle);
        const legend = this.getNewLegend(options.legend, legendData);
        const dataZoom = this.getNewDataZoom(options.dataZoom, legendData);
        const grid = this.getNewGrid(options.grid);
        const toolbox = this.getNewToolbox(options.toolbox);

        this.options = {
            ...options,
            title,
            legend,
            grid,
            toolbox,
            dataZoom,
            xAxis,
            series,
        };
        console.log(this.options)
    }

    private getNewTitle(title, chartTitle) {
        return {
            ...title,
            text: chartTitle,
        };
    }

    private getNewSeries(series, data: number[][], legendData: string[]) {
        return series.map((line, index) => {
            return {
                ...line,
                name: legendData[index],
                data: data[index],
            };
        });
    }

    private getNewXAxis(xAxis, labels: string[]) {
        return {
            ...xAxis,
            data: labels,
        };
    }

    private getNewLegend(legend, legendData: string[]) {
        return {
            ...legend,
            data: legendData,
        };
    }

    private getNewDataZoom(dataZoom, legendData: string[]) {
        let zoom = dataZoom;
        if (!this.chartZoom) {
            zoom = [];
        }
        return zoom;
    }

    private getNewGrid(grid) {
        let bottom = grid.bottom;
        let right = grid.right;
        if (this.chartZoom) {
            bottom = 80;
        }
        if (this.chartToolbox) {
            right = 40;
        }
        return {
            ...grid,
            bottom: bottom,
            right: right,
        };
    }

    private getNewToolbox(toolbox) {
        return {
            ...toolbox,
            show: this.chartToolbox,
        };
    }

    // =========== UI interaction Methods ===========
}
