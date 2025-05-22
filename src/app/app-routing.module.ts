import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./views/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./views/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./views/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'reportar',
    loadChildren: () => import('./views/reportar/reportar.module').then( m => m.ReportarPageModule)
  },
  {
    path: 'contatos',
    loadChildren: () => import('./views/contatos/contatos.module').then( m => m.ContatosPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./views/login/login.module').then( m => m.LoginPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
