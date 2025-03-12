import { useState } from 'react';

import { useToast } from '@hooks/General/use-toast';

import { hexToRgba, hsvaToHex, rgbaToHsva } from '@uiw/color-convert';

interface UseAdvancedColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export function useAdvancedColorPicker({
  color,
  onChange,
}: UseAdvancedColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState(color);
  const [pickerType, setPickerType] = useState<string>('sketch');
  const [recentColors, setRecentColors] = useState<string[]>([
    '#FF5733',
    '#33FF57',
    '#3357FF',
    '#F3FF33',
    '#FF33F3',
    '#33FFF5',
    '#FF3333',
    '#FFAA33',
    '#33FFAA',
    '#AA33FF',
  ]);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const { toast } = useToast();

  // Convert hex to hsva for the color pickers
  const hexToHsva = (hex: string) => {
    const rgba = hexToRgba(hex);
    return rgbaToHsva(rgba);
  };

  // Handle color change from any picker
  const handleColorChange = (colorObj: any) => {
    const newHex = colorObj.hex || hsvaToHex(colorObj.hsva);
    setCurrentColor(newHex);
  };

  // Apply the selected color
  const applyColor = () => {
    onChange(currentColor);

    // Add to recent colors if not already there
    if (!recentColors.includes(currentColor)) {
      setRecentColors([currentColor, ...recentColors.slice(0, 9)]);
    }

    setIsOpen(false);
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

  return {
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
  };
}
