import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textArea?: boolean
};

// '' => false
// 'error message stuff' => true

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  textArea,
  ...props
}) => {
  const [field, { error }] = useField(props);
  let C = Input;
  if (textArea) {
    // @ts-ignore
    C = Textarea;
  }
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <C {...field} {...props} id={field.name} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};