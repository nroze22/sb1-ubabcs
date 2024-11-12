import { useState } from 'react';
import { useNavigate, createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { useScreeningStore } from '@/lib/store';
import { PatientList } from '@/components/patient-list';
import { CriteriaMatches } from '@/components/criteria-matches';
import { DocumentViewer } from '@/components/document-viewer';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { ScreeningResult } from '@/lib/types';

function ResultsPage() {
  const navigate = useNavigate();
  const results = useScreeningStore((state) => state.results);
  const [selectedResult, setSelectedResult] = useState<ScreeningResult | null>(
    results[0] || null
  );

  if (!results?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <AlertCircle className="w-12 h-12 text-muted-foreground" />
        <h2 className="text-2xl font-semibold">No Results Available</h2>
        <p className="text-muted-foreground">Please start over and upload patient documents.</p>
        <Button onClick={() => navigate({ to: '/' })}>Start Over</Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-6 p-6">
      {/* Patient List */}
      <div className="col-span-3 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Patients</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={() => navigate({ to: '/' })}>
                  New Screening
                </Button>
              </TooltipTrigger>
              <TooltipContent>Start a new screening session</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <PatientList
          results={results}
          selectedResult={selectedResult}
          onSelectResult={setSelectedResult}
        />
      </div>

      {/* Criteria Matches */}
      <div className="col-span-5">
        <CriteriaMatches result={selectedResult} />
      </div>

      {/* Source Document */}
      <div className="col-span-4">
        <DocumentViewer result={selectedResult} />
      </div>
    </div>
  );
}

export const Route = createFileRoute('/results')({
  component: ResultsPage
});