import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './features/layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './features/layout/main-layout/main-layout.component';
import { authGuard } from './core/guard/auth/auth.guard';
import { userGuard } from './core/guard/user/user.guard';
import { NotFoundComponent } from './features/pages/not-found/not-found.component';
import { HomeComponent } from './features/pages/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'Home' },
    {
        path: '', component: AuthLayoutComponent, canActivate: [userGuard], children: [
            { path: 'signin', loadComponent: () => import('./features/auth/login/login.component').then((c) => c.LoginComponent) },
            { path: 'signup', loadComponent: () => import('./features/auth/register/register.component').then((c) => c.RegisterComponent) },
            { path: 'forget-password', loadComponent: () => import('./features/auth/forget-password/forget-password.component').then((c) => c.ForgetPasswordComponent) },
        ]
    },
    {
        path: '', component: MainLayoutComponent, children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadComponent: () => import('./features/pages/home/home.component').then((c) => c.HomeComponent), title: 'Home' },
            { path: 'products', loadComponent: () => import('./features/pages/products/products.component').then((c) => c.ProductsComponent), title: 'Products' },
            { path: 'productDetails/:id', loadComponent: () => import('./features/pages/product-details/product-details.component').then((c) => c.ProductDetailsComponent), title: 'Product Details' },
            { path: 'categories', loadComponent: () => import('./features/pages/categories/categories.component').then((c) => c.CategoriesComponent), title: 'Category' },
            { path: 'categories/:categoryId', loadComponent: () => import('./features/pages/category-details/category-details.component').then((c) => c.CategoryDetailsComponent), title: 'Category Details' },
            { path: 'brands', loadComponent: () => import('./features/pages/brands/brands.component').then((c) => c.BrandsComponent), title: 'Brands' },
            { path: 'brands/:brandId', loadComponent: () => import('./features/pages/brand-details/brand-details.component').then((c) => c.BrandDetailsComponent), title: 'Brands Details' },
            { path: 'cart', loadComponent: () => import('./features/pages/cart/cart.component').then((c) => c.CartComponent), canActivate: [authGuard], title: 'Cart' },
            { path: 'address/:cartId', loadComponent: () => import('./features/pages/shipping-address/shipping-address.component').then((c) => c.ShippingAddressComponent), canActivate: [authGuard], title: 'Shipping Address' },
            { path: 'allorders', loadComponent: () => import('./features/pages/all-orders/all-orders.component').then((c) => c.AllOrdersComponent), canActivate: [authGuard], title: 'All Orders' }
        ]
    },
    { path: '**', component: NotFoundComponent, title: 'Error!' },
];
