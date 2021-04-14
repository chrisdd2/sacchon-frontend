import { NotloggedGuard } from './common/notlogged.guard';
import { HomeComponent } from './common/home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationModule} from './authentication/authentication.module';

const routes: Routes = [
  { path: '', component:HomeComponent},
  { 
    path: 'auth', 
    loadChildren: () => import('./authentication/authentication.module').then( m => m.AuthenticationModule ),
    canActivate: [NotloggedGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
