import { IngredientEntity } from '@/api/models/entities/IngredientEntity/IngredientEntity';
import { IngredientService } from '@/api/services/ingredientService';
import CollectionItemAddButton from '@/components/features/recipes/buttons/CollectionItemAddButton';
import { Stack } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import IngredientItem from './IngredientItem';
import { IngredientItemData } from './types';

export const IngredientSelector: React.FunctionComponent<{
  ingredients: IngredientItemData[];
  onChange: (ingredients: IngredientItemData[]) => void;
  onOpen: () => void;
  disabled: boolean;
}> = ({ ingredients, onChange, onOpen, disabled = false }) => {
  //#region Handlers

  const handleDelete = useCallback(
    (id: number) => {
      onChange(
        ingredients.filter((ingredient) => Number(ingredient.id) !== id)
      );
    },
    [ingredients, onChange]
  );
  const handleNewClick = useCallback(() => {
    onOpen();
  }, [onOpen]);

  //#endregion
  //#region Ingredients

  const [databaseIngredients, setDatabaseIngredients] = useState<
    IngredientEntity[]
  >([]);
  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const rows = await IngredientService.GetAll(1000000);

        if (!active) return;

        setDatabaseIngredients(rows ?? []);
      } catch (err) {
        console.log(err);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  //#endregion

  return (
    <>
      <Stack gap={2}>
        {(ingredients || []).length > 0 &&
          ingredients.map((ingredient, index) => (
            <IngredientItem
              key={index}
              disabled={disabled}
              item={ingredient}
              onDelete={handleDelete}
              ingredients={databaseIngredients}
            />
          ))}
      </Stack>

      <CollectionItemAddButton
        disabled={disabled}
        label={'Thêm nguyên liệu'}
        onClick={handleNewClick}
      />
    </>
  );
};
