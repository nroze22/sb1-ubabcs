import type mammoth from 'mammoth';

export interface ProcessedDocument {
  name: string;
  content: string;
  type: string;
  size: number;
}

async function extractTextFromDocx(file: File): Promise<string> {
  const mammothModule = await import('mammoth');
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammothModule.default.extractRawText({ arrayBuffer });
  return result.value;
}

async function extractTextFromPdf(file: File): Promise<string> {
  const { getDocument } = await import('pdfjs-dist');
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: arrayBuffer }).promise;
  
  let text = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item: any) => item.str)
      .join(' ');
    text += pageText + '\n';
  }
  
  return text;
}

async function extractTextFromTxt(file: File): Promise<string> {
  return await file.text();
}

export async function processDocument(file: File): Promise<ProcessedDocument> {
  try {
    let content: string;
    
    switch (file.type) {
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        content = await extractTextFromDocx(file);
        break;
      case 'application/pdf':
        content = await extractTextFromPdf(file);
        break;
      case 'text/plain':
        content = await extractTextFromTxt(file);
        break;
      default:
        if (file.name.endsWith('.txt')) {
          content = await extractTextFromTxt(file);
        } else {
          throw new Error('Unsupported file type');
        }
    }

    // Clean the extracted text
    content = content
      .replace(/\r\n/g, '\n')
      .replace(/\u0000/g, '') // Remove null characters
      .replace(/^\uFEFF/, '') // Remove BOM
      .replace(/\n{3,}/g, '\n\n') // Normalize multiple line breaks
      .trim();

    if (!content) {
      throw new Error('No content could be extracted');
    }

    return {
      name: file.name,
      content,
      type: file.type || 'text/plain',
      size: file.size,
    };
  } catch (error) {
    console.error(`Error processing ${file.name}:`, error);
    throw error;
  }
}