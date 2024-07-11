import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfiloComponent } from './profilo.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [{ path: 'profilo', component: ProfiloComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard]  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfiloRoutingModule { }
