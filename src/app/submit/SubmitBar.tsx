// src/components/submit/SubmitBar.tsx
"use client";
import * as React from "react";
import { Card, Stack, Typography, Button } from "@mui/material";
import { BRAND } from "./constants";

export default function SubmitBar({
  totalPerMonth,
  disabled,
  onSubmit,
}: {
  totalPerMonth: number;
  disabled: boolean;
  onSubmit: () => void;
}) {
  return (
    <Card
      elevation={0}
      sx={{
        position: { xs: "static", md: "sticky" },
        bottom: 12,
        bgcolor: BRAND.creamAlt,
        borderRadius: 3,
        p: 2,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="space-between"
        gap={1.5}
      >
        <Typography sx={{ fontWeight: 700 }}>
          Total rent: €{totalPerMonth.toLocaleString("nl-NL")} / month
        </Typography>
        <Button
          size="large"
          onClick={onSubmit}
          disabled={disabled}
          sx={{
            bgcolor: BRAND.accent,
            color: "#111",
            borderRadius: 2,
            px: 3,
            fontWeight: 800,
            "&:hover": { bgcolor: BRAND.accentHover },
          }}
        >
          Submit Housing ➜
        </Button>
      </Stack>
    </Card>
  );
}
