import { useState } from 'react';

import { useToast } from '@hooks/General/use-toast';

import type { EditingColor } from '@lib/types';
import { useData } from '@providers/DataProvider/DataProvider';

export function usePaletteDetails() {
  const {
    palettes: storedPalettes,
    setPalettes: setStoredPalettes,
    groups,
    tags,
  } = useData();
  const [editingColor, setEditingColor] = useState<EditingColor | null>(null);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const { toast } = useToast();

  const handleColorChange = (
    paletteId: string,
    colorIndex: number,
    newColor: string
  ) => {
    const updatedPalettes = storedPalettes.map((p) =>
      p.id === paletteId
        ? {
            ...p,
            colors: p.colors.map((c, i) => (i === colorIndex ? newColor : c)),
            updatedAt: new Date().toISOString(),
          }
        : p
    );
    setStoredPalettes(updatedPalettes);
  };

  const handleDelete = (paletteId: string) => {
    const updatedPalettes = storedPalettes.filter((p) => p.id !== paletteId);
    setStoredPalettes(updatedPalettes);

    toast({
      title: 'Palette deleted',
      description: 'The palette has been removed from your collection',
    });
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);

    toast({
      title: 'Color copied',
      description: `${color} has been copied to clipboard`,
    });

    setTimeout(() => {
      setCopiedColor(null);
    }, 2000);
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
          result[3],
          16
        )})`
      : hex;
  };

  const hexToHsl = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return hex;

    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return `hsl(${Math.round(h * 360)}°, ${Math.round(s * 100)}%, ${Math.round(
      l * 100
    )}%)`;
  };

  return {
    groups,
    tags,
    editingColor,
    setEditingColor,
    copiedColor,
    handleColorChange,
    handleDelete,
    copyColor,
    hexToRgb,
    hexToHsl,
  };
}
