'use client';

import { Suspense } from 'react';

import { FilterBarWrapper } from '@molecules/Images/FilterBar/FilterBarWrapper';
import { PaletteGridWrapper } from '@organisms/Palettes/PaletteGrid/PaletteGridWrapper';

export function PalettesContent() {
  return (
    <>
      <Suspense fallback={<div>Loading filters...</div>}>
        <FilterBarWrapper type="palettes" />
      </Suspense>
      <Suspense fallback={<div>Loading palettes...</div>}>
        <PaletteGridWrapper />
      </Suspense>
    </>
  );
}
