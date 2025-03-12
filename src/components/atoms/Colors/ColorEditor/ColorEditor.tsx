'use client';

import { useEffect, useState } from 'react';

import { useToast } from '@hooks/General/use-toast';

import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import { Copy } from 'lucide-react';

import { HslEditor } from '../HslEditor/HslEditor';
import { RgbEditor } from '../RgbEditor/RgbEditor';
import { useColorConversion } from './ColorConversion.hook';
import { ColorEditorProps } from './ColorEditor.types';

export function ColorEditor({ color, onChange }: ColorEditorProps) {
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 });
  const [hsl, setHsl] = useState({ h: 0, s: 0, l: 0 });
  const [hex, setHex] = useState('#000000');

  const { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } = useColorConversion();
  const { toast } = useToast();

  // Initialize color values
  useEffect(() => {
    if (color.startsWith('#')) {
      setHex(color);
      const rgbValues = hexToRgb(color);
      setRgb(rgbValues);
      setHsl(rgbToHsl(rgbValues.r, rgbValues.g, rgbValues.b));
    }
  }, [color]);

  // Handle RGB changes
  const handleRgbChange = (channel: 'r' | 'g' | 'b', value: number) => {
    const newRgb = { ...rgb, [channel]: value };
    setRgb(newRgb);
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setHex(newHex);
    setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
    onChange(newHex);
  };

  // Handle HSL changes
  const handleHslChange = (channel: 'h' | 's' | 'l', value: number) => {
    const newHsl = { ...hsl, [channel]: value };
    setHsl(newHsl);
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    setRgb(newRgb);
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setHex(newHex);
    onChange(newHex);
  };

  // Handle hex input change
  const handleHexChange = (value: string) => {
    const formattedValue = value.startsWith('#') ? value : `#${value}`;
    setHex(formattedValue);
    if (formattedValue.length === 7) {
      const rgbValues = hexToRgb(formattedValue);
      setRgb(rgbValues);
      setHsl(rgbToHsl(rgbValues.r, rgbValues.g, rgbValues.b));
      onChange(formattedValue);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(color);
    toast({
      title: 'Color copied!',
      description: `${color} has been copied to your clipboard.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="h-16 rounded-md" style={{ backgroundColor: hex }} />

      <Tabs defaultValue="rgb">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="rgb">RGB</TabsTrigger>
          <TabsTrigger value="hsl">HSL</TabsTrigger>
          <TabsTrigger value="hex">HEX</TabsTrigger>
        </TabsList>

        <TabsContent value="rgb">
          <RgbEditor rgb={rgb} onChange={handleRgbChange} />
        </TabsContent>

        <TabsContent value="hsl">
          <HslEditor hsl={hsl} onChange={handleHslChange} />
        </TabsContent>

        <TabsContent value="hex" className="pt-4">
          <div className="space-y-2">
            <Label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="hex"
            >
              Hex
            </Label>
            <div className="flex gap-2">
              <Input
                id="hex"
                type="text"
                value={hex}
                data-testid="hex-input"
                onChange={(e) => handleHexChange(e.target.value)}
                className="flex rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-32 h-8"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopy}
                data-testid="copy-button"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
