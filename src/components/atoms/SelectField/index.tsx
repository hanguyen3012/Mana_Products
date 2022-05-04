import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

import { InputTypes } from "../../../types";
import { FormError } from "../Error";
import { useTranslation } from "react-i18next";
interface InterfaceSelect extends InputTypes {
  options: any;
  isMulti?: boolean;
  isCreatable?: boolean;
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
  errors,
}: InterfaceSelect) => {
  const [t] = useTranslation();
  return (
    <div className="width-per-100">
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { onChange, value, ref } }) => {
          return (
            <div className="custom-select">
            <select onChange={(e) => onChange(e.target.value)}>
              <option value="1">Tran001</option>
              <option value="2">Tran002</option>
              <option value="3">Tran003</option>
              <option value="4">Tran004</option>
              <option value="5">Tran005</option>
              <option value="6">Tran006</option>
              <option value="7">Tran007</option>
            </select>
            </div>
          );
        }}
      />
      <FormError name={name} errors={errors} />
    </div>
  );
};

export { FormSelect, CreatableSelect };
