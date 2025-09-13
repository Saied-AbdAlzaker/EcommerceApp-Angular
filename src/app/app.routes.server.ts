import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'productDetails/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'categories/:categoryId',
    renderMode: RenderMode.Server
  },
  {
    path: 'brands/:brandId',
    renderMode: RenderMode.Server
  },
  {
    path: 'address/:cartId',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
