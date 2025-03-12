'use client';

import { AIColorExtractor } from '@molecules/AI/AIColorExtractor/AIColorExtractor';
import { AITagGenerator } from '@molecules/AI/AITagGenerator/AITagGenerator';
import { MultiSelect } from '@molecules/General/MultiSelect/MultiSelect';
import { ImageSearch } from '@molecules/Images/ImageSearch/ImageSearch';
import { Alert, AlertDescription, AlertTitle } from '@ui/alert';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/select';
import { Separator } from '@ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import { Textarea } from '@ui/textarea';
import { AlertCircle } from 'lucide-react';

import { useImageDialog } from './ImageDialog.hooks';
import { ImageDialogProps } from './ImageDialog.types';

export function ImageDialog({ open, onOpenChange, image }: ImageDialogProps) {
  const {
    groups,
    tags,
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    handleTagsGenerated,
    handleColorsExtracted,
    toast,
  } = useImageDialog({
    open,
    onOpenChange,
    image,
  });
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{image ? 'Edit Image' : 'Add New Image'}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="search">Search</TabsTrigger>
            <TabsTrigger value="ai">AI Features</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
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
                  options={tags.map((tag) => ({
                    value: tag.id,
                    label: tag.name,
                  }))}
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
                  placeholder="Add a comment about this image"
                  rows={3}
                />
              </div>

              <DialogFooter>
                <Button type="submit">
                  {image ? 'Save Changes' : 'Add Image'}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>

          <TabsContent
            value="search"
            className="space-y-4 pt-4 w-full overflow-hidden"
          >
            <div className="w-full">
              <ImageSearch
                onSelectImage={(url) => {
                  setFormData((prev) => ({ ...prev, url }));
                  toast({
                    title: 'Image selected',
                    description: 'The image URL has been updated',
                  });
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="ai" className="space-y-4 pt-4">
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>AI Features Require API Key</AlertTitle>
              <AlertDescription>
                To use AI features, add your OpenAI API key as OPENAI_API_KEY in
                your environment variables. Without an API key, simulated
                results will be provided.
              </AlertDescription>
            </Alert>
            {formData.url ? (
              <>
                <div className="rounded-md overflow-hidden border aspect-square relative">
                  <img
                    src={formData.url || '/placeholder.svg'}
                    alt="Preview"
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      e.currentTarget.src =
                        '/placeholder.svg?height=300&width=300';
                    }}
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Generate Tags</h3>
                    <AITagGenerator
                      imageUrl={formData.url}
                      onTagsGenerated={handleTagsGenerated}
                    />
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Extract Color Palette
                    </h3>
                    <AIColorExtractor
                      imageUrl={formData.url}
                      onColorsExtracted={handleColorsExtracted}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Please enter an image URL in the Basic Info tab first
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
