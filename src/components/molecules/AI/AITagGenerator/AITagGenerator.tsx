'use client';

import type {
  GenerateTagsError,
  GenerateTagsResponse,
} from '@hooks/AI/useGenerateTags';
import { useGenerateTags } from '@hooks/AI/useGenerateTags';
import { useToast } from '@hooks/General/use-toast';

import { Button } from '@ui/button';

import { AITagGeneratorProps } from './AITagGenerator.types';

export function AITagGenerator({
  imageUrl,
  onTagsGenerated,
}: AITagGeneratorProps) {
  const { toast } = useToast();
  const { mutate: generateTags, isPending: isLoading } = useGenerateTags();

  const handleGenerateTags = async () => {
    if (!imageUrl) {
      toast({
        title: 'No image selected',
        description: 'Please select an image first',
        variant: 'destructive',
      });
      return;
    }

    generateTags(
      { imageUrl },
      {
        onSuccess: (data: GenerateTagsResponse) => {
          if (data.isMock) {
            toast({
              title: 'Using simulated tags',
              description:
                'Add OPENAI_API_KEY to environment variables for AI-generated tags',
              variant: 'destructive',
            });
          } else {
            toast({
              title: 'Tags generated',
              description: `${data.tags.length} tags have been generated for the image`,
              variant: 'default',
            });
          }
          onTagsGenerated(data.tags);
        },
        onError: (error: GenerateTagsError) => {
          toast({
            title: 'Error generating tags',
            description:
              error.message ||
              'There was a problem generating tags for the image',
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
      onClick={handleGenerateTags}
      disabled={isLoading}
    >
      {isLoading ? 'Generating tags...' : 'Generate Tags from Image'}
    </Button>
  );
}
