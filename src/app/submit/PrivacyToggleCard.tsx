// src/components/submit/PrivacyToggleCard.tsx
"use client";
import * as React from "react";
import { FormControlLabel, Switch } from "@mui/material";
import SectionCard from "./SectionCard";

export default function PrivacyToggleCard({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <SectionCard
      title="Enhance Privacy and Anonymity"
      subtitle="Automatically hides specific fields until there are enough submissions to safely display the full details."
    >
      <FormControlLabel
        label="Privacy Enhanced"
        control={
          <Switch
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
          />
        }
        sx={{ ml: 0 }}
      />
    </SectionCard>
  );
}
