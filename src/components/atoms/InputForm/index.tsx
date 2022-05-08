
import { InputTypes } from "../../../types";

import React, { useState, Fragment, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormError } from "../Error"

interface InterfaceInput extends InputTypes {
  type: string;
  options?: any;
  onChange?: any;
  control: any;
  defaultValue?: any
}


const FormInput = ({ defaultValue, control, name, type, errors = {}, options, ...inputProps }: InterfaceInput) => {
  const [isType, setIsType] = useState('');

  useEffect(() => {
    if (type === 'password') {
      setIsType(type);
    }
  }, [type]);

  const onClickType = () => {
    if (isType === 'password') {
      setIsType('text');
    } else {
      setIsType('password');
    }
  };

  return (
    <div>
   <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => {

          if (type === 'password') {
            return (
              <div className="form-password">
                <input
                  type={isType}
                  {...inputProps}
                  defaultValue={defaultValue}
                  onChange={e => onChange(e.target.value)}
                  onBlur={() => typeof value === 'string' && onChange(value.trim())}
                />
                <div className="form-icon">

                </div>
              </div>
            );
          }
          return (
            <input
            type={type}
            {...inputProps}
            defaultValue={defaultValue}
            onChange={e => onChange(e.target.value)}
            onBlur={() => typeof value === 'string' && onChange(value.trim())}
          />
          );
        }}
      />
      < FormError name={name} errors={errors} />
    </div>
  );
};

export { FormInput };

