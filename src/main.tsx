import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import MobileLayout from '@/components/MobileLayout';
import ProductDetailPage from '@/pages/ProductDetailPage';
import ProductRegisterPage from '@/pages/ProductRegisterPage';
import CategoryPage from '@/pages/CategoryPage';
import AuthPage from '@/pages/AuthPage';
import SearchPage from '@/pages/SearchPage';
import ChatDetailPage from '@/pages/ChatDetailPage';
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
        path: '/product/:uuid',
        element: <ProductDetailPage />,
      },
      {
        path: '/product/register',
        element: <ProductRegisterPage />,
      },
      {
        path: '/category/:categoryId',
        element: <CategoryPage />,
      },
      {
        path: '/auth',
        element: <AuthPage />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '/chat/:uuid',
        element: <ChatDetailPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
