import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import MobileLayout from '@/components/MobileLayout';
import ProductDetailPage from '@/pages/ProductDetailPage';
import CategoryPage from '@/pages/CategoryPage';
import AuthPage from '@/pages/AuthPage';
import { navItems } from '@/constants/navigation';
import './index.css';

const router = createBrowserRouter([
  {
    element: <MobileLayout />,
    children: [
      ...navItems.map((item) => ({
        path: item.to,
        element: <item.component />,
      })),
      {
        path: '/product/:id',
        element: <ProductDetailPage />,
      },
      {
        path: '/category/:categoryId',
        element: <CategoryPage />,
      },
      {
        path: '/auth',
        element: <AuthPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
