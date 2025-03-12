import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { Slider } from '@ui/slider';

import { HslEditorProps } from './HslEditor.types';

export function HslEditor({ hsl, onChange }: HslEditorProps) {
  return (
    <div className="space-y-4 pt-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="hue">Hue ({hsl.h}°)</Label>
          <Input
            id="hue"
            type="number"
            min="0"
            max="360"
            value={hsl.h}
            onChange={(e) => {
              const value = Number.parseInt(e.target.value);
              if (isNaN(value)) {
                onChange('h', 0);
              } else {
                onChange('h', Math.min(Math.max(value, 0), 360));
              }
            }}
            className="w-16 h-8"
            data-testid="hue-input"
          />
        </div>
        <div
          className="h-4 rounded-full"
          style={{
            background:
              'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
          }}
        />
        <Slider
          min={0}
          max={360}
          value={[hsl.h]}
          onValueChange={([value]) => onChange('h', value)}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="saturation"
          >
            Saturation ({hsl.s}%)
          </label>
          <input
            id="saturation"
            type="number"
            min="0"
            max="100"
            value={hsl.s}
            onChange={(e) => {
              const value = Number.parseInt(e.target.value);
              if (isNaN(value)) {
                onChange('s', 0);
              } else {
                onChange('s', Math.min(Math.max(value, 0), 100));
              }
            }}
            className="flex rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-16 h-8"
            data-testid="saturation-input"
          />
        </div>
        <div
          className="h-4 rounded-full"
          style={{
            background: `linear-gradient(to right, hsl(${hsl.h}, 0%, ${hsl.l}%), hsl(${hsl.h}, 100%, ${hsl.l}%))`,
          }}
        />
        <Slider
          value={[hsl.s]}
          min={0}
          max={100}
          step={1}
          onValueChange={(value) => onChange('s', value[0])}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="lightness"
          >
            Lightness ({hsl.l}%)
          </label>
          <input
            id="lightness"
            type="number"
            min="0"
            max="100"
            value={hsl.l}
            onChange={(e) => {
              const value = Number.parseInt(e.target.value);
              if (isNaN(value)) {
                onChange('l', 0);
              } else {
                onChange('l', Math.min(Math.max(value, 0), 100));
              }
            }}
            className="flex rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-16 h-8"
            data-testid="lightness-input"
          />
        </div>
        <div
          className="h-4 rounded-full"
          style={{
            background: `linear-gradient(to right, hsl(${hsl.h}, ${hsl.s}%, 0%), hsl(${hsl.h}, ${hsl.s}%, 50%), hsl(${hsl.h}, ${hsl.s}%, 100%))`,
          }}
        />
        <Slider
          value={[hsl.l]}
          min={0}
          max={100}
          step={1}
          onValueChange={(value) => onChange('l', value[0])}
        />
      </div>
    </div>
  );
}
