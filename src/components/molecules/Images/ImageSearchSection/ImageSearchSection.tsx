import { ImageSearch } from "@molecules/Images/ImageSearch/ImageSearch";
import { ImageSearchSectionProps } from "./ImageSearchSection.types";

export function ImageSearchSection({
  initialQuery,
  onSelectImage,
}: ImageSearchSectionProps) {
  return (
    <div className="w-full">
      <ImageSearch initialQuery={initialQuery} onSelectImage={onSelectImage} />
    </div>
  );
}
