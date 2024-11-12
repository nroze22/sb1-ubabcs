import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/theme-toggle";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="container flex h-20 items-center justify-between px-4">
          <Link to="/" className="flex items-center space-x-4">
            <img 
              src="https://framerusercontent.com/images/021L73kQYq9ZIfe4FnXRxtsHM.svg" 
              alt="Talosix AI" 
              className="h-12 w-auto"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Talosix AI
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main className="container py-8">
        <Outlet />
      </main>
    </div>
  ),
});