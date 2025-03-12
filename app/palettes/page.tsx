import { AddPaletteButton } from '@atoms/Palettes/AddPaletteButton/AddPaletteButton';
import { PaletteExportImport } from '@molecules/Palettes/PaletteExportImport/PaletteExportImport';
import { PalettesContent } from '@organisms/Palettes/PalettesContent/PalettesContent';

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
      <PalettesContent />
    </div>
  );
}
