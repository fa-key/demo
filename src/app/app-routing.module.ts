import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  {
    path: 'folder/:id',
    loadChildren: () =>
      import('./folder/folder.module').then((m) => m.FolderPageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
    canLoad: [AutoLoginGuard],
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module').then((m) => m.UserPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'user-tambah',
    loadChildren: () =>
      import('./user-tambah/user-tambah.module').then(
        (m) => m.UserTambahPageModule
      ),
  },
  {
    path: 'user-edit/:id',
    loadChildren: () =>
      import('./user-edit/user-edit.module').then((m) => m.UserEditPageModule),
  },

  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
