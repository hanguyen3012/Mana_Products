import React from 'react';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';

interface InterfaceError {
  name: string;
  errors: any;
}

const FormError = (props: InterfaceError) => {
  const { name, errors } = props;
  const error = get(errors, name, {});
  const [t] = useTranslation();

  return error.message ? (
    <div className="text-danger width-per-100 form-error text-left">
      {error.errorCode ? error.message : t(`error_message:${error.message}`)}
    </div>
  ) : (
    <div></div>
  );
};

export { FormError };