'use client';

import { useState } from 'react';

import { useToast } from '@hooks/General/use-toast';

import type { Group } from '@lib/types';
import { DeleteConfirmDialog } from '@molecules/General/DeleteConfirmDialog/DeleteConfirmDialog';
import { useData } from '@providers/DataProvider/DataProvider';
import { Button } from '@ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@ui/card';
import { Pencil, Trash2 } from 'lucide-react';

import { GroupDialog } from '../GroupDialog/GroupDialog';

export function GroupList() {
  const { groups, setGroups, images, setImages, palettes, setPalettes } =
    useData();
  const [selectedGroup, setSelectedGroup] = useState<Group | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleEdit = (group: Group) => {
    setSelectedGroup(group);
    setIsDialogOpen(true);
  };

  const handleDelete = (group: Group) => {
    setSelectedGroup(group);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedGroup) {
      const updatedGroups = groups.filter((g) => g.id !== selectedGroup.id);
      setGroups(updatedGroups);
      setImages(
        images?.map((image) => ({
          ...image,
          groupId: image.groupId === selectedGroup.id ? null : image.groupId,
        }))
      );
      setPalettes(
        palettes?.map((palette) => ({
          ...palette,
          groupId:
            palette.groupId === selectedGroup.id ? null : palette.groupId,
        }))
      );
      setIsDeleteDialogOpen(false);
      toast({
        title: 'Group deleted',
        description: 'The group has been removed',
      });
    }
  };

  if (groups.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No groups created yet</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[calc(100vh-180px)] overflow-y-auto p-1">
        {groups.map((group) => (
          <Card key={group.id}>
            <CardHeader>
              <CardTitle>{group.name}</CardTitle>
              {group.description && (
                <CardDescription>{group.description}</CardDescription>
              )}
            </CardHeader>
            <CardFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(group)}
                data-testid={`edit-button-${group.id}`}
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(group)}
                data-testid={`delete-button-${group.id}`}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <GroupDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        group={selectedGroup}
      />

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="Delete Group"
        description="Are you sure you want to delete this group? This action cannot be undone."
      />
    </>
  );
}
