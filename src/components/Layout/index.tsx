import React from 'react';

import bgCardBack from '@assets/images/bg-card-back.png';
import bgCardFront from '@assets/images/bg-card-front.png';
import { ReactComponent as CardLogo } from '@assets/images/card-logo.svg';

import style from '@components/Layout/index.module.scss';

const Layout = () => {
  return (
    <main>
      <section className={style.left}>
        <div
          className={`${style['credit-card']}`}
          style={{ backgroundImage: `url(${bgCardFront})` }}
        >
          <CardLogo />
          <div className={`${style['credit-card-content']}`}>
            <div className={`${style['credit-card-number']}`}>
              <span>0000</span>
              <span>0000</span>
              <span>0000</span>
              <span>0000</span>
            </div>
            <div className={`${style['credit-card-info']}`}>
              <span>name</span>
              <span>00 / 00</span>
            </div>
          </div>
        </div>
        <div
          className={style['credit-card']}
          style={{ backgroundImage: `url(${bgCardBack})` }}
        >
          <span className={style['credit-card-cvc']}>000</span>
        </div>
      </section>
      <section className={style.right}>
        <form>
          <div className={`${style['form-group']}`}>
            <label>CARDHOLDER NAME</label>
            <input />
            <span>Wrong format, numbers only</span>
          </div>
          <div className={`${style['form-group']}`}>
            <label>CARD NUMBER</label>
            <input />
            <span>Wrong format, numbers only</span>
          </div>

          <div className={`${style['form-multiple']}`}>
            <div className={`${style['form-group']}`}>
              <label>EXP. DATE 〔MM/YY)</label>
              <div className={`${style['form-multiple-inputs']}`}>
                <input />
                <input />
              </div>
              <span>Can't be blank</span>
            </div>

            <div className={`${style['form-group']}`}>
              <label>CVC</label>
              <input />
              <span>Can't be blank</span>
            </div>
          </div>

          <button>Confirm</button>
        </form>
      </section>
    </main>
  );
};

export default Layout;
