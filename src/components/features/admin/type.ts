import { Dispatch, SetStateAction } from 'react';

export type FormProps<T> = {
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
  disabled?: boolean;
  loading?: boolean;
};
