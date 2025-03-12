import { PaletteListItem } from '@molecules/Palettes/PaletteListItem/PaletteListItem';
import { Checkbox } from '@ui/checkbox';
import { clsx } from 'clsx';

import styles from './SelectablePaletteListItem.module.css';
import { SelectablePaletteListItemProps } from './SelectablePaletteListItem.types';

export function SelectablePaletteListItem({
  palette,
  isSelected,
  selectionMode,
  onSelect,
}: SelectablePaletteListItemProps) {
  const handleClick = () => {
    if (selectionMode) {
      onSelect(palette.id, !isSelected);
    }
  };

  return (
    <div
      data-testid="selectable-list-item"
      className={clsx(styles.container, {
        [styles.selectionMode]: selectionMode,
      })}
      onClick={handleClick}
    >
      <div className="relative group">
        <div className="absolute top-1/2 left-2 -translate-y-1/2 z-10">
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
          className={`pl-8 transition-opacity ${
            isSelected ? 'ring-2 ring-primary' : ''
          }`}
        >
          <PaletteListItem palette={palette} />
        </div>
      </div>
    </div>
  );
}
