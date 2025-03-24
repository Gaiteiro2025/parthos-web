import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { AuthComponent } from './features/auth/auth.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { HomeComponent } from './features/home/home.component';
export const routes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        component: HomeComponent,
        children: [
            {
                path: 'tasks', loadComponent: () =>
                    import('./features/home/kanban-board/kanban-board.component').then((m) => m.KanbanBoardComponent),
                canActivate: [authGuard]
            },
            { path: '', redirectTo: '/tasks', pathMatch: 'full' },
        ]
    },
    {
        path: '', component: AuthComponent, children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
        ]
    },
    { path: '**', redirectTo: 'login' }

];
