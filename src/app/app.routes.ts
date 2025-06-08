import { Routes } from '@angular/router';
import path from 'path';
import { IndexComponent } from './pages/index/index.component';
import { InfoComponent } from './pages/info/info.component';

export const routes: Routes = [
    {path: '', redirectTo: 'index',pathMatch: 'full'},
    {   
        path: 'index',
        component: IndexComponent,
        pathMatch: 'full'
    },
    {
        path: 'info',
        component: InfoComponent,
        pathMatch: 'full'
    }
];
