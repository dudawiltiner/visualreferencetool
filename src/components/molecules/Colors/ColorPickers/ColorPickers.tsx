import { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

import { useToast } from '@hooks/General/use-toast';

import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import {
  Chrome,
  Circle,
  Compact,
  Material,
  Sketch,
  Wheel,
} from '@uiw/react-color';
import { Copy } from 'lucide-react';

import { ColorPickersProps } from './ColorPickers.types';

export function ColorPickers({
  pickerType,
  setPickerType,
  currentColor,
  hexToHsva,
  onChange,
}: ColorPickersProps) {
  const [hexValue, setHexValue] = useState(currentColor);
  const { toast } = useToast();

  useEffect(() => {
    setHexValue(currentColor);
  }, [currentColor]);

  const handleHexChange = (value: string) => {
    setHexValue(value);
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      onChange(value);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hexValue);
    toast({
      title: 'Color copied!',
      description: `${hexValue} has been copied to your clipboard.`,
    });
  };

  return (
    <Tabs
      defaultValue="sketch"
      onValueChange={setPickerType}
      value={pickerType}
    >
      <TabsList className="grid grid-cols-4 h-auto">
        <TabsTrigger value="sketch" className="py-1.5">
          Sketch
        </TabsTrigger>
        <TabsTrigger value="chrome" className="py-1.5">
          Chrome
        </TabsTrigger>
        <TabsTrigger value="wheel" className="py-1.5">
          Wheel
        </TabsTrigger>
        <TabsTrigger value="more" className="py-1.5">
          More
        </TabsTrigger>
      </TabsList>

      <TabsContent value="sketch" className="pt-3">
        <Sketch
          color={hexToHsva(currentColor)}
          onChange={onChange}
          style={{ width: '100%' }}
        />
      </TabsContent>

      <TabsContent value="chrome" className="pt-3">
        <Chrome
          color={hexToHsva(currentColor)}
          onChange={onChange}
          style={{ width: '100%' }}
        />
      </TabsContent>

      <TabsContent value="wheel" className="pt-3">
        <Wheel
          color={hexToHsva(currentColor)}
          onChange={onChange}
          style={{ width: '100%', margin: '0 auto' }}
        />
      </TabsContent>

      <TabsContent value="more" className="pt-3">
        <Tabs defaultValue="material">
          <TabsList className="grid grid-cols-3 h-auto">
            <TabsTrigger value="material" className="py-1.5">
              Material
            </TabsTrigger>
            <TabsTrigger value="compact" className="py-1.5">
              Compact
            </TabsTrigger>
            <TabsTrigger value="circle" className="py-1.5">
              Circle
            </TabsTrigger>
          </TabsList>

          <TabsContent value="material" className="pt-3">
            <Material
              color={hexToHsva(currentColor)}
              onChange={onChange}
              style={{ width: '100%' }}
            />
          </TabsContent>

          <TabsContent value="compact" className="pt-3">
            <Compact
              color={hexToHsva(currentColor)}
              onChange={onChange}
              style={{ width: '100%' }}
            />
          </TabsContent>

          <TabsContent value="circle" className="pt-3">
            <Circle
              color={hexToHsva(currentColor)}
              onChange={onChange}
              style={{ width: '100%' }}
            />
          </TabsContent>
        </Tabs>
      </TabsContent>

      <TabsContent value="hex" className="pt-3">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Color Picker</Label>
            <HexColorPicker
              color={currentColor}
              onChange={onChange}
              data-testid="hex-color-picker"
            />
          </div>

          <div className="space-y-2">
            <Label>Hex Value</Label>
            <div className="flex gap-2">
              <Input
                value={hexValue}
                onChange={(e) => handleHexChange(e.target.value)}
                data-testid="hex-input"
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
        </div>
      </TabsContent>
    </Tabs>
  );
}
