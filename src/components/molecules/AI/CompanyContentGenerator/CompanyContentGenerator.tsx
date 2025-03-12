'use client';

import { useState } from 'react';

import { useGenerateCompanyContent } from '@hooks/AI/useGenerateCompanyContent';
import { useToast } from '@hooks/General/use-toast';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@ui/alert-dialog';
import { Button } from '@ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@ui/dialog';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { AlertTriangle, Loader2 } from 'lucide-react';

import { useData } from '../../../../providers/DataProvider/DataProvider';

export function CompanyContentGenerator() {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  const { setImages, setPalettes, setGroups, setTags } = useData();
  const { toast } = useToast();
  const { mutate: generateContent, isPending: isLoading } =
    useGenerateCompanyContent();

  const handleGenerate = async () => {
    if (!companyName.trim()) {
      toast({
        title: 'Company name required',
        description: 'Please enter a company name',
        variant: 'destructive',
      });
      return;
    }

    generateContent(
      { companyName: companyName.trim() },
      {
        onSuccess: (data) => {
          setGeneratedContent(data);
          setIsConfirmOpen(true);
        },
        onError: (error) => {
          toast({
            title: 'Error generating content',
            description:
              error.message ||
              'There was a problem generating content for this company',
            variant: 'destructive',
          });
        },
      }
    );
  };

  const handleApplyContent = () => {
    if (!generatedContent) return;

    try {
      // Atualizar todos os dados de uma vez
      setGroups(generatedContent.groups);
      setTags(generatedContent.tags);
      setPalettes(generatedContent.palettes);
      setImages(generatedContent.images);

      // Fechar os diálogos
      setIsConfirmOpen(false);
      setIsOpen(false);

      // Notificar o usuário
      toast({
        title: 'Content generated',
        description: `Visual reference content for ${companyName} has been created`,
      });
    } catch (error) {
      console.error('Error applying content:', error);
      toast({
        title: 'Error applying content',
        description: 'There was a problem applying the generated content',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="outline">
        Generate Company Content
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Generate Company Content</DialogTitle>
            <DialogDescription>
              Enter a company name to automatically generate visual reference
              content including color palettes, tags, groups, and image
              suggestions.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input
                id="company-name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g., Spotify, Nike, Tesla"
              />
            </div>

            <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-md border border-amber-200 dark:border-amber-800">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800 dark:text-amber-300">
                  <p className="font-medium">
                    Warning: This will replace your existing content
                  </p>
                  <p className="mt-1">
                    Generating content for a company will replace all your
                    existing palettes, tags, groups, and images with
                    AI-generated content.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleGenerate} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Content'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apply Generated Content?</AlertDialogTitle>
            <AlertDialogDescription>
              This will replace all your existing content with the generated
              content for {companyName}.
            </AlertDialogDescription>
            <div className="my-4">
              <ul className="space-y-1 list-disc list-inside">
                <li>{generatedContent?.tags.length} tags</li>
                <li>{generatedContent?.groups.length} groups</li>
                <li>{generatedContent?.palettes.length} color palettes</li>
                <li>{generatedContent?.images.length} images</li>
              </ul>
            </div>
            <div className="text-sm text-muted-foreground">
              This action cannot be undone.
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleApplyContent}>
              Apply Content
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
