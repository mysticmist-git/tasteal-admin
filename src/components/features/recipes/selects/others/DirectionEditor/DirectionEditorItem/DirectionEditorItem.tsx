import { RecipeFormDirection } from '@/components/features/admin';
import { TastealTextField } from '@/components/shared/ui/textfields';
import { useFirebaseImage } from '@/hooks';
import { Close, ExpandMore, Photo } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormLabel,
  IconButton,
  Stack,
} from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';

type ImageProps = {
  url: string;
  onRemove?: () => void;
  disabled?: boolean;
};

const Image: React.FC<ImageProps> = ({
  url = '',
  onRemove,
  disabled = false,
}) => {
  //#region UseStates

  const [isHovered, setIsHovered] = useState(false);

  //#endregion
  //#region Handlers

  const handleRemoveImage = useCallback(() => {
    !disabled && onRemove && onRemove();
  }, [disabled, onRemove]);

  //#endregion

  return (
    <Box
      position={'relative'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      display={url !== '' ? 'block' : 'none'}
    >
      <Box
        component="img"
        src={url}
        sx={[
          {
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'grey.300',
            boxShadow: 4,
            borderRadius: 4,
            width: 280,
            objectFit: 'contain',
            objectPosition: 'center',
            transition: 'all 0.2s ease-in-out',
          },
          isHovered &&
            !disabled && {
              cursor: 'pointer',
              borderColor: 'primary.main',
            },
        ]}
      ></Box>
      <IconButton
        sx={[
          {
            display: disabled ? 'none' : 'block',
            position: 'absolute',
            right: 1,
            top: 1,
            '&:hover': disabled
              ? {}
              : {
                  rotate: '15deg',
                  scale: '1.2',
                },
            transition: 'all 0.2s ease-in-out',
          },
        ]}
        onClick={handleRemoveImage}
      >
        <Close color="primary" fontSize="medium" />
      </IconButton>
    </Box>
  );
};

export type DirectionEditorItemValue = {
  step: number;
  direction: string;
  imageFile?: File | null;
  imagePath?: string;
};

export type DirectionEditorItemProps = {
  value: RecipeFormDirection;
  onChange: (value: RecipeFormDirection) => void;
  onRemove: () => void;
  disabled: boolean;
};

const DirectionEditorItem: React.FC<DirectionEditorItemProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  //#region UseMemos

  const img = useFirebaseImage(
    typeof value.image === 'string' ? value.image ?? '' : '',
    100,
    false
  );
  const url = useMemo(() => {
    if (value.image && value.image instanceof File) {
      return URL.createObjectURL(value.image);
    }
    if (img) {
      return img;
    }
  }, [img, value.image]);

  //#endregion
  //#region Handlers

  const handleDescriptionChange = useCallback(
    (desc: string) => {
      onChange({
        ...value,
        direction: desc,
      });
    },
    [onChange, value]
  );

  const handleImageFileChange = useCallback(
    (file: File | null) => {
      onChange({
        ...value,
        image: file || '',
      });
    },
    [onChange, value]
  );

  //#endregion

  return (
    <Accordion
      sx={{
        border: '1px solid',
        borderColor: 'grey.300',
      }}
    >
      <AccordionSummary expandIcon={<ExpandMore />} sx={{}}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <FormLabel>Bước {value.step}</FormLabel>
          {/* <IconButton
            onClick={onRemove}
            sx={value.step === 1 ? { display: 'none' } : {}}
          >
            <Close />
          </IconButton> */}
        </Stack>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          gap: 1,
        }}
      >
        <TastealTextField
          multiline
          placeholder="Mô tả bước"
          rows={3}
          fullWidth
          value={value.direction}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          disabled={disabled}
        />

        <Image
          url={url || ''}
          onRemove={() => handleImageFileChange(null)}
          disabled={disabled}
        />

        <Button
          component="label"
          variant="contained"
          startIcon={<Photo />}
          sx={
            value.image
              ? {
                  display: 'none',
                }
              : {}
          }
          disabled={disabled}
        >
          Thêm hình ảnh
          <input
            hidden
            type="file"
            onChange={(e) => handleImageFileChange(e.target.files![0])}
          />
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

export default DirectionEditorItem;
