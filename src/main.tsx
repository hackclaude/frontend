import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import MobileLayout from '@/components/MobileLayout';
import ProductDetailPage from '@/pages/ProductDetailPage';
import AuthPage from '@/pages/AuthPage';
import { navItems } from '@/constants/navigation';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthPage />,
  },
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
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
