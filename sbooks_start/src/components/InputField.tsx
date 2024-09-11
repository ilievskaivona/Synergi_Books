import {
  FormControl,
  TextField,
  Typography,
  TextFieldProps,
  SxProps,
  Theme,
} from "@mui/material";
import React from "react";
import { useField } from "formik";

type InputFieldProps = TextFieldProps & {
  fieldLabel: string;
  errorClass?: SxProps<Theme>;
};

export const InputField: React.FC<InputFieldProps> = ({
  fieldLabel,
  errorClass,
  ...props
}) => {
  const [field, { error }] = useField(props.name);

  return (
    <>
      <Typography sx={{ paddingBottom: "12px" }} variant="p2Medium">
        {fieldLabel}
      </Typography>
      <FormControl fullWidth>
        <Typography variant="p2Regular">
          <TextField {...props} {...field}></TextField>
        </Typography>
      
        {error ? (
          <Typography sx={errorClass} color={"red"}>
            {error}
          </Typography>
        ) : null}
      </FormControl>
    </>
  );
};
