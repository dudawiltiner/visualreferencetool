'use client';

import { useImageColors } from '@hooks/AI/useImageColors';
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
  const { isLoading, extractColors } = useImageColors(imageUrl, {
    manual: true,
  });

  const handleExtractColors = async () => {
    if (!imageUrl) {
      toast({
        title: 'No image selected',
        description: 'Please select an image first',
        variant: 'destructive',
      });
      return;
    }

    try {
      const colors = await extractColors();
      onColorsExtracted(colors);
      toast({
        title: 'Colors extracted',
        description: 'The colors have been added to your palette',
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: 'Error extracting colors',
        description:
          error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    }
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
