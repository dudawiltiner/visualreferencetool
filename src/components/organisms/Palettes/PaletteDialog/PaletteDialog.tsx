'use client';

import { AdvancedColorEditor } from '@molecules/Colors/AdvancedColorEditor/AdvancedColorEditor';
import { AdvancedColorPicker } from '@molecules/Colors/AdvancedColorPicker/AdvancedColorPicker';
import { MultiSelect } from '@molecules/General/MultiSelect/MultiSelect';
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
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/select';
import { Textarea } from '@ui/textarea';
import { Edit2, Plus, X } from 'lucide-react';

import { usePaletteDialog } from './PaletteDialog.hook';
import { PaletteDialogProps } from './PaletteDialog.types';

export function PaletteDialog({
  open,
  onOpenChange,
  palette,
}: PaletteDialogProps) {
  const {
    groups,
    tags,
    formData,
    setFormData,
    handleSubmit,
    handleChange,
    handleColorChange,
    addColor,
    removeColor,
    editingColorIndex,
    setEditingColorIndex,
  } = usePaletteDialog(open, onOpenChange, palette);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {palette ? 'Edit Color Palette' : 'Add New Color Palette'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter palette name"
            />
          </div>

          <div className="space-y-2">
            <Label>Colors</Label>
            <div className="space-y-2">
              {formData.colors.map((color, index) => (
                <div key={index} className="flex items-center gap-2">
                  <AdvancedColorPicker
                    color={color}
                    onChange={(newColor) => handleColorChange(index, newColor)}
                  />

                  <Input
                    type="text"
                    value={color}
                    onChange={(e) => handleColorChange(index, e.target.value)}
                    placeholder="#RRGGBB"
                    className="flex-1 font-mono"
                  />

                  <Popover
                    open={editingColorIndex === index}
                    onOpenChange={(open) =>
                      setEditingColorIndex(open ? index : null)
                    }
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="flex-shrink-0"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="center"
                      className="w-80 overflow-y-auto"
                    >
                      <AdvancedColorEditor
                        color={color}
                        onChange={(newColor) =>
                          handleColorChange(index, newColor)
                        }
                      />
                    </PopoverContent>
                  </Popover>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeColor(index)}
                    disabled={formData.colors.length <= 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addColor}
                disabled={formData.colors.length >= 10}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Color
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="group">Group</Label>
            <Select
              value={formData.groupId}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, groupId: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {groups.map((group) => (
                  <SelectItem key={group.id} value={group.id}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <MultiSelect
              options={tags.map((tag) => ({ value: tag.id, label: tag.name }))}
              selected={formData.tagIds}
              onChange={(selected) =>
                setFormData((prev) => ({ ...prev, tagIds: selected }))
              }
              placeholder="Select tags"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Add a comment about this palette"
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="submit">
              {palette ? 'Save Changes' : 'Add Palette'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
