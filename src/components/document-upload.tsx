import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Upload, File as FileIcon, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { useScreeningStore } from '@/lib/store';
import { OpenAIKeyDialog } from './openai-key-dialog';
import { analyzeDocuments } from '@/lib/api';

interface ProcessedFile {
  name: string;
  content: string;
  size: number;
}

export function DocumentUpload() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<ProcessedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showKeyDialog, setShowKeyDialog] = useState(false);
  
  const { settings, criteria, setResults } = useScreeningStore();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    setIsProcessing(true);
    const newFiles = Array.from(e.target.files);
    const processedFiles: ProcessedFile[] = [];

    try {
      for (const file of newFiles) {
        if (!file.name.endsWith('.txt')) {
          toast.error('Only .txt files are currently supported');
          continue;
        }

        const text = await file.text();
        processedFiles.push({
          name: file.name,
          content: text,
          size: file.size
        });
      }

      if (processedFiles.length > 0) {
        setFiles(prev => [...prev, ...processedFiles]);
        toast.success(`Added ${processedFiles.length} file(s)`);
      }
    } catch (error) {
      console.error('Error processing files:', error);
      toast.error('Failed to process files. Please try again.');
    } finally {
      setIsProcessing(false);
      e.target.value = ''; // Reset input
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleAnalyze = async () => {
    if (!settings.openaiKey) {
      setShowKeyDialog(true);
      return;
    }

    if (files.length === 0) {
      toast.error('Please upload at least one document');
      return;
    }

    if (!criteria || criteria.length === 0) {
      toast.error('Please define at least one screening criterion');
      navigate({ to: '/criteria' });
      return;
    }

    setIsProcessing(true);

    try {
      const fileObjects = files.map(f => 
        new File([f.content], f.name, { type: 'text/plain' })
      );

      const results = await analyzeDocuments(
        fileObjects,
        criteria,
        settings.openaiKey,
        (current, total) => {
          console.log(`Processing ${current}/${total}`);
        }
      );
      
      if (results.length > 0) {
        setResults(results);
        navigate({ to: '/results' });
      } else {
        throw new Error('No results were generated from the analysis');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : 'Failed to analyze documents. Please try again.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <Label htmlFor="documents">Upload Patient Documents</Label>
        <div className="mt-2">
          <Input
            id="documents"
            type="file"
            multiple
            accept=".txt"
            onChange={handleFileChange}
            className="hidden"
            disabled={isProcessing}
          />
          <Button
            asChild
            variant="outline"
            className="w-full h-32 flex flex-col gap-2"
            disabled={isProcessing}
          >
            <label htmlFor="documents">
              {isProcessing ? (
                <Loader2 className="h-8 w-8 animate-spin" />
              ) : (
                <Upload className="h-8 w-8" />
              )}
              <span>
                {isProcessing ? 'Processing...' : 'Drop files here or click to upload'}
              </span>
              <span className="text-sm text-muted-foreground">
                Supported formats: .txt files only
              </span>
            </label>
          </Button>
        </div>
      </Card>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Uploaded Files</h3>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {files.map((file, index) => (
                    <motion.div
                      key={`${file.name}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <Card className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <FileIcon className="h-4 w-4" />
                            <span className="font-medium">{file.name}</span>
                            <span className="text-sm text-muted-foreground">
                              ({(file.size / 1024).toFixed(1)} KB)
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFile(index)}
                            disabled={isProcessing}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <ScrollArea className="h-32 w-full rounded-md border p-2">
                          <pre className="text-sm whitespace-pre-wrap">
                            {file.content}
                          </pre>
                        </ScrollArea>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {files.length > 0 && (
        <div className="flex justify-end">
          <Button
            onClick={handleAnalyze}
            disabled={isProcessing}
            className="gap-2"
          >
            {isProcessing && <Loader2 className="h-4 w-4 animate-spin" />}
            {isProcessing ? 'Analyzing...' : 'Analyze Documents'}
          </Button>
        </div>
      )}

      <OpenAIKeyDialog
        open={showKeyDialog}
        onOpenChange={setShowKeyDialog}
        onSuccess={handleAnalyze}
      />
    </div>
  );
}