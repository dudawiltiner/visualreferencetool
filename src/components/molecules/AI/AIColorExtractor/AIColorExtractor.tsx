'use client';

import { useExtractColors } from '@hooks/AI/useExtractColors';
import { useToast } from '@hooks/General/use-toast';

import { Button } from '@ui/button';

interface AIColorExtractorProps {
  imageUrl: string;
  onColorsExtracted: (colors: string[]) => void;
}

export function AIColorExtractor({
  imageUrl,
  onColorsExtracted,
}: AIColorExtractorProps) {
  const { toast } = useToast();
  const { mutate: extractColors, isPending: isLoading } = useExtractColors();

  const handleExtractColors = async () => {
    if (!imageUrl) {
      toast({
        title: 'No image selected',
        description: 'Please select an image first',
        variant: 'destructive',
      });
      return;
    }

    extractColors(
      { imageUrl },
      {
        onSuccess: (data) => {
          onColorsExtracted(data.colors);
          toast({
            title: 'Colors extracted',
            description: 'The colors have been added to your palette',
            variant: 'default',
          });
        },
        onError: (error) => {
          toast({
            title: 'Error extracting colors',
            description: error.message || 'An error occurred',
            variant: 'destructive',
          });
        },
      }
    );
  };

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={handleExtractColors}
      disabled={isLoading}
    >
      {isLoading ? 'Extracting colors...' : 'Extract Colors from Image'}
    </Button>
  );
}
