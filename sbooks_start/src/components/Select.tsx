import {
  FormControl,
  Select as MuiSelect,
  Typography,
  SelectProps as MuiSelectProps,
  MenuItem,
} from "@mui/material";
import React, { ReactNode } from "react";
import { useField } from "formik";

type SelectProps = MuiSelectProps & {
  fieldLabel: string;
  children: ReactNode;
  initialValue?: string;
};

export const Select: React.FC<SelectProps> = ({
  fieldLabel,
  children,
  initialValue,
  ...props
}) => {
  const [field, { error }, helpers] = useField(props.name);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    helpers.setValue(event.target.value);
  };

  React.useEffect(() => {
    if (initialValue !== undefined && field.value === "") {
      helpers.setValue(initialValue);
    }
  }, [initialValue, field.value, helpers]);

  return (
    <>
      <Typography variant="p2Medium" sx={{ paddingBottom: "12px" }}>
        {fieldLabel}
      </Typography>
      <FormControl fullWidth>
        <MuiSelect onChange={handleChange} {...field} {...props}>
          {children}
        </MuiSelect>
        {error && <Typography>{error}</Typography>}
      </FormControl>
    </>
  );
};
