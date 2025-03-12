'use client';

import type React from 'react';
import { useEffect, useState } from 'react';

import { Group } from '@hooks/AI/useGenerateCompanyContent';
import { useToast } from '@hooks/General/use-toast';

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
import { Textarea } from '@ui/textarea';
import { v4 as uuidv4 } from 'uuid';

import { GroupDialogProps } from './GroupDialog.types';

export function GroupDialog({ open, onOpenChange, group }: GroupDialogProps) {
  const { groups, setGroups } = useData();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    if (group) {
      setFormData({
        name: group.name,
        description: group.description || '',
      });
    } else {
      setFormData({
        name: '',
        description: '',
      });
    }
  }, [group, open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      toast({
        title: 'Missing information',
        description: 'Please provide a name for the group',
        variant: 'destructive',
      });
      return;
    }

    if (group) {
      // Update existing group
      const updatedGroups = groups.map((g) =>
        g.id === group.id
          ? {
              ...g,
              name: formData.name,
              description: formData.description,
              updatedAt: new Date().toISOString(),
            }
          : g
      );
      setGroups(updatedGroups);
      toast({
        title: 'Group updated',
        description: 'Your changes have been saved',
      });
    } else {
      // Create new group
      const newGroup: Group = {
        id: uuidv4(),
        name: formData.name,
        description: formData.description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setGroups([...groups, newGroup]);
      toast({
        title: 'Group added',
        description: 'The group has been created',
      });
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{group ? 'Edit Group' : 'Add New Group'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter group name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add a description for this group"
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="submit">
              {group ? 'Save Changes' : 'Add Group'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
