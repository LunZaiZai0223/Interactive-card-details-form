import { ReactComponent as CompletedIcon } from '@assets/images/icon-complete.svg';

import style from '@components/SuccessMessage/index.module.scss';

interface SuccessMessageProps {
  onSwitchStep(): void;
}

const SuccessMessage = (props: SuccessMessageProps) => {
  const { onSwitchStep } = props;
  return (
    <div className={`${style['success-message-container']}`}>
      <CompletedIcon />
      <div className={`${style['content']}`}>
        <h2>THANK YOU!</h2>
        <p>We've added your card details</p>
      </div>
      <button onClick={onSwitchStep}>Continue</button>
    </div>
  );
};

export default SuccessMessage;
