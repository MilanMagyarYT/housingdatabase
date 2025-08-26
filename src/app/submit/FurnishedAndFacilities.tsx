// src/components/submit/FurnishingAndFacilities.tsx
"use client";
import * as React from "react";
import {
  Box,
  Chip,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SectionCard from "./SectionCard";
import NextHint from "./NextHint";
import { FormState, Furnishing } from "./types";
import { FURNISHING } from "./constants";
import { labelize, toggleInArray } from "./utils";

export default function FurnishingAndFacilities({
  data,
  set,
}: {
  data: FormState;
  set: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  const stepDone = !!data.furnishing && data.registration !== null;

  return (
    <SectionCard title="Furnishing & Facilities" required>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
        <TextField
          fullWidth
          select
          label="Interior"
          value={data.furnishing ?? ""}
          onChange={(e) => set("furnishing", e.target.value as Furnishing)}
        >
          {FURNISHING.map((f) => (
            <MenuItem key={f} value={f}>
              {labelize(f)}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          fullWidth
          label="Registration (GBA) allowed?"
          value={
            data.registration === null ? "" : data.registration ? "YES" : "NO"
          }
          onChange={(e) => {
            const v = e.target.value;
            set("registration", v === "" ? null : v === "YES");
            if (v !== "YES") set("registrationCount", "");
          }}
        >
          <MenuItem value="YES">Yes</MenuItem>
          <MenuItem value="NO">No</MenuItem>
          <MenuItem value="">Don’t know</MenuItem>
        </TextField>
      </Stack>

      {data.registration === true && (
        <TextField
          sx={{ maxWidth: { sm: 280 } }}
          label="Number of people that can register (optional)"
          value={data.registrationCount ?? ""}
          onChange={(e) =>
            set("registrationCount", numberOrEmpty(e.target.value))
          }
          inputProps={{ inputMode: "numeric" }}
        />
      )}

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
        <TextField
          select
          fullWidth
          label="Housing allowance eligible?"
          value={data.allowance === null ? "" : data.allowance ? "YES" : "NO"}
          onChange={(e) => {
            const v = e.target.value;
            set("allowance", v === "" ? null : v === "YES");
          }}
        >
          <MenuItem value="YES">Yes</MenuItem>
          <MenuItem value="NO">No</MenuItem>
          <MenuItem value="">Don’t know</MenuItem>
        </TextField>
      </Stack>

      <Box sx={{ mt: 1 }}>
        <Typography sx={{ fontWeight: 700, mb: 1 }}>
          Facilities (optional)
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {[
            "Private kitchen",
            "Private bathroom",
            "Balcony",
            "Garden",
            "Parking",
            "Storage",
          ].map((f) => {
            const selected = data.facilities.includes(f);
            return (
              <Chip
                key={f}
                label={f}
                variant={selected ? "filled" : "outlined"}
                color={selected ? "primary" : undefined}
                onClick={() =>
                  set("facilities", toggleInArray(data.facilities, f))
                }
                sx={{ borderRadius: 2 }}
              />
            );
          })}
        </Stack>
      </Box>

      <NextHint done={stepDone} />
    </SectionCard>
  );
}

function numberOrEmpty(v: string): number | "" {
  const n = Number(String(v).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) && n >= 0 ? n : "";
}
