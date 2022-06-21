import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentiction/login/login.component';
import { ProfileComponent } from './authentiction/profile/profile.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { AuthGuard } from './Service/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: "",
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      {
        path: 'shoppingCart',
        loadChildren: () =>
          import('./shopping-cart/shopping-cart-routing.module').then(
            (m) => m.ShoppingCartRoutingModule
          ),
        data: { name: 'Shopping Cart' },
      }]
  },
  {
    path: '**',
    redirectTo: '/login',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
