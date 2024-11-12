import { useState } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTheme } from '@/components/ui/theme-provider';
import type { Settings } from '@/lib/types';

export function SettingsDialog({
  settings,
  onSave,
}: {
  settings: Settings;
  onSave: (settings: Settings) => void;
}) {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [openaiKey, setOpenaiKey] = useState(settings.openaiKey);

  const handleSave = () => {
    onSave({ openaiKey });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <SettingsIcon className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Configure your application settings
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>OpenAI API Key</Label>
            <Input
              type="password"
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
              placeholder="sk-..."
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}