'use client';

import type React from 'react';
import { useEffect, useState } from 'react';

import { useToast } from '@hooks/General/use-toast';

import type { Tag } from '@lib/types';
import { useData } from '@providers/DataProvider/DataProvider';
import { Button } from '@ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@ui/dialog';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { v4 as uuidv4 } from 'uuid';

import { TagDialogProps } from './TagDialog.types';

export function TagDialog({ open, onOpenChange, tag }: TagDialogProps) {
  const { tags, setTags } = useData();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
  });

  useEffect(() => {
    if (tag) {
      setFormData({
        name: tag.name,
      });
    } else {
      setFormData({
        name: '',
      });
    }
  }, [tag, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      toast({
        title: 'Missing information',
        description: 'Please provide a name for the tag',
        variant: 'destructive',
      });
      return;
    }

    if (tag) {
      // Update existing tag
      const updatedTags = tags.map((t) =>
        t.id === tag.id
          ? {
              ...t,
              name: formData.name,
              updatedAt: new Date().toISOString(),
            }
          : t
      );
      setTags(updatedTags);
      toast({
        title: 'Tag updated',
        description: 'Your changes have been saved',
      });
    } else {
      // Create new tag
      const newTag: Tag = {
        id: uuidv4(),
        name: formData.name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setTags([...tags, newTag]);
      toast({
        title: 'Tag added',
        description: 'The tag has been created',
      });
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{tag ? 'Edit Tag' : 'Add New Tag'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter tag name"
            />
          </div>

          <DialogFooter>
            <Button type="submit">{tag ? 'Save Changes' : 'Add Tag'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
