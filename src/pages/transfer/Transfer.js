import { Field, Form, Formik } from 'formik';
import { REQUIRED, TRANSFER_FORM_INITIAL_VALUES } from '../../utils/constants';
import { updateTransactions } from '../../features/transactions/transactionsSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import classnames from 'classnames';
import styles from './Transfer.module.scss';
import TextField from '../../components/TextField';

const validateForm = (values) => {
  const formErrors = {};

  if (!values.beneficiary) {
    formErrors.beneficiary = REQUIRED;
  }
  if (!values.accountNumber) {
    formErrors.accountNumber = REQUIRED;
  }
  if (!values.amount) {
    formErrors.amount = REQUIRED;
  }
  if (!values.paymentDetails) {
    formErrors.paymentDetails = REQUIRED;
  }

  return formErrors;
};

function Transfer() {
  const [amount, setAmount] = useState(false);
  const [currency, setCurrency] = useState(
    TRANSFER_FORM_INITIAL_VALUES.currency,
  );
  const [beneficiary, setBeneficiary] = useState(false);
  const [wasFormSubmitted, setSubmited] = useState(false);
  const dispatch = useDispatch();

  const handleNewTransferClick = () => {
    setSubmited(false);
  };

  const renderSuccessView = () => (
    <div className={styles['success-wrapper']}>
      <lottie-player
        src="https://assets10.lottiefiles.com/packages/lf20_pqnfmone.json"
        background="transparent"
        speed="1.5"
        style={{ width: '200px', height: '200px' }}
        autoplay
      ></lottie-player>
      <div>Transfer completed!</div>
      <div>
        You have transfered {amount} {currency} to {beneficiary}
      </div>
      <button
        className={classnames(styles['submit-btn'], 'btn btn-outline-primary')}
        type="button"
        onClick={handleNewTransferClick}
      >
        New transfer
      </button>
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className={classnames(styles['page-title'], 'display-6')}>
              Transfer
            </h1>
            <Formik
              validateOnChange={false}
              validateOnBlur={false}
              initialValues={TRANSFER_FORM_INITIAL_VALUES}
              validate={validateForm}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(() => {
                  setAmount(values.amount);
                  setBeneficiary(values.beneficiary);
                  setCurrency(values.currency);
                  dispatch(updateTransactions(values));
                  setSubmitting(false);
                  setSubmited(true);
                  resetForm();
                }, 400);
              }}
            >
              {({ isSubmitting }) => {
                return (
                  <>
                    {wasFormSubmitted ? (
                      renderSuccessView()
                    ) : (
                      <Form className={styles.form}>
                        <div className="mb-3">
                          <TextField
                            Field={Field}
                            label="Beneficiary"
                            name="beneficiary"
                            helpText="Person or other legal entity who receives money."
                          />
                        </div>
                        <div className="mb-3">
                          <TextField
                            Field={Field}
                            label="Account number"
                            name="accountNumber"
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="amount" className="form-label">
                            Amount
                          </label>
                          <div className="input-group">
                            <Field name="amount" id="amount">
                              {({ field, meta }) => (
                                <>
                                  <input
                                    {...field}
                                    type="number"
                                    pattern="\d*"
                                    className={classnames('form-control', {
                                      'is-invalid': meta.error,
                                    })}
                                  />
                                  <div className="input-group-addon">
                                    <Field
                                      as="select"
                                      name="currency"
                                      className={classnames(
                                        'form-control',
                                        styles['currency-selector'],
                                      )}
                                    >
                                      <option value="USD">USD</option>
                                      <option value="EUR">EUR</option>
                                      <option value="GBP">GBP</option>
                                      <option value="JPY">JPY</option>
                                      <option value="CAD">CAD</option>
                                      <option value="AUD">AUD</option>
                                    </Field>
                                  </div>
                                  {meta.touched && meta.error && (
                                    <div className="invalid-feedback">
                                      {meta.error}
                                    </div>
                                  )}
                                </>
                              )}
                            </Field>
                          </div>
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="paymentDetails"
                            className="form-label"
                          >
                            Payment details
                          </label>
                          <Field name="paymentDetails" id="paymentDetails">
                            {({ field, meta }) => (
                              <div>
                                <textarea
                                  {...field}
                                  className={classnames('form-control', {
                                    'is-invalid': meta.error,
                                  })}
                                />
                                {meta.touched && meta.error && (
                                  <div className="invalid-feedback">
                                    {meta.error}
                                  </div>
                                )}
                              </div>
                            )}
                          </Field>
                        </div>
                        <button
                          className={classnames(
                            styles['submit-btn'],
                            `btn btn-${isSubmitting ? 'secondary' : 'primary'}`,
                          )}
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Submit
                        </button>
                      </Form>
                    )}
                  </>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transfer;
