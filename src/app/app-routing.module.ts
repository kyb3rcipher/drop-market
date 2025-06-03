import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { notAuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'account/login',
    loadChildren: () => import('./account/login/login.module').then( m => m.LoginPageModule),
    canActivate: [notAuthGuard]
  },
  {
    path: 'account/register',
    loadChildren: () => import('./account/register/register.module').then( m => m.RegisterPageModule),
    canActivate: [notAuthGuard]
  },
  {
    path: 'account/forgot-password',
    loadChildren: () => import('./account/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule),
    canActivate: [notAuthGuard]
  },
  {
    path: 'products/:brandName',
    loadChildren: () => import('./products/products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'products/product',
    loadChildren: () => import('./products/product/product.module').then( m => m.ProductPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'admin/categorias',
    loadChildren: () => import('./admin/categorias/categorias.module').then( m => m.CategoriasPageModule),
    // canActivate: [notAuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
