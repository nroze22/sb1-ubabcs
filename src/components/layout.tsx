import { motion } from 'framer-motion';
import { Link, Outlet, useRouter } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { SettingsDialog } from '@/components/settings-dialog';
import { useScreeningStore } from '@/lib/store';

const steps = [
  { path: '/', label: 'Start' },
  { path: '/criteria', label: 'Criteria' },
  { path: '/upload', label: 'Upload' },
  { path: '/results', label: 'Results' },
];

export function Layout() {
  const router = useRouter();
  const settings = useScreeningStore((state) => state.settings);
  const setSettings = useScreeningStore((state) => state.setSettings);

  const currentStepIndex = steps.findIndex(
    (step) => step.path === router.state.location.pathname
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="container flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="https://framerusercontent.com/images/021L73kQYq9ZIfe4FnXRxtsHM.svg" 
              alt="Talosix AI" 
              className="h-8 w-auto"
            />
            <span className="font-semibold">Talosix AI Patient Screener</span>
          </Link>
          <div className="flex items-center gap-4">
            {currentStepIndex > 0 && (
              <div className="flex gap-2">
                {steps.slice(1).map((step, index) => (
                  <Button
                    key={step.path}
                    variant={index === currentStepIndex - 1 ? 'default' : 'ghost'}
                    className="relative"
                    asChild
                  >
                    <Link to={step.path}>
                      {index === currentStepIndex - 1 && (
                        <motion.div
                          className="absolute inset-0 bg-primary opacity-10 rounded-md"
                          layoutId="step"
                          transition={{
                            type: 'spring',
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                      {step.label}
                    </Link>
                  </Button>
                ))}
              </div>
            )}
            <SettingsDialog settings={settings} onSave={setSettings} />
          </div>
        </div>
      </header>

      <main className="container py-8">
        <Outlet />
      </main>
    </div>
  );
}