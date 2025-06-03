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
    path: 'products/product/:id',
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
  {
    path: 'admin/marcas',
    loadChildren: () => import('./admin/marcas/marcas.module').then( m => m.MarcasPageModule)
  },
  {
    path: 'admin/usuarios',
    loadChildren: () => import('./admin/usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'admin/productos',
    loadChildren: () => import('./admin/productos/productos.module').then( m => m.ProductosPageModule)
  },
  {
    path: 'admin/productos-crear',
    loadChildren: () => import('./admin/productos-crear/productos-crear.module').then( m => m.ProductosCrearPageModule)
  },
  {
    path: 'admin/productos-editar/:id',
    loadChildren: () => import('./admin/productos-editar/productos-editar.module').then( m => m.ProductosEditarPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
