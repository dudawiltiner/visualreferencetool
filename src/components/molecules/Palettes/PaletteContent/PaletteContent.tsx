import { Button } from '@ui/button';
import { Card } from '@ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import { Copy } from 'lucide-react';

import { PaletteContentProps } from './PaletteContent.types';

export function PaletteContent({
  palette,
  copiedColor,
  copyColor,
  hexToRgb,
  hexToHsl,
}: PaletteContentProps) {
  return (
    <Tabs defaultValue="hex" className="w-full p-2">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="hex">HEX</TabsTrigger>
        <TabsTrigger value="rgb">RGB</TabsTrigger>
        <TabsTrigger value="hsl">HSL</TabsTrigger>
      </TabsList>

      <TabsContent value="hex">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {palette.colors.map((color: string, index: number) => (
            <Card key={index} className="p-4">
              <div
                className="mb-2 h-24 w-full rounded-md"
                style={{ backgroundColor: color }}
              />
              <div className="flex items-center justify-between">
                <code className="text-sm">{color}</code>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyColor(color)}
                    data-testid="copy"
                  >
                    <Copy
                      className={`h-4 w-4 ${
                        copiedColor === color ? 'text-green-500' : ''
                      }`}
                    />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="rgb">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {palette.colors.map((color: string, index: number) => (
            <Card key={index} className="p-4">
              <div
                className="mb-2 h-24 w-full rounded-md"
                style={{ backgroundColor: color }}
              />
              <div className="flex items-center justify-between">
                <code className="text-sm">{hexToRgb(color)}</code>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyColor(hexToRgb(color))}
                    data-testid="copy"
                  >
                    <Copy
                      className={`h-4 w-4 ${
                        copiedColor === hexToRgb(color) ? 'text-green-500' : ''
                      }`}
                    />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="hsl">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {palette.colors.map((color: string, index: number) => (
            <Card key={index} className="p-4">
              <div
                className="mb-2 h-24 w-full rounded-md"
                style={{ backgroundColor: color }}
              />
              <div className="flex items-center justify-between">
                <code className="text-sm">{hexToHsl(color)}</code>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyColor(hexToHsl(color))}
                    data-testid="copy"
                  >
                    <Copy
                      className={`h-4 w-4 ${
                        copiedColor === hexToHsl(color) ? 'text-green-500' : ''
                      }`}
                    />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
