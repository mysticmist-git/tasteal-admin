import { RecipeFormDirection } from '@/components/features/admin';
import CollectionItemAddButton from '@/components/features/recipes/buttons/CollectionItemAddButton';
import { useCallback } from 'react';
import DirectionEditorItem, {
  DirectionEditorItemValue,
} from './DirectionEditorItem/DirectionEditorItem';

/**
 * Default direction to add to recipe
 */
const DEFAULT_DIRECTION: DirectionEditorItemValue = {
  step: 0,
  direction: '',
  imageFile: null,
};

function createDefaultDirection(step: number): DirectionEditorItemValue {
  return {
    ...DEFAULT_DIRECTION,
    step: step,
  };
}

type DirectionEditorProps = {
  directions: RecipeFormDirection[];
  onChange: (directions: RecipeFormDirection[]) => void;
  disabled: boolean;
};

const DirectionEditor: React.FC<DirectionEditorProps> = ({
  directions,
  onChange,
  disabled,
}) => {
  //#region Handlers

  const handleAdd = useCallback(() => {
    onChange([...directions, createDefaultDirection(directions.length + 1)]);
  }, [directions, onChange]);

  const handleItemValueChange = useCallback(
    (step: number, value: DirectionEditorItemValue) => {
      const cloned = [...directions];
      cloned.splice(
        directions.findIndex((dir) => dir.step === step),
        1,
        value
      );
      onChange(cloned);
    },
    [directions, onChange]
  );

  const handleRemoveItem = useCallback(
    (step: number) => {
      const cloned = [...directions];
      cloned.splice(
        directions.findIndex((dir) => dir.step === step),
        1
      );
      onChange(cloned);
    },
    [directions, onChange]
  );

  //#endregion

  return (
    <>
      {(directions || []).map((dir, index) => (
        <DirectionEditorItem
          key={index}
          value={dir}
          onChange={(value) => handleItemValueChange(dir.step, value)}
          onRemove={() => handleRemoveItem(dir.step)}
          disabled={disabled}
        />
      ))}

      <CollectionItemAddButton
        label="Thêm bước hướng dẫn"
        onClick={handleAdd}
        disabled={disabled}
      />
    </>
  );
};

export default DirectionEditor;
