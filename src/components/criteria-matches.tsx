import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check, X } from 'lucide-react';
import type { ScreeningResult } from '@/lib/types';

interface CriteriaMatchesProps {
  result: ScreeningResult | null;
}

export function CriteriaMatches({ result }: CriteriaMatchesProps) {
  if (!result) return null;

  return (
    <Card className="h-[calc(100vh-8rem)]">
      <ScrollArea className="h-full p-6">
        <h2 className="text-2xl font-bold mb-6">Criteria Matches</h2>
        {result.detectedValues.map((match, index) => (
          <div
            key={`${result.patientId}-match-${index}`}
            className="mb-4 p-4 rounded-lg border bg-card"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{match.field}</h3>
              {match.confidence > 70 ? (
                <Check className="text-green-500" />
              ) : (
                <X className="text-red-500" />
              )}
            </div>
            <p className="text-sm">
              Value: <span className="font-medium">{match.value}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Confidence: {match.confidence.toFixed(1)}%
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Source: "{match.sourceText}"
            </p>
          </div>
        ))}
      </ScrollArea>
    </Card>
  );
}