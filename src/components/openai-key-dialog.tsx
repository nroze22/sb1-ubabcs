import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useScreeningStore } from '@/lib/store';
import { Brain } from 'lucide-react';

export function OpenAIKeyDialog({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}) {
  const { settings, setSettings } = useScreeningStore();
  const [key, setKey] = useState(settings.openaiKey || '');

  const handleSave = () => {
    setSettings({ openaiKey: key });
    onSuccess();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center">Enter OpenAI API Key</DialogTitle>
          <DialogDescription className="text-center">
            Your API key is stored locally and never sent to our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="key">API Key</Label>
            <Input
              id="key"
              type="password"
              placeholder="sk-..."
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>
          <Button onClick={handleSave} className="w-full" disabled={!key.startsWith('sk-')}>
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}