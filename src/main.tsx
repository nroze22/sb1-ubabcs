import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import './index.css';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="talosix-theme">
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </ThemeProvider>
  </StrictMode>
);