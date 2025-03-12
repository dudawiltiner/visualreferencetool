import { useEffect, useState } from 'react';

import { useToast } from '@hooks/General/use-toast';

import { ColorPalette } from '@lib/types';
import { useData } from '@providers/DataProvider/DataProvider';
import { v4 as uuidv4 } from 'uuid';

export function usePaletteDialog(
  open: boolean,
  onOpenChange: (open: boolean) => void,
  selectedPalette?: ColorPalette
) {
  const { groups, tags, palettes, setPalettes } = useData();

  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    colors: ['#FF5733', '#33FF57', '#3357FF', '#F3FF33'],
    groupId: '',
    tagIds: [] as string[],
    comment: '',
  });

  const [editingColorIndex, setEditingColorIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (selectedPalette) {
      setFormData({
        name: selectedPalette.name,
        colors: selectedPalette.colors,
        groupId: selectedPalette.groupId || '',
        tagIds: selectedPalette.tagIds || [],
        comment: selectedPalette.comment || '',
      });
    } else {
      setFormData({
        name: '',
        colors: ['#FF5733', '#33FF57', '#3357FF', '#F3FF33'],
        groupId: '',
        tagIds: [],
        comment: '',
      });
    }
  }, [selectedPalette, open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (index: number, value: string) => {
    const newColors = [...formData.colors];
    newColors[index] = value;
    setFormData((prev) => ({ ...prev, colors: newColors }));
  };

  const addColor = () => {
    if (formData.colors.length < 10) {
      setFormData((prev) => ({
        ...prev,
        colors: [...prev.colors, '#CCCCCC'],
      }));
    }
  };

  const removeColor = (index: number) => {
    if (formData.colors.length > 1) {
      const newColors = formData.colors.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, colors: newColors }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || formData.colors.length === 0) {
      toast({
        title: 'Missing information',
        description: 'Please provide a name and at least one color',
        variant: 'destructive',
      });
      return;
    }

    if (selectedPalette) {
      const updatedPalettes = palettes.map((p) =>
        p.id === selectedPalette.id
          ? {
              ...p,
              name: formData.name,
              colors: formData.colors,
              groupId: formData.groupId || null,
              tagIds: formData.tagIds,
              comment: formData.comment,
              updatedAt: new Date().toISOString(),
            }
          : p
      );
      setPalettes(updatedPalettes);
      toast({
        title: 'Palette updated',
        description: 'Your changes have been saved',
      });
    } else {
      // Create new palette
      const newPalette: ColorPalette = {
        id: uuidv4(),
        name: formData.name,
        colors: formData.colors,
        groupId: formData.groupId || null,
        tagIds: formData.tagIds,
        comment: formData.comment,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setPalettes([...palettes, newPalette]);
      toast({
        title: 'Palette added',
        description: 'The color palette has been added to your collection',
      });
    }

    onOpenChange(false);
  };

  return {
    groups,
    tags,
    toast,
    formData,
    setFormData,
    handleSubmit,
    handleChange,
    handleColorChange,
    addColor,
    removeColor,
    editingColorIndex,
    setEditingColorIndex,
  };
}
