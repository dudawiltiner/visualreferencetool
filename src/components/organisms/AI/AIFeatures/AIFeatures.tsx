import { AIColorExtractor } from '@molecules/AI/AIColorExtractor/AIColorExtractor';
import { AITagGenerator } from '@molecules/AI/AITagGenerator/AITagGenerator';
import { Alert, AlertDescription, AlertTitle } from '@ui/alert';
import { Separator } from '@ui/separator';
import { AlertCircle } from 'lucide-react';

import { AIFeaturesProps } from './AIFeatures.types';

export function AIFeatures({
  imageUrl,
  onTagsGenerated,
  onColorsExtracted,
}: AIFeaturesProps) {
  return (
    <>
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>AI Features Require API Key</AlertTitle>
        <AlertDescription>
          To use AI features, add your OpenAI API key as OPENAI_API_KEY in your
          environment variables. Without an API key, simulated results will be
          provided.
        </AlertDescription>
      </Alert>
      {imageUrl ? (
        <>
          <div className="rounded-md overflow-hidden border aspect-square relative">
            <img
              src={imageUrl || '/placeholder.svg'}
              alt="Preview"
              className="object-cover w-full h-full"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg?height=300&width=300';
              }}
            />
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Generate Tags</h3>
              <AITagGenerator
                imageUrl={imageUrl}
                onTagsGenerated={onTagsGenerated}
              />
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium mb-2">
                Extract Color Palette
              </h3>
              <AIColorExtractor
                imageUrl={imageUrl}
                onColorsExtracted={onColorsExtracted}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          Please enter an image URL in the Basic Info tab first
        </div>
      )}
    </>
  );
}
