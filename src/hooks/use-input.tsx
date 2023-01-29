import { useState } from 'react';

import { checkInputFieldHandler } from '@utils/validation';

export interface UseInput {
  isTouched: boolean;
  enteredValue: string;
  setEnteredValue(enteredValue: string): void;
  setIsTouched(): void;
  validationFeedback: InputFeedback;
  onReset(): void;
}

export interface InputFeedback {
  isValid: boolean;
  feedbackMessage?: string;
}

export const useInput = ({
  validationFuncs,
  fieldName,
  requiredLength,
}: {
  validationFuncs: Function[];
  fieldName: string;
  requiredLength?: number;
}): UseInput => {
  const [enteredValue, setEnteredValue] = useState<string>('');
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const validationFeedback: InputFeedback = checkInputFieldHandler({
    inputValue: enteredValue,
    fieldName,
    validationFuncs,
    ...(requiredLength && { requiredLength }),
  });

  // if (!isTouched) {
  //   validationFeedback.isValid = true;
  //   validationFeedback.feedbackMessage = '';
  // }

  const toggleIsTouchedHandler = (): void => {
    setIsTouched(true);
  };

  const resetInputHandler = (): void => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    isTouched,
    enteredValue,
    setIsTouched: toggleIsTouchedHandler,
    setEnteredValue,
    validationFeedback,
    onReset: resetInputHandler,
  };
};
