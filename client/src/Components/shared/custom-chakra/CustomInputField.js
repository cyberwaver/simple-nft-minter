import { FormControl, FormErrorMessage, FormLabel, InputProps } from "@chakra-ui/react";
import { CustomInput } from "./custom-input";

export const CustomInputField = ({ label, name, formik, isRequired = false, ...otherProps }) => {
  const { values, touched, errors, handleBlur, handleChange } = formik;
  const inputProps = {
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    ...otherProps,
  };
  return (
    <FormControl isRequired={isRequired} isInvalid={!!(touched[name] && errors[name])}>
      <FormLabel>{label}</FormLabel>
      <CustomInput {...inputProps} />
      <FormErrorMessage>{errors[name]}</FormErrorMessage>
    </FormControl>
  );
};
