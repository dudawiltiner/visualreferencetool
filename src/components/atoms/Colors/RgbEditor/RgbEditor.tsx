import { Input } from '@ui/input';
import { Slider } from '@ui/slider';

import { RgbEditorProps } from './RgbEditor.types';

export function RgbEditor({ rgb, onChange }: RgbEditorProps) {
  return (
    <div className="space-y-4 pt-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="red"
          >
            Red ({rgb.r})
          </label>
          <Input
            id="red"
            type="number"
            min="0"
            max="255"
            value={rgb.r}
            onChange={(e) => {
              const value = Number.parseInt(e.target.value);
              if (isNaN(value)) {
                onChange('r', 0);
              } else {
                onChange('r', Math.min(Math.max(value, 0), 255));
              }
            }}
            className="flex rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-16 h-8"
            data-testid="red-input"
          />
        </div>
        <Slider
          value={[rgb.r]}
          min={0}
          max={255}
          step={1}
          onValueChange={(value) => onChange('r', value[0])}
          className="[&_[role=slider]]:bg-red-500"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="green"
          >
            Green ({rgb.g})
          </label>
          <Input
            id="green"
            type="number"
            min="0"
            max="255"
            value={rgb.g}
            onChange={(e) => {
              const value = Number.parseInt(e.target.value);
              if (isNaN(value)) {
                onChange('g', 0);
              } else {
                onChange('g', Math.min(Math.max(value, 0), 255));
              }
            }}
            className="flex rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-16 h-8"
            data-testid="green-input"
          />
        </div>
        <Slider
          value={[rgb.g]}
          min={0}
          max={255}
          step={1}
          onValueChange={(value) => onChange('g', value[0])}
          className="[&_[role=slider]]:bg-green-500"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="blue"
          >
            Blue ({rgb.b})
          </label>
          <Input
            id="blue"
            type="number"
            min="0"
            max="255"
            value={rgb.b}
            onChange={(e) => {
              const value = Number.parseInt(e.target.value);
              if (isNaN(value)) {
                onChange('b', 0);
              } else {
                onChange('b', Math.min(Math.max(value, 0), 255));
              }
            }}
            className="flex rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-16 h-8"
            data-testid="blue-input"
          />
        </div>
        <Slider
          value={[rgb.b]}
          min={0}
          max={255}
          step={1}
          onValueChange={(value) => onChange('b', value[0])}
          className="[&_[role=slider]]:bg-blue-500"
        />
      </div>
    </div>
  );
}
