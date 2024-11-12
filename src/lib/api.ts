import type { Criterion, AnalysisResult } from '@/lib/types';

const SYSTEM_PROMPT = `You are a medical data extraction expert. Analyze the patient document against the provided criteria and extract relevant information.

Instructions:
1. Extract exact values with their surrounding context
2. Assign confidence scores based on match quality (0-100)
3. Identify key patient demographics
4. Evaluate eligibility based on criteria matches

Output must be valid JSON matching this schema:
{
  "detectedValues": [
    {
      "field": string,        // Name of the matched field
      "value": string,        // Extracted value
      "confidence": number,   // Confidence score (0-100)
      "sourceText": string,   // Original text containing the match
      "position": {
        "start": number,
        "end": number
      }
    }
  ],
  "demographics": {
    "firstName": string | null,
    "lastName": string | null,
    "patientId": string | null,
    "dateOfBirth": string | null,
    "gender": string | null,
    "address": string | null
  },
  "matchScore": number,      // Overall match score (0-100)
  "eligibility": "eligible" | "ineligible" | "pending",
  "reasons": string[]        // Reasons for eligibility decision
}`;

async function analyzeDocument(
  content: string,
  fileName: string,
  criteria: Criterion[],
  apiKey: string
): Promise<AnalysisResult> {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: `Analyze this patient document against the provided criteria:

Document: ${fileName}
Content: ${content}

Criteria:
${criteria.map(c => `- ${c.type}: ${c.field} ${c.operator} ${c.value}${c.unit ? ` ${c.unit}` : ''}`).join('\n')}

Provide the analysis results in JSON format.`
          }
        ],
        temperature: 0.1,
        response_format: { type: 'json_object' }
      }),
    });

    if (!response.ok) {
      throw new Error(`API error (${response.status}): Failed to analyze ${fileName}`);
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);

    return {
      ...result,
      documentName: fileName,
      documentContent: content,
    };
  } catch (error) {
    console.error(`Error analyzing ${fileName}:`, error);
    throw error;
  }
}

export async function analyzeDocuments(
  files: File[],
  criteria: Criterion[],
  apiKey: string,
  onProgress?: (current: number, total: number) => void
): Promise<AnalysisResult[]> {
  const results: AnalysisResult[] = [];
  const errors: Error[] = [];

  for (let i = 0; i < files.length; i++) {
    try {
      const content = await files[i].text();
      const result = await analyzeDocument(content, files[i].name, criteria, apiKey);
      results.push(result);
      onProgress?.(i + 1, files.length);
    } catch (error) {
      errors.push(error instanceof Error ? error : new Error(String(error)));
    }
  }

  if (errors.length === files.length) {
    throw new Error('All files failed to process: ' + errors.map(e => e.message).join(', '));
  }

  return results;
}