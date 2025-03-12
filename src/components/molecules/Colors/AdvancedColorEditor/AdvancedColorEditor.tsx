'use client';

import { useEffect, useState } from 'react';

import { useToast } from '@hooks/General/use-toast';

import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import { hexToRgba, hsvaToHex, rgbaToHsva } from '@uiw/color-convert';
import { Colorful, Sketch } from '@uiw/react-color';
import { Check, Copy } from 'lucide-react';

interface AdvancedColorEditorProps {
  color: string;
  onChange: (color: string) => void;
}

export function AdvancedColorEditor({
  color,
  onChange,
}: AdvancedColorEditorProps) {
  const [currentColor, setCurrentColor] = useState(color);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const { toast } = useToast();

  // Convert hex to hsva for the color pickers
  const hexToHsva = (hex: string) => {
    const rgba = hexToRgba(hex);
    return rgbaToHsva(rgba);
  };

  // Initialize with the current color
  useEffect(() => {
    setCurrentColor(color);
  }, [color]);

  // Handle color change from any picker
  const handleColorChange = (colorObj: any) => {
    const newHex = colorObj.hex || hsvaToHex(colorObj.hsva);
    setCurrentColor(newHex);
    onChange(newHex);
  };

  // Copy color to clipboard
  const copyToClipboard = (colorValue: string) => {
    navigator.clipboard.writeText(colorValue);
    setCopiedColor(colorValue);

    toast({
      title: 'Color copied',
      description: `${colorValue} has been copied to clipboard`,
    });

    setTimeout(() => {
      setCopiedColor(null);
    }, 2000);
  };

  // Get RGB values from hex
  const getRgbFromHex = (hex: string) => {
    const rgba = hexToRgba(hex);
    return `rgb(${rgba.r}, ${rgba.g}, ${rgba.b})`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
      onChange(value);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-10 h-10 rounded-md border"
            style={{ backgroundColor: currentColor }}
          />
          <div>
            <p className="font-medium">{currentColor}</p>
            <p className="text-xs text-muted-foreground">
              {getRgbFromHex(currentColor)}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => copyToClipboard(currentColor)}
        >
          {copiedColor === currentColor ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>

      <Tabs defaultValue="sketch">
        <TabsList className="grid grid-cols-2 h-auto">
          <TabsTrigger value="sketch" className="py-1.5">
            Sketch
          </TabsTrigger>
          <TabsTrigger value="colorful" className="py-1.5">
            Colorful
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sketch" className="pt-3">
          <Sketch
            color={hexToHsva(currentColor)}
            onChange={handleColorChange}
            style={{ width: '100%' }}
          />
        </TabsContent>

        <TabsContent value="colorful" className="pt-3">
          <Colorful
            color={hexToHsva(currentColor)}
            onChange={handleColorChange}
            style={{ width: '100%' }}
          />
        </TabsContent>
      </Tabs>

      <div className="space-y-2">
        <Label htmlFor="hex-input">Hex Color</Label>
        <div className="flex gap-2">
          <Input
            id="hex-input"
            value={currentColor}
            onChange={handleInputChange}
            placeholder="#000000"
            className="font-mono"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => copyToClipboard(currentColor)}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
