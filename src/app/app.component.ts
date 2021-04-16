import { Component } from '@angular/core';

import { NbMenuItem } from '@nebular/theme';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'drone-app';

    items: NbMenuItem[] = [
        {
            title: 'Home',
            icon: 'home-outline',
            link: '/home',
            home: true,
        },
    ];

    constructor() {}
}
