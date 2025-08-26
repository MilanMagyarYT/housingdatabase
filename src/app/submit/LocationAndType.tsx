// src/components/submit/LocationAndType.tsx
"use client";
import * as React from "react";
import {
  Stack,
  TextField,
  MenuItem,
  InputAdornment,
  Autocomplete,
} from "@mui/material";
import SectionCard from "./SectionCard";
import NextHint from "./NextHint";
import { FormState, UnitType } from "./types";
import {
  isPositiveNumber,
  isValidPostalCode,
  normalizePostalCode,
} from "./utils";
import { NL_CITIES, UNIT_TYPES } from "./constants";

export default function LocationAndType({
  data,
  set,
}: {
  data: FormState;
  set: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  const stepDone =
    !!data.city &&
    !!data.street &&
    isValidPostalCode(data.postalCode ?? "") &&
    !!data.unitType &&
    isPositiveNumber(data.areaSqm);

  return (
    <SectionCard title="Location & Type" required>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
        <Autocomplete
          fullWidth
          freeSolo
          options={[...NL_CITIES]}
          value={data.city ?? ""}
          onInputChange={(_, v) => set("city", v || undefined)}
          renderInput={(params) => <TextField {...params} label="City" />}
        />
        <TextField
          fullWidth
          label="Neighborhood (optional)"
          value={data.neighborhood ?? ""}
          onChange={(e) => set("neighborhood", e.target.value)}
        />
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
        <TextField
          fullWidth
          required
          label="Street"
          value={data.street ?? ""}
          onChange={(e) => set("street", e.target.value)}
        />
        <TextField
          fullWidth
          required
          label="Postal code"
          placeholder="e.g. 9713 ED"
          value={data.postalCode ?? ""}
          onChange={(e) =>
            set("postalCode", normalizePostalCode(e.target.value))
          }
          error={!!data.postalCode && !isValidPostalCode(data.postalCode)}
          helperText={
            data.postalCode && !isValidPostalCode(data.postalCode)
              ? "Format: 1234 AB (or 1234 12)"
              : " "
          }
        />
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
        <TextField
          fullWidth
          select
          required
          label="Type of housing"
          value={data.unitType ?? ""}
          onChange={(e) => set("unitType", e.target.value as UnitType)}
        >
          {UNIT_TYPES.map((t) => (
            <MenuItem key={t} value={t}>
              {t[0] + t.slice(1).toLowerCase()}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          sx={{ maxWidth: { sm: 220 } }}
          required
          label="Size (m²)"
          value={data.areaSqm ?? ""}
          onChange={(e) => set("areaSqm", numberOrEmpty(e.target.value))}
          InputProps={{
            endAdornment: <InputAdornment position="end">m²</InputAdornment>,
            inputMode: "numeric",
          }}
        />
      </Stack>

      <NextHint done={stepDone} />
    </SectionCard>
  );
}

function numberOrEmpty(v: string): number | "" {
  const n = Number(String(v).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) && n >= 0 ? n : "";
}
