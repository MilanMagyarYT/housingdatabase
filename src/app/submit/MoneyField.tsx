// src/components/submit/MoneyField.tsx
"use client";
import * as React from "react";
import { TextField, InputAdornment } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { numberOrEmpty } from "./utils";

type MoneyFieldProps = {
  label: string;
  value?: number | "";
  onChange: (v: number | "") => void;
  helper?: string;
  sx?: SxProps<Theme>;
};

export default function MoneyField({
  label,
  value,
  onChange,
  helper,
  sx,
}: MoneyFieldProps) {
  return (
    <TextField
      fullWidth
      label={label}
      value={value ?? ""}
      onChange={(e) => onChange(numberOrEmpty(e.target.value))}
      helperText={helper ?? " "}
      InputProps={{
        inputMode: "numeric",
        startAdornment: <InputAdornment position="start">€</InputAdornment>,
      }}
      sx={sx}
    />
  );
}
