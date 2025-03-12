export interface RgbEditorProps {
  rgb: { r: number; g: number; b: number };
  onChange: (channel: 'r' | 'g' | 'b', value: number) => void;
}
