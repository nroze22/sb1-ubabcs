import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="talosix-theme">
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </ThemeProvider>
  );
}

export default App;