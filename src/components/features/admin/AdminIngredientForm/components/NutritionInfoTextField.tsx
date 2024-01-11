import { TastealTextField } from '@/components/shared/ui/textfields';
import { InputAdornment, TextFieldProps } from '@mui/material';

export const NutritionInfoTextField = (
  props: TextFieldProps & { unit?: string }
) => {
  return (
    <TastealTextField
      {...props}
      InputProps={{
        ...props.InputProps,
        endAdornment: props.unit ? (
          <InputAdornment position="end">{props.unit}</InputAdornment>
        ) : undefined,
      }}
      size="small"
      type="number"
    />
  );
};
