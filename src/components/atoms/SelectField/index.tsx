import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { InputTypes } from "../../../types";
import { FormError } from "../Error";
import { useTranslation } from "react-i18next";
import "./index.css"
type SelectOption = { label: string; value: number};
interface InterfaceSelect extends InputTypes {
  options: SelectOption[];
  isMulti?: boolean;
  isCreatable?: boolean;
  defaultValue: any;
  isLoading?: boolean;
  disabled?: boolean
}

const colourStyles = {
  control: (styles: any) => ({
    ...styles,
    borderColor: "#6a7388",
    borderRadius: 5,
    fontSize: 14,
    minHeight: 37,
  }),
  dropdownIndicator: (base: any) => ({ ...base, color: "#000000" }),
  container: (provided: any) => ({ ...provided, width: "100%" }),
  multiValue: (styles: any) => {
    return {
      ...styles,
      overflow: "hidden",
      flexDirection: "row-reverse",
      borderRadius: "5px",
      border: "1px solid #AAAAAA",
      fontWeight: "bold",
    };
  },
};

const FormSelect = ({
  control,
  name,
  options,
  defaultValue,
  placeholder,
  disabled,
  isMulti,
  errors,
  isCreatable,
  isLoading,
  className
}: InterfaceSelect) => {
  const SelectInput: any = isCreatable ? CreatableSelect : Select;
  const [t] = useTranslation();

  return (
    <div className="custom-select">
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { onChange, value, ref } }) => (
          <SelectInput
            id={name}
            instanceId={name}
            inputRef={ref}
            disabled={disabled}
            isMulti={isMulti}
            isLoading={isLoading}
            classNamePrefix={className}
            options={options}
            styles={colourStyles}
            placeholder={t(`${placeholder}`)}
            value={options.find((c: any) => c.value === value)}
            onChange={(val: any) => {
              onChange(isMulti ? val : val.value);
            }}
            noOptionsMessage={() => ''}
          />
        )}
      />
      <FormError name={name} errors={errors} />
    </div>
  );
};

export { FormSelect, CreatableSelect };


