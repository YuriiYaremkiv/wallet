import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import 'react-datetime/css/react-datetime.css';
import calendar from './images/calendar.svg';
import moment from 'moment';
import { addTransaction } from 'redux/transactions/transactionsOperations';
import { fetchTransactionCategories } from 'redux/transactions/transactionsOperations';
import { selectTransactionCategories } from 'redux/transactions/transactionsSelectors';
import { refreshUser } from 'redux/auth/authOperations';
import FormikDateTime from './FormicDatetime';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import modeConfig from 'configs/mode.config';
import css from './ModalAddTransaction.module.scss';

import * as yup from 'yup';

const transactionSchema = yup.object().shape({
  amount: yup.string().required(),
  transactionDate: yup.date().required('date is required field'),
});

const ModalAddTransaction = ({ onClose, onClickBackdrop }) => {
  const [type, setType] = useState('EXPENSE');
  const [toogle, setToogle] = useState(false);

  const dispatch = useDispatch();
  const categories = useSelector(selectTransactionCategories);

  const { themeMode } = useSelector(state => state.themeMode);
  const styles = modeConfig.style[themeMode];
  const { t } = useTranslation();

  const initialValue = {
    type: 'EXPENSE',
    amount: '',
    categoryId: '',
    transactionDate: moment(),
    comment: '',
  };

  const onToggle = (setFieldValue, resetForm, values) => {
    setToogle(!toogle);
    if (values.target.checked) {
      setType(type);
    } else {
      setType('INCOME');
    }

    resetForm();
    return setFieldValue('type', values.target.checked ? 'INCOME' : 'EXPENSE');
  };

  useEffect(() => {
    dispatch(fetchTransactionCategories());
  }, [dispatch]);

  const handlerSubmit = async ({
    transactionDate,
    type,
    categoryId,
    comment,
    amount,
  }) => {
    const correctAmmount =
      type === 'EXPENSE' ? Number('-' + amount.toFixed(2)) : amount.toFixed(2);

    try {
      await dispatch(
        addTransaction({
          transactionDate: moment(transactionDate).utc(true),
          type,
          categoryId:
            type === 'INCOME'
              ? '063f1132-ba5d-42b4-951d-44011ca46262'
              : categoryId,
          comment,
          amount: correctAmmount,
        })
      ).unwrap();
      onClose();
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }

    dispatch(refreshUser());
  };

  function validateSelect(value) {
    let error;
    if (!value) {
      error = 'category is a required field';
    }
    return error;
  }

  return (
    <div className={css.backdrop} onClick={onClickBackdrop}>
      <div className={css.modal}>
        <button className={css.CloseBtn} onClick={onClose} type="button">
          <CloseIcon className={css.CloseBtn__icon} />
        </button>
        <h2 className={css.modal__title}>{t('addTransaction')}</h2>
        <Formik
          initialValues={initialValue}
          validationSchema={transactionSchema}
          onSubmit={(values, actions) => {
            handlerSubmit(values);
            actions.resetForm({ values: initialValue() });
          }}
        >
          {formik => (
            // {/************************************************/}
            <Form>
              <div className={css.modalWrappenTransaction}>
                {toogle ? (
                  <p className={css.activeTransactionIncome}>{t('income')}</p>
                ) : (
                  <p className={css.modalTransactionIncome}>{t('income')}</p>
                )}

                <label className={css.toggleSwitch}>
                  <Field
                    type="checkbox"
                    name="type"
                    checked={toogle}
                    onChange={values =>
                      onToggle(formik.setFieldValue, formik.resetForm, values)
                    }
                  />
                  <span className={css.switch} />
                </label>
                {toogle ? (
                  <p className={css.modalTransactionExpense}>{t('expenses')}</p>
                ) : (
                  <p className={css.activeTransactionExpense}>
                    {t('expenses')}
                  </p>
                )}
              </div>
              {!toogle && (
                <div>
                  <Field name="categoryId" validate={validateSelect}>
                    {({ field, form }) => (
                      <Select
                        onChange={selectedOption =>
                          form.setFieldValue('categoryId', selectedOption.value)
                        }
                        className={css.modalSelect}
                        placeholder={
                          <div className={css.selectPlaceholderText}>
                            {t('selectAcategory')}
                          </div>
                        }
                        options={categories
                          .filter(
                            category => category.type === form.values.type
                          )
                          .map(category => ({
                            value: category.id,
                            label: category.name,
                          }))}
                        theme={theme => ({
                          ...theme,
                          boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
                          colors: {
                            ...theme.colors,
                            text: '#FF6596',
                            primary25: 'white',
                            primary: '#FF6596',
                            background: 'rgba(255, 255, 255, 0.7)',
                          },
                        })}
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            border: 'none',
                            borderBottom: ' 1px solid #e0e0e0',
                            outline: 'none',
                          }),
                        }}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="categoryId"
                    component="div"
                    className={css.invalidFeedbackSelect}
                  />
                </div>
              )}

              <div className={css.modalWrapper}>
                <Field
                  className={css.formInputSum}
                  type="number"
                  name="amount"
                  placeholder="0.00"
                />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className={css.invalidFeedback}
                />
                <div className={css.inputDatetime}>
                  <Field
                    name="transactionDate"
                    timeFormat={false}
                    component={FormikDateTime}
                  />
                  <ErrorMessage
                    name="transactionDate"
                    component="div"
                    className={css.invalidFeedbackDate}
                  />
                  <img
                    className={css.calendarIcon}
                    src={calendar}
                    alt="calendar"
                  />
                </div>
              </div>
              <Field
                className={css.inputCommentText}
                type="text"
                name="comment"
                placeholder={t('comment')}
              />
              <button
                className={css.btnAdd}
                type="submit"
                onClick={() =>
                  !toogle ? formik.validateField('categoryId') : null
                }
              >
                {t('add')}
              </button>
              <button className={css.btnCancel} onClick={onClose}>
                {t('cancel')}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ModalAddTransaction;
