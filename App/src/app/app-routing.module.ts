import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { LoginComponent } from './component/login/login.component';
import { UsuarioFormComponent } from './component/usuario/usuario-form/usuario-form.component';
import { UsuarioListComponent } from './component/usuario/usuario-list/usuario-list.component';
import { UsuarioUpdateComponent } from './component/usuario/usuario-update/usuario-update.component';
import { ListvideosComponent } from './component/videos/listvideos/listvideos.component';

// Guards
import { authGuard } from './guards/auth/auth.guard';
import { adminGuard } from './guards/admin/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'listaUsuario', canActivate:[authGuard, adminGuard],  component: UsuarioListComponent },
  { path: 'formUsuario',  component: UsuarioFormComponent },
  { path: 'updateUsuario/:Idusuario', canActivate:[authGuard, adminGuard], component: UsuarioUpdateComponent },
  { path: 'listvideos', canActivate:[authGuard], component: ListvideosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
