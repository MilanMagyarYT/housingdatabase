// src/components/submit/SectionCard.tsx
"use client";
import * as React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Chip,
  Typography,
} from "@mui/material";
import { BRAND } from "./constants";

export default function SectionCard({
  title,
  subtitle,
  required,
  children,
}: React.PropsWithChildren<{
  title: string;
  subtitle?: string;
  required?: boolean;
}>) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              {title}
            </Typography>
            {required && (
              <Chip
                size="small"
                label="Required"
                sx={{ bgcolor: BRAND.accent, color: "#111", fontWeight: 700 }}
              />
            )}
          </Box>
        }
        subheader={subtitle}
        sx={{ pb: 0.5 }}
      />
      <CardContent sx={{ display: "grid", gap: 1.5 }}>{children}</CardContent>
    </Card>
  );
}
