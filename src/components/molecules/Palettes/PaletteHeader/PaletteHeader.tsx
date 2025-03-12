import { Badge } from '@ui/badge';
import { Button } from '@ui/button';
import { CardHeader, CardTitle } from '@ui/card';
import { Pen, Trash2 } from 'lucide-react';

import { PaletteHeaderProps } from './PaletteHeader.types';

export function PaletteHeader({
  palette,
  group,
  tags,
  onEdit,
  onDelete,
}: PaletteHeaderProps) {
  const paletteTags = tags?.filter((tag) => palette?.tagIds?.includes(tag?.id));

  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-2xl">{palette.name}</CardTitle>
          {group && (
            <p className="text-sm text-muted-foreground">{group.name}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onEdit}
            aria-label="edit"
          >
            <Pen className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            aria-label="delete"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {paletteTags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {paletteTags?.map((tag) => (
            <Badge key={tag.id} variant="secondary">
              {tag.name}
            </Badge>
          ))}
        </div>
      )}
    </CardHeader>
  );
}
