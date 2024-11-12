import { Check, X } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { ScreeningResult } from '@/lib/types';

export function ResultsList({
  results,
  selectedResult,
  onSelectResult,
}: {
  results: ScreeningResult[];
  selectedResult: ScreeningResult | null;
  onSelectResult: (result: ScreeningResult) => void;
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Screening Results</CardTitle>
        <CardDescription>
          {results.length} patient records analyzed
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-12rem)]">
          {results.map((result) => (
            <div
              key={result.patientId}
              className={cn(
                'p-4 border-b cursor-pointer hover:bg-secondary/50 transition-colors',
                selectedResult?.patientId === result.patientId &&
                  'bg-secondary/50'
              )}
              onClick={() => onSelectResult(result)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Patient {result.patientId}</h3>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'text-sm px-2 py-1 rounded-full',
                      result.eligibility === 'eligible' &&
                        'bg-green-500/20 text-green-500',
                      result.eligibility === 'ineligible' &&
                        'bg-red-500/20 text-red-500',
                      result.eligibility === 'pending' &&
                        'bg-yellow-500/20 text-yellow-500'
                    )}
                  >
                    {result.eligibility === 'eligible' && (
                      <Check className="h-4 w-4" />
                    )}
                    {result.eligibility === 'ineligible' && (
                      <X className="h-4 w-4" />
                    )}
                    {result.eligibility === 'pending' && 'Pending'}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(result.matchScore * 100)}% match
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {result.documentName}
              </p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}