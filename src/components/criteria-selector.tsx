import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { MEDICAL_CRITERIA } from '@/lib/constants';
import { ScrollArea } from './ui/scroll-area';

type CriterionType = 'conditions' | 'labs' | 'vitals' | 'demographics' | 'scores';

interface CriterionOption {
  label: string;
  value: string;
  category: string;
  units?: string[];
}

interface CriteriaSelectorProps {
  type: CriterionType;
  value: string;
  onChange: (value: string, option: CriterionOption) => void;
}

export function CriteriaSelector({ type, value, onChange }: CriteriaSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const options = MEDICAL_CRITERIA[type];
  const selectedOption = options.find((option) => option.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedOption?.label ?? "Select criterion..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput placeholder="Search criteria..." />
          <CommandEmpty>No criterion found.</CommandEmpty>
          <ScrollArea className="h-[300px]">
            {Object.entries(
              options.reduce<Record<string, CriterionOption[]>>((acc, option) => {
                if (!acc[option.category]) {
                  acc[option.category] = [];
                }
                acc[option.category].push(option);
                return acc;
              }, {})
            ).map(([category, items]) => (
              <CommandGroup key={category} heading={category}>
                {items.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => {
                      onChange(option.value, option);
                      setOpen(false);
                    }}
                    className="flex items-center justify-between"
                  >
                    <span>{option.label}</span>
                    {option.value === value && (
                      <Check className="h-4 w-4" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}