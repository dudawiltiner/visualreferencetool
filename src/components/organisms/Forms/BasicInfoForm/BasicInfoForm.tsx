import { MultiSelect } from '@molecules/General/MultiSelect/MultiSelect';
import { Button } from '@ui/button';
import { DialogFooter } from '@ui/dialog';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/select';
import { Textarea } from '@ui/textarea';

import { BasicInfoFormProps } from './BasicInfoForm.types';

export function BasicInfoForm({
  formData,
  groups,
  tags,
  image,
  handleChange,
  handleSubmit,
}: BasicInfoFormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter image title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">Image URL</Label>
        <Input
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="group">Group</Label>
        <Select
          value={formData.groupId}
          onValueChange={(value: string) =>
            handleChange({ target: { name: 'groupId', value } })
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
          options={tags?.map((tag) => ({
            value: tag.id,
            label: tag.name,
          }))}
          selected={formData.tagIds}
          onChange={(selected: string[]) =>
            handleChange({ target: { name: 'tagIds', value: selected } })
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
          placeholder="Add a comment about this image"
          rows={3}
        />
      </div>

      <DialogFooter>
        <Button type="submit">{image ? 'Save Changes' : 'Add Image'}</Button>
      </DialogFooter>
    </form>
  );
}
