import { InputFeedback } from '@hooks/use-input';

interface BasicInput {
  inputValue: string;
  fieldName: string;
  requiredLength?: number;
}

export const isNotEmpty = (inputValue: string): boolean => {
  return inputValue.trim().length !== 0;
};

export const containsNumber = (inputValue: string): boolean => {
  return /\d/.test(inputValue);
};

export const containsOnlyLetters = (inputValue: string): boolean => {
  return /^[A-Za-z\s]*$/.test(inputValue);
};

export const lengthIsNotToShort = ({
  inputValue,
  requiredLength,
}: BasicInput): boolean => {
  return inputValue.length >= Number(requiredLength);
};

export const validateInputIsEmpty = ({
  inputValue,
  fieldName,
}: BasicInput): InputFeedback => {
  const result: boolean = isNotEmpty(inputValue);

  return {
    isValid: result,
    feedbackMessage: `${fieldName} can not be blank`,
  };
};

export const validateInputIsTooShort = ({
  inputValue,
  fieldName,
  requiredLength,
}: BasicInput): InputFeedback => {
  const result: boolean = lengthIsNotToShort({
    inputValue,
    requiredLength,
    fieldName,
  });

  return {
    isValid: result,
    feedbackMessage: result ? '' : `${fieldName} is too short`,
  };
};

export const checkInputFieldHandler = ({
  inputValue,
  fieldName,
  requiredLength,
  validationFuncs,
}: {
  inputValue: string;
  fieldName: string;
  requiredLength?: number;
  validationFuncs?: Function[];
}): InputFeedback => {
  for (const func of validationFuncs as Function[]) {
    const { isValid, feedbackMessage } = func({
      inputValue,
      fieldName,
      requiredLength,
    });

    if (!isValid)
      return {
        isValid,
        feedbackMessage,
      };
  }

  return {
    isValid: true,
    feedbackMessage: '',
  };
};
