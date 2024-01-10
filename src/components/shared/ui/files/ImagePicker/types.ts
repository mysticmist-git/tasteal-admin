export type ImagePickerProps = {
  file: File | null;
  imagePath: string;
  onChange: (file: File | null) => void;
  disabled?: boolean;
};
