export interface Criterion {
  id: string;
  type: 'inclusion' | 'exclusion';
  field: string;
  operator: string;
  value: string;
  unit?: string;
}

export interface Demographics {
  firstName: string | null;
  lastName: string | null;
  patientId: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  address: string | null;
}

export interface DetectedValue {
  field: string;
  value: string;
  confidence: number;
  sourceText: string;
  position: {
    start: number;
    end: number;
  };
}

export interface AnalysisResult {
  documentName: string;
  documentContent: string;
  detectedValues: DetectedValue[];
  demographics: Demographics;
  matchScore: number;
  eligibility: 'eligible' | 'ineligible' | 'pending';
  reasons: string[];
}