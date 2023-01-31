import React, { useEffect, useState } from 'react';

import { useInput } from '@hooks/use-input';

import bgCardBack from '@assets/images/bg-card-back.png';
import bgCardFront from '@assets/images/bg-card-front.png';
import { ReactComponent as CardLogo } from '@assets/images/card-logo.svg';

import {
  containsNumber,
  containsOnlyLetters,
  isNotEmpty,
  validateInputIsEmpty,
  validateInputIsTooShort,
} from '@utils/validation';
import { Step } from '@enums/step.enum';

import style from '@components/Layout/index.module.scss';

import SuccessMessage from '@components/SuccessMessage';
import FormGroup from '@components/FormGroup';

const DEFAULT_CARD_HOLDER_NAME: string = 'JANE APPLESEED';

const checkFormIsValid = (inputValidity: boolean[]): boolean => {
  return inputValidity.every(Boolean);
};

const Layout = () => {
  const {
    isTouched: cardHolderNameIsTouched,
    enteredValue: cardHolderName,
    setIsTouched: setCardHolderNameIsTouched,
    setEnteredValue: setCardHolderName,
    validationFeedback: cardHolderNameValidationFeedback,
    onReset: cardHolderNameReset,
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
    onReset: cardNumberReset,
  } = useInput({
    fieldName: 'Card Number',
    validationFuncs: [validateInputIsEmpty, validateInputIsTooShort],
    requiredLength: 19,
  });

  const {
    isTouched: cardYearIsTouched,
    enteredValue: cardYear,
    setIsTouched: setCardYearIsTouched,
    setEnteredValue: setCardYear,
    validationFeedback: cardYearValidationFeedback,
    onReset: cardYearReset,
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
    onReset: cardMonthReset,
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
    onReset: cvcNumberReset,
  } = useInput({
    fieldName: 'CVC',
    validationFuncs: [validateInputIsEmpty, validateInputIsTooShort],
    requiredLength: 3,
  });

  const [animating, setAnimating] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(Step.STEP_ONE);

  const enterCardHolderNameHandler = (
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    const { value } = event.target as HTMLInputElement;
    if (containsNumber(value)) return;
    if (!containsOnlyLetters(value)) return;
    setCardHolderName(value);
  };

  const enterCardNumberHandler = (
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    const { value } = event.target as HTMLInputElement;

    const formattedValue: string = value
      /* 阻止使用者手動打空白 */
      .replace(/\s/g, '')
      /* 非數字就會被排除 */
      .replace(/\D/g, '')
      /* 每四位數字之後變加入空白 */
      .replace(/(.{4})/g, '$1 ')
      .trim()
      /* 只取 20 碼（含空白，因為最後會 set 所以也變相阻止超過 20 碼的輸入）*/
      .slice(0, 19);
    setCardNumber(formattedValue);
  };

  const enterCardYearHandler = (
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    const { value, validity } = event.target as HTMLInputElement;
    if (validity.valid) {
      setCardYear(value);
    }
  };

  const enterCardMonthHandler = (
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    const { value, validity } = event.target as HTMLInputElement;
    if (validity.valid) {
      setCardMonth(+value > 12 ? '12' : value);
    }
  };

  const focusCardMonthHandler = (
    event: React.FocusEvent<HTMLInputElement>
  ): void => {
    const { value } = event.target as HTMLInputElement;
    setCardMonthIsTouched();
    if (isNotEmpty(value) && +value < 10) {
      setCardMonth(0 + value);
    }
  };

  const enterCvcNumberHandler = (
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    const {
      value,
      validity: { valid },
    } = event.target as HTMLInputElement;
    if (valid) {
      setCvcNumber(value);
    }
  };

  const switchCurrentStepHandler = (): void => {
    if (currentStep === Step.STEP_ONE) {
      setCurrentStep(Step.STEP_TWO);
    } else {
      setCurrentStep(Step.STEP_ONE);
      cardHolderNameReset();
      cardNumberReset();
      cardYearReset();
      cardMonthReset();
      cvcNumberReset();
    }
  };

  const submitFormHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setCardYearIsTouched();
    setCardMonthIsTouched();
    setCvcNumberIsTouched();
    setCardNumberIsTouched();
    setCardHolderNameIsTouched();

    const formIsValid = checkFormIsValid([
      cardHolderNameValidationFeedback.isValid,
      cardHolderNameValidationFeedback.isValid,
      cardYearValidationFeedback.isValid,
      cardMonthValidationFeedback.isValid,
      cvcNumberValidationFeedback.isValid,
    ]);

    if (formIsValid) {
      setAnimating(true);
      switchCurrentStepHandler();
    }
  };

  const renderRightContent = () => {
    switch (currentStep) {
      case Step.STEP_ONE:
        return (
          <form onSubmit={submitFormHandler}>
            <FormGroup
              label={'CARDHOLDER NAME'}
              type={'text'}
              placeholder={'e.g.  Jane Appleseed'}
              inputOnChange={enterCardHolderNameHandler}
              inputOnBlur={setCardHolderNameIsTouched}
              inputValidationFeedback={cardHolderNameValidationFeedback}
              inputFieldIsTouched={cardHolderNameIsTouched}
              inputValue={cardHolderName}
            />
            <FormGroup
              label={'CARD NUMBER'}
              type={'text'}
              placeholder={'e.g. 1234 5678 9123 0000'}
              inputOnChange={enterCardNumberHandler}
              inputOnBlur={setCardNumberIsTouched}
              inputValidationFeedback={cardNumberValidationFeedback}
              inputFieldIsTouched={cardNumberIsTouched}
              inputValue={cardNumber}
            />

            <div className={`${style['form-multiple']}`}>
              <div
                className={`${style['form-group']} ${
                  (cardYearIsTouched && !cardYearValidationFeedback.isValid) ||
                  (cardMonthIsTouched && !cardMonthValidationFeedback.isValid)
                    ? style['is-error']
                    : ''
                }`}
              >
                <label>EXP. DATE 〔MM/YY)</label>
                <div className={`${style['form-multiple-inputs']}`}>
                  <input
                    type="text"
                    placeholder="MM"
                    maxLength={2}
                    pattern="[0-9]*"
                    value={cardMonth}
                    onInput={enterCardMonthHandler}
                    onBlur={focusCardMonthHandler}
                  />

                  <input
                    type="text"
                    placeholder="YY"
                    maxLength={2}
                    pattern="[0-9]*"
                    value={cardYear}
                    onInput={enterCardYearHandler}
                    onBlur={() => setCardYearIsTouched()}
                  />
                </div>
                {((cardMonthIsTouched &&
                  !cardMonthValidationFeedback.isValid) ||
                  (cardYearIsTouched &&
                    !cardYearValidationFeedback.isValid)) && (
                  <small>Can not be blank</small>
                )}
              </div>

              <div style={{ width: '50%' }}>
                <FormGroup
                  label={'CVC'}
                  type={'text'}
                  placeholder={'e.g. 123'}
                  inputOnChange={enterCvcNumberHandler}
                  inputOnBlur={setCvcNumberIsTouched}
                  inputValidationFeedback={cvcNumberValidationFeedback}
                  inputFieldIsTouched={cvcNumberIsTouched}
                  inputValue={cvcNumber}
                  maxLength={3}
                  pattern={'[0-9]*'}
                />
              </div>
            </div>

            <button type="submit">Confirm</button>
          </form>
        );

      case Step.STEP_TWO:
        return <SuccessMessage onSwitchStep={switchCurrentStepHandler} />;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (animating) {
        setAnimating(false);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [animating]);

  return (
    <main className={animating ? `${style['is-active']}` : ''}>
      <section className={style.left}>
        <div
          className={`${style['credit-card']}`}
          style={{ backgroundImage: `url(${bgCardFront})` }}
        >
          <CardLogo />
          <div className={`${style['credit-card-content']}`}>
            <div className={`${style['credit-card-number']}`}>
              {cardNumber.length > 0 ? (
                <>
                  <span>{cardNumber}</span>
                </>
              ) : (
                <>
                  <span>0000</span>
                  <span>0000</span>
                  <span>0000</span>
                  <span>0000</span>
                </>
              )}
            </div>
            <div className={`${style['credit-card-info']}`}>
              <span>
                {cardHolderName === '' || !cardHolderName
                  ? DEFAULT_CARD_HOLDER_NAME
                  : cardHolderName}
              </span>
              <span>
                {cardMonth === '' ? '00' : cardMonth} /{' '}
                {cardYear === '' ? '00' : cardYear}
              </span>
            </div>
          </div>
        </div>
        <div
          className={style['credit-card']}
          style={{ backgroundImage: `url(${bgCardBack})` }}
        >
          <span className={style['credit-card-cvc']}>
            {cvcNumber === '' ? '000' : cvcNumber}
          </span>
        </div>
      </section>
      <section
        className={`${style.right} ${animating ? style['is-active'] : ''}`}
      >
        {renderRightContent()}
      </section>
    </main>
  );
};

export default Layout;
