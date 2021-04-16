import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NbEvaIconsModule } from '@nebular/eva-icons';

import {
    NbIconModule,
    NbLayoutModule,
    NbMenuModule,
    NbSidebarModule,
    NbThemeModule,
    NbSelectModule,
    NbCardModule,
} from '@nebular/theme';

import { NgxEchartsModule } from 'ngx-echarts';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { DEFAULT_THEME } from './styles/theme.default';
import { COSMIC_THEME } from './styles/theme.cosmic';
import { CORPORATE_THEME } from './styles/theme.corporate';
import { DARK_THEME } from './styles/theme.dark';
import { ChartsComponent } from './components/charts/charts.component';

const COMPONENTS = [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
];

const NEBULAR = [
    NbIconModule,
    NbLayoutModule,
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbThemeModule.forRoot({ name: 'default' }, [
        DEFAULT_THEME,
        COSMIC_THEME,
        CORPORATE_THEME,
        DARK_THEME,
    ]),
    NbEvaIconsModule,
    NbSelectModule,
    NbCardModule,
];

@NgModule({
    declarations: [...COMPONENTS, ChartsComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NoopAnimationsModule,
        HttpClientModule,
        ...NEBULAR,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts'),
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
