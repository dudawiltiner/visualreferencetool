import { useEffect, useState } from 'react';

import { Image } from '@hooks/AI/useGenerateCompanyContent';
import { Tag } from '@hooks/AI/useGenerateTags';
import { useToast } from '@hooks/General/use-toast';

import type {
  FormChangeEvent,
  FormData,
} from '@organisms/Forms/BasicInfoForm/BasicInfoForm.types';
import { v4 as uuidv4 } from 'uuid';

import { useData } from '../../../../providers/DataProvider/DataProvider';

interface UseImageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  image?: Image;
}

export function useImageDialog({
  open,
  onOpenChange,
  image,
}: UseImageDialogProps) {
  const { images, setImages, groups, tags, palettes, setPalettes, setTags } =
    useData();

  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    title: '',
    url: '',
    groupId: '',
    tagIds: [],
    comment: '',
  });

  useEffect(() => {
    if (image) {
      setFormData({
        title: image.title,
        url: image.url,
        groupId: image.groupId || '',
        tagIds: image.tagIds || [],
        comment: image.comment || '',
      });
    } else {
      setFormData({
        title: '',
        url: '',
        groupId: '',
        tagIds: [],
        comment: '',
      });
    }
  }, [image, open]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | FormChangeEvent
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.url) {
      toast({
        title: 'Missing information',
        description: 'Please provide a title and URL for the image',
        variant: 'destructive',
      });
      return;
    }

    if (image) {
      // Update existing image
      const updatedImages = images.map((i) =>
        i.id === image.id
          ? {
              ...i,
              title: formData.title,
              url: formData.url,
              groupId: formData.groupId || null,
              tagIds: formData.tagIds,
              comment: formData.comment,
              updatedAt: new Date().toISOString(),
            }
          : i
      );
      setImages(updatedImages);
      toast({
        title: 'Image updated',
        description: 'Your changes have been saved',
      });
    } else {
      // Create new image
      const newImage: Image = {
        id: uuidv4(),
        title: formData.title,
        url: formData.url,
        groupId: formData.groupId || null,
        tagIds: formData.tagIds,
        comment: formData.comment,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setImages([...images, newImage]);
      toast({
        title: 'Image added',
        description: 'The image has been added to your collection',
      });
    }

    onOpenChange(false);
  };

  const handleTagsGenerated = async (newTags: Tag[]) => {
    setTags([...tags, ...newTags]);

    setFormData((prev) => ({
      ...prev,
      tagIds: [...new Set([...prev.tagIds, ...newTags.map((tag) => tag?.id)])],
    }));
  };

  const handleColorsExtracted = (colors: string[]) => {
    const newPalette = {
      id: uuidv4(),
      name: `Palette from ${formData.title || 'Image'}`,
      colors: colors,
      groupId: formData.groupId || null,
      tagIds: formData.tagIds,
      comment: `Automatically generated from ${formData.title || 'image'}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setPalettes([...palettes, newPalette]);

    toast({
      title: 'Palette created',
      description: 'A new color palette has been created from the image',
    });
  };

  const handleImageSelected = (url: string) => {
    setFormData((prev) => ({ ...prev, url }));
    toast({
      title: 'Image selected',
      description: 'The image URL has been updated',
    });
  };

  return {
    formData,
    setFormData,
    groups,
    tags,
    handleChange,
    handleSubmit,
    handleTagsGenerated,
    handleColorsExtracted,
    handleImageSelected,
    toast,
  };
}
