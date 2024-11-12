import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { MEDICAL_FIELDS, OPERATORS } from '@/lib/constants';
import type { Criterion } from '@/lib/types';

export function CriteriaBuilder({
  category,
  criteria,
  onChange,
}: {
  category: 'inclusion' | 'exclusion';
  criteria: Criterion[];
  onChange: (criteria: Criterion[]) => void;
}) {
  const [selectedField, setSelectedField] = useState(MEDICAL_FIELDS[0].value);

  const addCriterion = () => {
    const field = MEDICAL_FIELDS.find((f) => f.value === selectedField)!;
    const newCriterion: Criterion = {
      id: crypto.randomUUID(),
      category,
      field: field.value,
      operator: OPERATORS[0].value,
      value: '',
      unit: field.units[0],
    };
    onChange([...criteria, newCriterion]);
  };

  const removeCriterion = (id: string) => {
    onChange(criteria.filter((c) => c.id !== id));
  };

  const updateCriterion = (id: string, updates: Partial<Criterion>) => {
    onChange(
      criteria.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Select value={selectedField} onValueChange={setSelectedField}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select field" />
          </SelectTrigger>
          <SelectContent>
            {MEDICAL_FIELDS.map((field) => (
              <SelectItem key={field.value} value={field.value}>
                {field.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={addCriterion} variant="secondary">
          <Plus className="mr-2 h-4 w-4" />
          Add Criterion
        </Button>
      </div>

      <div className="space-y-3">
        {criteria.map((criterion) => {
          const field = MEDICAL_FIELDS.find((f) => f.value === criterion.field)!;
          return (
            <div
              key={criterion.id}
              className="flex items-center gap-2 bg-secondary/50 p-3 rounded-lg"
            >
              <span className="text-sm font-medium w-[150px]">{field.label}</span>
              <Select
                value={criterion.operator}
                onValueChange={(value) =>
                  updateCriterion(criterion.id, { operator: value })
                }
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {OPERATORS.map((op) => (
                    <SelectItem key={op.value} value={op.value}>
                      {op.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type={field.units.length ? 'number' : 'text'}
                value={criterion.value}
                onChange={(e) =>
                  updateCriterion(criterion.id, { value: e.target.value })
                }
                className="w-[150px]"
              />
              {field.units.length > 0 && (
                <Select
                  value={criterion.unit}
                  onValueChange={(value) =>
                    updateCriterion(criterion.id, { unit: value })
                  }
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {field.units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeCriterion(criterion.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}