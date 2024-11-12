import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MEDICAL_CRITERIA, CATEGORIES, OPERATORS } from "@/lib/constants";
import { useScreeningStore } from "@/lib/store";
import type { Criterion } from "@/lib/types";

export function CriteriaForm() {
  const navigate = useNavigate();
  const { criteria: savedCriteria, setCriteria } = useScreeningStore();
  const [criteria, setLocalCriteria] = useState<Criterion[]>(savedCriteria || []);
  const [type, setType] = useState<"inclusion" | "exclusion">("inclusion");
  
  // Form state
  const [category, setCategory] = useState<keyof typeof MEDICAL_CRITERIA | "">("");
  const [field, setField] = useState("");
  const [operator, setOperator] = useState("");
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("");

  // Sync with store
  useEffect(() => {
    if (savedCriteria?.length) {
      setLocalCriteria(savedCriteria);
    }
  }, [savedCriteria]);

  const resetForm = () => {
    setCategory("");
    setField("");
    setOperator("");
    setValue("");
    setUnit("");
  };

  const getSelectedField = () => {
    if (!category || !field) return null;
    return MEDICAL_CRITERIA[category]?.find(f => f.value === field);
  };

  const getValidOperators = () => {
    const selectedField = getSelectedField();
    if (!selectedField) return OPERATORS;

    if ('options' in selectedField) {
      return OPERATORS.filter(op => ['is', 'is_not'].includes(op.value));
    }

    if (selectedField.units) {
      return OPERATORS.filter(op => ['=', '!=', '>', '<', '>=', '<='].includes(op.value));
    }

    return OPERATORS.filter(op => ['present', 'not_present'].includes(op.value));
  };

  const addCriterion = () => {
    const selectedField = getSelectedField();
    if (!selectedField || !category) return;

    const newCriterion: Criterion = {
      id: crypto.randomUUID(),
      type,
      field,
      operator,
      value,
      unit: selectedField.units ? unit : undefined,
    };

    const updatedCriteria = [...criteria, newCriterion];
    setLocalCriteria(updatedCriteria);
    setCriteria(updatedCriteria);
    resetForm();
  };

  const removeCriterion = (id: string) => {
    const updatedCriteria = criteria.filter((c) => c.id !== id);
    setLocalCriteria(updatedCriteria);
    setCriteria(updatedCriteria);
  };

  const handleContinue = () => {
    if (criteria.length > 0) {
      navigate({ to: "/upload" });
    }
  };

  const canAddCriterion = 
    category && 
    field && 
    operator && 
    ((['present', 'not_present'].includes(operator)) || 
     (value && (!getSelectedField()?.units || unit)));

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Button
          variant="outline"
          className={cn(
            "flex-1",
            type === "inclusion" && "border-green-500/50 bg-green-500/10 hover:bg-green-500/20"
          )}
          onClick={() => setType("inclusion")}
        >
          Inclusion Criteria
        </Button>
        <Button
          variant="outline"
          className={cn(
            "flex-1",
            type === "exclusion" && "border-red-500/50 bg-red-500/10 hover:bg-red-500/20"
          )}
          onClick={() => setType("exclusion")}
        >
          Exclusion Criteria
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Category Select */}
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(CATEGORIES).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Field Select */}
        <Select value={field} onValueChange={setField} disabled={!category}>
          <SelectTrigger>
            <SelectValue placeholder="Field" />
          </SelectTrigger>
          <SelectContent>
            {category && MEDICAL_CRITERIA[category].map((field) => (
              <SelectItem key={field.value} value={field.value}>
                {field.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Operator Select */}
        <Select value={operator} onValueChange={setOperator} disabled={!field}>
          <SelectTrigger>
            <SelectValue placeholder="Operator" />
          </SelectTrigger>
          <SelectContent>
            {getValidOperators().map((op) => (
              <SelectItem key={op.value} value={op.value}>
                {op.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Value Input */}
        {operator && !['present', 'not_present'].includes(operator) && (
          <Input
            type={getSelectedField()?.units ? "number" : "text"}
            placeholder="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        )}

        {/* Unit Select */}
        {getSelectedField()?.units && value && (
          <Select value={unit} onValueChange={setUnit}>
            <SelectTrigger>
              <SelectValue placeholder="Unit" />
            </SelectTrigger>
            <SelectContent>
              {getSelectedField()?.units?.map((u) => (
                <SelectItem key={u} value={u}>
                  {u}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <Button
        onClick={addCriterion}
        disabled={!canAddCriterion}
        className="w-full"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Criterion
      </Button>

      <AnimatePresence>
        {criteria.map((criterion) => (
          <motion.div
            key={criterion.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={cn(
              "flex items-center gap-2 p-3 rounded-lg",
              criterion.type === "inclusion" 
                ? "bg-green-500/10 border border-green-500/20" 
                : "bg-red-500/10 border border-red-500/20"
            )}
          >
            <span className={cn(
              "px-2 py-1 rounded text-sm",
              criterion.type === "inclusion" 
                ? "bg-green-500/20 text-green-700 dark:text-green-300" 
                : "bg-red-500/20 text-red-700 dark:text-red-300"
            )}>
              {criterion.type === "inclusion" ? "Include" : "Exclude"}
            </span>
            <span className="text-muted-foreground capitalize">{
              Object.entries(CATEGORIES).find(([key]) => 
                MEDICAL_CRITERIA[key as keyof typeof MEDICAL_CRITERIA]
                  .some(f => f.value === criterion.field)
              )?.[1]
            }</span>
            <span className="font-medium">{
              Object.values(MEDICAL_CRITERIA)
                .flat()
                .find(f => f.value === criterion.field)?.label
            }</span>
            <span className="text-muted-foreground">{
              OPERATORS.find(op => op.value === criterion.operator)?.label
            }</span>
            <span>
              {criterion.value}
              {criterion.unit && ` ${criterion.unit}`}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto"
              onClick={() => removeCriterion(criterion.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button
        className="w-full"
        size="lg"
        disabled={criteria.length === 0}
        onClick={handleContinue}
      >
        Continue to Document Upload
      </Button>
    </div>
  );
}