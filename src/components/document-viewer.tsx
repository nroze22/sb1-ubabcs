import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { ScreeningResult } from '@/lib/types';

interface DocumentViewerProps {
  result: ScreeningResult | null;
}

export function DocumentViewer({ result }: DocumentViewerProps) {
  if (!result) return null;

  return (
    <Card className="h-[calc(100vh-8rem)]">
      <ScrollArea className="h-full p-6">
        <h2 className="text-2xl font-bold mb-6">Source Document</h2>
        <div>
          <h3 className="font-medium mb-2">{result.documentName}</h3>
          <p className="whitespace-pre-wrap text-sm">
            {result.documentContent}
          </p>
        </div>
      </ScrollArea>
    </Card>
  );
}