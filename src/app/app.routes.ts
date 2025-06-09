// src/app/app.routes.ts
import { Routes }              from '@angular/router';
import { IndexComponent }      from './pages/index/index.component';
import { InfoComponent }       from './pages/info/info.component';
import { LoginComponent }      from './pages/login/login.component';
import { CadastroComponent }   from './pages/cadastro/cadastro.component';
import { AuthGuard }           from './guards/auth.guard';
import { DashboardUsuarioComponent } from './pages/dashboard-usuario/dashboard-usuario.component';
import { DashboardUsuarioEscolaComponent } from './pages/dashboard-usuario-escola/dashboard-usuario-escola.component';

export const routes: Routes = [
  { path: '',            redirectTo: 'index', pathMatch: 'full' },
  { path: 'index',       component: IndexComponent },
  { path: 'info',        component: InfoComponent },
  { path: 'login',       component: LoginComponent },
  { path: 'cadastro',    component: CadastroComponent },

{
  path: 'dashboard-usuario',
  component: DashboardUsuarioComponent,
  /*canActivate: [ AuthGuard ]*/
},
{
  path: 'dashboard-usuario-escola',
  component: DashboardUsuarioEscolaComponent,
  /*canActivate: [ AuthGuard ]*/
},
  { path: '**', redirectTo: 'index' }
];