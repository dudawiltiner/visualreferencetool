import { AddPaletteButton } from '@atoms/Palettes/AddPaletteButton/AddPaletteButton';
import { FilterBar } from '@molecules/Images/FilterBar/FilterBar';
import { PaletteExportImport } from '@molecules/Palettes/PaletteExportImport/PaletteExportImport';
import { PaletteGrid } from '@organisms/Palettes/PaletteGrid/PaletteGrid';

export default function PalettesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Color Palettes</h1>
        <div className="flex gap-2">
          <PaletteExportImport />
          <AddPaletteButton />
        </div>
      </div>
      <FilterBar type="palettes" />
      <PaletteGrid />
    </div>
  );
}
