export interface ColorPickersProps {
  pickerType: string;
  setPickerType: (type: string) => void;
  currentColor: string;
  hexToHsva: (hex: string) => any;
  onChange: (colorObj: any) => void;
}
