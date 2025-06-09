import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent }     from './pages/index/index.component';
import { InfoComponent }      from './pages/info/info.component';
import { LoginComponent }     from './pages/login/login.component';
import { CadastroComponent }  from './pages/cadastro/cadastro.component';
//import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { AuthGuard }          from './guards/auth.guard';

export const routes: Routes = [
  { path: '',           redirectTo: 'index', pathMatch: 'full' },
  { path: 'index',      component: IndexComponent },
  { path: 'info',       component: InfoComponent },
  { path: 'login',      component: LoginComponent },
  { path: 'cadastro',   component: CadastroComponent },
  // área protegida do sistema  
  //{ 
    //path: 'dashboard',  
    //component: DashboardComponent,
    //canActivate: [AuthGuard] 
  //},

  // se quiser duas áreas separadas:
  // {
  //   path: 'dashboard-responsavel',
  //   component: DashboardResponsavelComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'dashboard-escola',
  //   component: DashboardEscolaComponent,
  //   canActivate: [AuthGuard]
  // },

  // rota “coringa” para 404  
  { path: '**', redirectTo: 'index' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}