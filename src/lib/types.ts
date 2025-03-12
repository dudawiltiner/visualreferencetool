import React from 'react';

export interface Image {
  id: string;
  title: string;
  url: string;
  groupId: string | null;
  tagIds: string[];
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
  groupId?: string | null;
  tagIds?: string[];
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface SortOption {
  field: string;
  direction: 'asc' | 'desc';
  label: string;
}

export interface EditingColor {
  paletteId: string;
  colorIndex: number;
}

export interface FormData {
  title: string;
  url: string;
  comment: string;
  groupId: string;
  tagIds: string[];
}

export type FormChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

export interface ColorPickersProps {
  pickerType: string;
  setPickerType: (type: string) => void;
  currentColor: string;
  hexToHsva: (hex: string) => any;
  onChange: (colorObj: any) => void;
}

export interface RecentColorsProps {
  recentColors: string[];
  currentColor: string;
  onColorSelect: (color: string) => void;
}
