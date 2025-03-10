import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlayComponent } from './pages/play/play.component';
import { ChangeNameComponent } from './pages/change-name/change-name.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,        
    },
    {
        path: 'play',
        component: PlayComponent,
    },
    {
        path: 'play/:id',
        component: PlayComponent
    },
    {
        path: 'change-name',
        component: ChangeNameComponent
    }
];
