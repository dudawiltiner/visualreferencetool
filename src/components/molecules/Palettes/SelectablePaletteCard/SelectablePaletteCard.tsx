import { PaletteCard } from '@molecules/Palettes/PaletteCard/PaletteCard';
import { Checkbox } from '@ui/checkbox';
import { clsx } from 'clsx';

import styles from './SelectablePaletteCard.module.css';
import { SelectablePaletteCardProps } from './SelectablePaletteCard.types';

export function SelectablePaletteCard({
  palette,
  isSelected,
  selectionMode,
  onSelect,
}: SelectablePaletteCardProps) {
  const handleClick = () => {
    if (selectionMode) {
      onSelect(palette.id, !isSelected);
    }
  };

  return (
    <div
      data-testid="selectable-card"
      className={clsx(styles.container, {
        [styles.selectionMode]: selectionMode,
      })}
      onClick={handleClick}
    >
      <div className="relative group h-full">
        <div className="absolute top-2 left-2 z-10">
          <Checkbox
            checked={isSelected}
            onCheckedChange={(checked) => onSelect(palette.id, !!checked)}
            className={`h-5 w-5 ${
              selectionMode
                ? 'opacity-100'
                : 'opacity-0 group-hover:opacity-100'
            }`}
          />
        </div>
        <div
          className={`h-full transition-opacity ${
            isSelected ? 'ring-2 ring-primary ring-offset-2' : ''
          }`}
        >
          <PaletteCard palette={palette} />
        </div>
      </div>
    </div>
  );
}
