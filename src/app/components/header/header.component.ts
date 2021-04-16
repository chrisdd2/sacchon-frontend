import { Component, OnInit } from '@angular/core';

import {
    NbMenuService,
    NbSidebarService,
    NbThemeService,
} from '@nebular/theme';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    themes = [
        {
            value: 'default',
            name: 'Light',
        },
        {
            value: 'dark',
            name: 'Dark',
        },
        {
            value: 'cosmic',
            name: 'Cosmic',
        },
        {
            value: 'corporate',
            name: 'Corporate',
        },
    ];

    currentTheme = 'corporate';

    constructor(
        private readonly sidebarService: NbSidebarService,
        private themeService: NbThemeService
    ) {}

    ngOnInit(): void {
        this.currentTheme = this.themeService.currentTheme;
    }

    changeTheme(themeName: string) {
        this.themeService.changeTheme(themeName);
    }

    toggleSidebar(): boolean {
        this.sidebarService.toggle(true, 'menu-sidebar');
        return false;
    }
}
