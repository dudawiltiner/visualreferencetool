import { Button } from '@ui/button';
import { Label } from '@ui/label';
import { Check } from 'lucide-react';

import { RecentColorsProps } from './RecentColors.types';

export function RecentColors({
  recentColors,
  currentColor,
  onColorSelect,
}: RecentColorsProps) {
  return (
    <div className="space-y-2">
      <Label>Recent Colors</Label>
      <div className="grid grid-cols-5 gap-2">
        {recentColors.length > 0 ? (
          recentColors.map((color) => (
            <Button
              key={color}
              variant="outline"
              className="w-full h-8 p-0 relative"
              style={{ backgroundColor: color }}
              onClick={() => onColorSelect(color)}
              data-testid={`color-${color}`}
            >
              {currentColor === color && (
                <Check
                  className="h-3 w-3 text-white drop-shadow-md absolute"
                  data-testid={`check-icon-${color}`}
                />
              )}
            </Button>
          ))
        ) : (
          <p>No recent colors</p>
        )}
      </div>
    </div>
  );
}
