import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ChartDataService {
    constructor(private httpClient: HttpClient) {}

    public get_chart_data() {
        return new Promise((resolve) => {
            const url = '/rest/api/v1/chart_data';
            this.httpClient.get(url).subscribe(
                (res) => {
                    resolve({status: res['status'], detail: res['detail'], data: res['data']});
                },
                (error) => {
                    resolve({status: 'danger', detail: error['message'], data: [] });
                }
            );
        });
    }
}
