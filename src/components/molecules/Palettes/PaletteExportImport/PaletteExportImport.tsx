'use client';

import type React from 'react';
import { useRef } from 'react';

import { useToast } from '@hooks/General/use-toast';

import { useData } from '@providers/DataProvider/DataProvider';
import { Button } from '@ui/button';
import { Download, Upload } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export function PaletteExportImport() {
  const { palettes, setPalettes } = useData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleExport = () => {
    if (palettes.length === 0) {
      toast({
        title: 'No palettes to export',
        description: 'Create some color palettes first',
        variant: 'destructive',
      });
      return;
    }

    // Create a JSON file with the palettes
    const dataStr = JSON.stringify(palettes, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(
      dataStr
    )}`;

    // Create a download link and trigger it
    const exportFileDefaultName = `color-palettes-${new Date()
      .toISOString()
      .slice(0, 10)}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    toast({
      title: 'Palettes exported',
      description: `${palettes.length} palettes have been exported to JSON`,
    });
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedPalettes = JSON.parse(event.target?.result as string);

        // Validate the imported data
        if (!Array.isArray(importedPalettes)) {
          throw new Error('Invalid format: Expected an array of palettes');
        }

        // Ensure each palette has the required fields
        const validPalettes = importedPalettes
          .filter((palette) => {
            return (
              palette.name &&
              Array.isArray(palette.colors) &&
              palette.colors.length > 0
            );
          })
          .map((palette) => ({
            ...palette,
            id: palette.id || uuidv4(), // Ensure each palette has an ID
            createdAt: palette.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }));

        if (validPalettes.length === 0) {
          throw new Error('No valid palettes found in the imported file');
        }

        // Add the imported palettes to the existing ones
        setPalettes([...palettes, ...validPalettes]);

        toast({
          title: 'Palettes imported',
          description: `${validPalettes.length} palettes have been imported`,
        });
      } catch (error) {
        console.error('Error importing palettes:', error);
        toast({
          title: 'Import failed',
          description: 'There was a problem importing the palettes',
          variant: 'destructive',
        });
      }
    };
    reader.readAsText(file);

    // Reset the file input
    e.target.value = '';
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={handleExport}>
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>
      <Button variant="outline" size="sm" onClick={handleImport}>
        <Upload className="h-4 w-4 mr-2" />
        Import
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />
    </div>
  );
}
