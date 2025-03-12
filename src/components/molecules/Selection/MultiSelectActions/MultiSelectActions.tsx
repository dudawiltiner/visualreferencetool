'use client';

import { useState } from 'react';

import { useToast } from '@hooks/General/use-toast';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@ui/alert-dialog';
import { Button } from '@ui/button';
import { Checkbox } from '@ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { ChevronDown, FolderPlus, Tag, Trash2 } from 'lucide-react';

import { MultiSelectActionsProps } from './MultiSelectActions.types';

export function MultiSelectActions<T>({
  items,
  selectedItems,
  onSelectAll,
  onDeleteSelected,
  type,
}: MultiSelectActionsProps<T>) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const allSelected = items.length > 0 && selectedItems.length === items.length;
  const someSelected =
    selectedItems.length > 0 && selectedItems.length < items.length;

  const handleSelectAll = () => {
    onSelectAll(!allSelected);
  };

  const handleDelete = () => {
    onDeleteSelected(selectedItems);
    setIsDeleteDialogOpen(false);

    toast({
      title: `${selectedItems.length} ${type} deleted`,
      description: `The selected ${type} have been removed from your collection`,
    });
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'images':
        return 'images';
      case 'palettes':
        return 'color palettes';
      case 'groups':
        return 'groups';
      case 'tags':
        return 'tags';
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Checkbox
          id="select-all"
          checked={allSelected}
          data-state={someSelected ? 'indeterminate' : ''}
          onCheckedChange={handleSelectAll}
        />
        <label
          htmlFor="select-all"
          className="text-sm cursor-pointer select-none"
        >
          {allSelected ? 'Deselect All' : 'Select All'}
        </label>

        {selectedItems.length > 0 && (
          <>
            <span className="text-sm text-muted-foreground">
              {selectedItems.length} selected
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-2">
                  Actions <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Selected
                </DropdownMenuItem>
                {(type === 'images' || type === 'palettes') && (
                  <>
                    <DropdownMenuItem>
                      <FolderPlus className="mr-2 h-4 w-4" />
                      Add to Group
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Tag className="mr-2 h-4 w-4" />
                      Add Tags
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete {selectedItems.length} {getTypeLabel()}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The selected {getTypeLabel()} will
              be permanently removed from your collection.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
