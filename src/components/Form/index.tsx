import FormGroup from '@components/Form/FormGroup';
import style from '@components/Layout/index.module.scss';
import { useInput } from '@hooks/use-input';
import {
  containsNumber,
  containsOnlyLetters,
  validateInputIsEmpty,
  validateInputIsTooShort,
} from '@utils/validation';
import { UseInput } from '@hooks/use-input';

interface FormProps extends FormGroup {
  onSubmitForm: Function;
}

interface FormGroup {
  cardName: UseInput;
  cardNumber: UseInput;
  cardMonth: UseInput;
  cardYear: UseInput;
  cardCvcNumber: UseInput;
}

const Form = (props: FormProps) => {
  const { onSubmitForm } = props;

  const {
    isTouched: cardHolderNameIsTouched,
    enteredValue: cardHolderName,
    setIsTouched: setCardHolderNameIsTouched,
    setEnteredValue: setCardHolderName,
    validationFeedback: cardHolderNameValidationFeedback,
  } = useInput({
    fieldName: 'Name',
    validationFuncs: [validateInputIsEmpty],
  });

  const {
    isTouched: cardNumberIsTouched,
    enteredValue: cardNumber,
    setIsTouched: setCardNumberIsTouched,
    setEnteredValue: setCardNumber,
    validationFeedback: cardNumberValidationFeedback,
  } = useInput({
    fieldName: 'Card Number',
    validationFuncs: [validateInputIsTooShort],
    requiredLength: 19,
  });

  const {
    isTouched: cardYearIsTouched,
    enteredValue: cardYear,
    setIsTouched: setCardYearIsTouched,
    setEnteredValue: setCardYear,
    validationFeedback: cardYearValidationFeedback,
  } = useInput({
    fieldName: 'Year',
    validationFuncs: [validateInputIsEmpty],
  });

  const {
    isTouched: cardMonthIsTouched,
    enteredValue: cardMonth,
    setIsTouched: setCardMonthIsTouched,
    setEnteredValue: setCardMonth,
    validationFeedback: cardMonthValidationFeedback,
  } = useInput({
    fieldName: 'Month',
    validationFuncs: [validateInputIsEmpty],
  });

  const {
    isTouched: cvcNumberIsTouched,
    enteredValue: cvcNumber,
    setIsTouched: setCvcNumberIsTouched,
    setEnteredValue: setCvcNumber,
    validationFeedback: cvcNumberValidationFeedback,
  } = useInput({
    fieldName: 'Cvc',
    validationFuncs: [validateInputIsEmpty],
  });

  return (
    <form onSubmit={(event) => onSubmitForm(event)}>
      {/*<div className={`${style['form-group']}`}>*/}
      {/*  <label>CARD NUMBER</label>*/}
      {/*  <input*/}
      {/*    type="text"*/}
      {/*    placeholder="e.g. 1234 5678 9123 0000"*/}
      {/*    value={cardNumber}*/}
      {/*    onInput={enterCardNumberHandler}*/}
      {/*  />*/}
      {/*  <small>Wrong format, numbers only</small>*/}
      {/*</div>*/}

      {/*<div className={`${style['form-group']}`}>*/}
      {/*  <label>CARD NUMBER</label>*/}
      {/*  <input*/}
      {/*    type="text"*/}
      {/*    placeholder="e.g. 1234 5678 9123 0000"*/}
      {/*    value={cardNumber}*/}
      {/*    onInput={enterCardNumberHandler}*/}
      {/*  />*/}
      {/*  <small>Wrong format, numbers only</small>*/}
      {/*</div>*/}

      {/*<div className={`${style['form-multiple']}`}>*/}
      {/*  <div className={`${style['form-group']}`}>*/}
      {/*    <label>EXP. DATE 〔MM/YY)</label>*/}
      {/*    <div className={`${style['form-multiple-inputs']}`}>*/}
      {/*      <input*/}
      {/*        type="text"*/}
      {/*        placeholder="MM"*/}
      {/*        maxLength={2}*/}
      {/*        pattern="[0-9]*"*/}
      {/*        value={cardMonth}*/}
      {/*        onInput={enterCardMonthHandler}*/}
      {/*        onBlur={focusCardMonthHandler}*/}
      {/*      />*/}
      {/*      <input*/}
      {/*        type="text"*/}
      {/*        placeholder="YY"*/}
      {/*        maxLength={2}*/}
      {/*        pattern="[0-9]*"*/}
      {/*        value={cardYear}*/}
      {/*        onInput={enterCardYearHandler}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*    <small>Can't be blank</small>*/}
      {/*  </div>*/}

      {/*  <div*/}
      {/*    className={`${style['form-group']} ${style['form-group-is-error']}`}*/}
      {/*  >*/}
      {/*    <label>CVC</label>*/}
      {/*    <input*/}
      {/*      type="text"*/}
      {/*      placeholder="e.g. 123"*/}
      {/*      maxLength={3}*/}
      {/*      pattern="[0-9]*"*/}
      {/*      value={cvcNumber}*/}
      {/*      onInput={enterCvcNumberHandler}*/}
      {/*    />*/}
      {/*    <small>Can't be blank</small>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <button type="submit">Confirm</button>
    </form>
  );
};

export default Form;
