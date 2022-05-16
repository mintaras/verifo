import classnames from 'classnames';

const TextField = ({ Field, label, name, helpText }) => {
  return (
    <>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <Field
        name={name}
        id={name}
        {...(helpText && { 'aria-describedby': `${name}Help` })}
      >
        {({ field, meta }) => (
          <div>
            <input
              type="text"
              {...field}
              className={classnames('form-control', {
                'is-invalid': meta.error,
              })}
            />
            {meta.touched && meta.error && (
              <div className="invalid-feedback">{meta.error}</div>
            )}
          </div>
        )}
      </Field>
      {helpText && (
        <div id={`${name}Help`} className="form-text">
          {helpText}
        </div>
      )}
    </>
  );
};

export default TextField;
