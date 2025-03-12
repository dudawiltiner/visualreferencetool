export interface RecentColorsProps {
  recentColors: string[];
  currentColor: string;
  onColorSelect: (color: string) => void;
}
