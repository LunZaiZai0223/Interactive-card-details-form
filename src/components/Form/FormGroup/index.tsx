import style from '@components/Form/FormGroup/index.module.scss';
import { InputFeedback } from '@hooks/use-input';

interface FormGroupProps {
  label: string;
  type: string;
  placeholder: string;
  inputOnChange: Function;
  inputOnBlur: Function;
  inputValidationFeedback: InputFeedback;
  inputFieldIsTouched: boolean;
  inputValue: string;
}

const FormGroup = (props: FormGroupProps) => {
  const {
    label,
    type,
    placeholder,
    inputOnChange,
    inputOnBlur,
    inputValidationFeedback,
    inputFieldIsTouched,
    inputValue,
  } = props;

  return (
    <div
      className={`${style['form-group']} ${
        inputFieldIsTouched && !inputValidationFeedback.isValid
          ? style['is-error']
          : ''
      }`}
    >
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={inputValue}
        onInput={(event) => inputOnChange(event)}
        onBlur={() => inputOnBlur()}
      />
      {inputFieldIsTouched && !inputValidationFeedback.isValid && (
        <small>{inputValidationFeedback.feedbackMessage}</small>
      )}
    </div>
  );
};

export default FormGroup;
