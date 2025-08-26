// src/components/submit/NextHint.tsx
"use client";
import * as React from "react";
import { Box, Divider, Typography } from "@mui/material";

export default function NextHint({ done }: { done: boolean }) {
  return (
    <Box sx={{ pt: 0.5 }}>
      <Divider sx={{ my: 1 }} />
      <Typography
        sx={{
          fontWeight: 700,
          color: done ? "success.main" : "text.secondary",
        }}
      >
        {done
          ? "Nice! Next section unlocked ↓"
          : "Fill the required fields to unlock the next section"}
      </Typography>
    </Box>
  );
}
