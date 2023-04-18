import { useState, useEffect } from 'react';
import ModalAddTransaction from 'components/ModalAddTransaction/ModalAddTransaction';
import css from './ButtonAddTransactions.module.scss';

const ButtonAddTransactions = () => {
  const [isModalAddTransactionOpen, setIsModalAddTransactionOpen] =
    useState(false);

  useEffect(() => {
    if (isModalAddTransactionOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [isModalAddTransactionOpen]);

  const handleOpenModal = () => {
    setIsModalAddTransactionOpen(true);
  };

  const handleClickClose = () => {
    setIsModalAddTransactionOpen(false);
  };

  const handleBackdrop = e => {
    if (e.target === e.currentTarget) {
      handleClickClose();
    }
  };

  useEffect(() => {
    const closeByEsc = e => {
      if (e.code === 'Escape') {
        handleClickClose();
      }
    };

    window.addEventListener('keydown', closeByEsc);

    return () => {
      window.removeEventListener('keydown', closeByEsc);
    };
  }, []);

  return (
    <>
      {isModalAddTransactionOpen && (
        <ModalAddTransaction
          onClose={handleClickClose}
          onClickBackdrop={handleBackdrop}
        />
      )}
      <button
        type="button"
        className={css.button}
        onClick={() => handleOpenModal()}
      >
        +
      </button>
    </>
  );
};

export default ButtonAddTransactions;
