'use client';

import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover';
import { Check, Copy } from 'lucide-react';

import { ColorPickers } from '../ColorPickers/ColorPickers';
import { RecentColors } from '../RecentColors/RecentColors';
import { useAdvancedColorPicker } from './AdvancedColorPicker.hook';
import { AdvancedColorPickerProps } from './AdvancedColorPicker.types';

export function AdvancedColorPicker({
  color,
  onChange,
}: AdvancedColorPickerProps) {
  const {
    isOpen,
    setIsOpen,
    currentColor,
    pickerType,
    setPickerType,
    recentColors,
    copiedColor,
    hexToHsva,
    handleColorChange,
    applyColor,
    copyToClipboard,
    getRgbFromHex,
  } = useAdvancedColorPicker({ color, onChange });

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-10 h-10 p-0 flex-shrink-0 border-2"
          style={{ backgroundColor: color }}
        >
          <span className="sr-only">Pick a color</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-4 space-y-4">
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

          <ColorPickers
            pickerType={pickerType}
            setPickerType={setPickerType}
            currentColor={currentColor}
            hexToHsva={hexToHsva}
            onChange={handleColorChange}
          />

          <RecentColors
            recentColors={recentColors}
            currentColor={currentColor}
            onColorSelect={(color) => handleColorChange({ hex: color })}
          />

          <div className="space-y-2">
            <Label htmlFor="hex-input">Hex Color</Label>
            <div className="flex gap-2">
              <Input
                id="hex-input"
                value={currentColor}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.startsWith('#') && value.length <= 7) {
                    handleColorChange({ hex: value });
                  } else if (!value.startsWith('#')) {
                    handleColorChange({ hex: `#${value}` });
                  }
                }}
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

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={applyColor}>Apply</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
