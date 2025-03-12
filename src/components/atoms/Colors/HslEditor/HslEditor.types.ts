export interface HslEditorProps {
  hsl: { h: number; s: number; l: number };
  onChange: (channel: 'h' | 's' | 'l', value: number) => void;
}
