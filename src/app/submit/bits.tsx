// src/components/submit/bits.tsx
"use client";
import * as React from "react";
import { Typography } from "@mui/material";

type HelperTextProps = {
  children: React.ReactNode;
};

export function HelperText({ children }: HelperTextProps) {
  return (
    <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
      {children}
    </Typography>
  );
}
