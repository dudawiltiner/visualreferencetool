'use client';

import { useState } from 'react';

import { useToast } from '@hooks/General/use-toast';

import type { Tag } from '@lib/types';
import { DeleteConfirmDialog } from '@molecules/General/DeleteConfirmDialog/DeleteConfirmDialog';
import { TagDialog } from '@molecules/Tags/TagDialog/TagDialog';
import { useData } from '@providers/DataProvider/DataProvider';
import { Button } from '@ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@ui/card';
import { Pencil, TagIcon, Trash2 } from 'lucide-react';

export function TagList() {
  const { tags, setTags, images, setImages, palettes, setPalettes } = useData();
  const [selectedTag, setSelectedTag] = useState<Tag | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleEdit = (tag: Tag) => {
    setSelectedTag(tag);
    setIsDialogOpen(true);
  };

  const handleDelete = (tag: Tag) => {
    setSelectedTag(tag);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedTag) {
      const updatedTags = tags.filter((t) => t.id !== selectedTag.id);
      setTags(updatedTags);
      setImages(
        images?.map((image) => ({
          ...image,
          tagIds: image?.tagIds?.filter((id) => id !== selectedTag.id),
        }))
      );
      setPalettes(
        palettes.map((palette) => ({
          ...palette,
          tagIds: palette?.tagIds?.filter((id) => id !== selectedTag.id),
        }))
      );
      setIsDeleteDialogOpen(false);
      toast({
        title: 'Tag deleted',
        description: 'The tag has been removed',
      });
    }
  };

  if (tags.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No tags created yet</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[calc(100vh-180px)] overflow-y-auto p-1">
        {tags.map((tag) => (
          <Card key={tag.id}>
            <CardHeader className="flex flex-row items-center gap-2">
              <TagIcon className="h-5 w-5" />
              <CardTitle>{tag.name}</CardTitle>
            </CardHeader>
            <CardFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(tag)}
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(tag)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <TagDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        tag={selectedTag}
      />

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="Delete Tag"
        description="Are you sure you want to delete this tag? This action cannot be undone."
      />
    </>
  );
}
