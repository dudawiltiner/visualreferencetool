import { AddImageButton } from '@atoms/Images/AddImageButton/AddImageButton';
import { FilterBar } from '@molecules/Images/FilterBar/FilterBar';
import { ImageGrid } from '@organisms/Images/ImageGrid/ImageGrid';

export default function ImagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Images</h1>
        <AddImageButton />
      </div>
      <FilterBar type="images" />
      <ImageGrid />
    </div>
  );
}
