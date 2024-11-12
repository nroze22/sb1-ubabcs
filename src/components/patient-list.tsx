import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronRight } from 'lucide-react';
import type { ScreeningResult } from '@/lib/types';

interface PatientListProps {
  results: ScreeningResult[];
  selectedResult: ScreeningResult | null;
  onSelectResult: (result: ScreeningResult) => void;
}

export function PatientList({ results, selectedResult, onSelectResult }: PatientListProps) {
  return (
    <ScrollArea className="h-[calc(100vh-12rem)]">
      {results.map((result, index) => (
        <motion.div
          key={result.patientId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="mb-2"
        >
          <Card
            className={`p-4 cursor-pointer transition-colors ${
              selectedResult?.patientId === result.patientId
                ? 'border-primary'
                : ''
            }`}
            onClick={() => onSelectResult(result)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Patient {result.patientId}</h3>
                <p className="text-sm text-muted-foreground">
                  Match Score: {result.matchScore.toFixed(1)}%
                </p>
              </div>
              <ChevronRight className="text-muted-foreground" />
            </div>
          </Card>
        </motion.div>
      ))}
    </ScrollArea>
  );
}