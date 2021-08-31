import { FormControl, FormErrorMessage, FormLabel, SelectProps } from "@chakra-ui/react";
import { CustomSelect } from "./custom-select";

const defaultFormatter = (d) => d;
export const CustomSelectField = ({
  label,
  name,
  placeholder,
  list,
  isRequired = false,
  valueFormatter = defaultFormatter,
  textFormatter = defaultFormatter,
  formik,
  ...otherProps
}) => {
  const { values, touched, errors, handleBlur, handleChange } = formik;
  const selectProps = {
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    ...otherProps,
  };

  return (
    <FormControl isRequired={isRequired} isInvalid={!!(touched[name] && errors[name])}>
      <FormLabel>{label}</FormLabel>
      <CustomSelect {...selectProps}>
        <option>{placeholder}</option>
        {list.map((v, i) => (
          <option key={i} value={valueFormatter(v)}>
            {textFormatter(v)}
          </option>
        ))}
      </CustomSelect>
      <FormErrorMessage>{errors[name]}</FormErrorMessage>
    </FormControl>
  );
};
