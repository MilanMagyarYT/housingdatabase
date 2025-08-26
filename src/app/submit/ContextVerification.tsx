// src/components/submit/ContextVerification.tsx
"use client";
import * as React from "react";
import { MenuItem, Stack, TextField } from "@mui/material";
import SectionCard from "./SectionCard";
import { FormState, RentingFrom } from "./types";
import { RENTING_FROM } from "./constants";
import { prettyRentingFrom } from "./utils";

export default function ContextVerification({
  data,
  set,
}: {
  data: FormState;
  set: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  return (
    <SectionCard title="Context & Verification">
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        alignItems="stretch"
      >
        <TextField
          select
          required
          fullWidth
          label="Renting from"
          value={data.rentingFrom ?? ""}
          onChange={(e) => set("rentingFrom", e.target.value as RentingFrom)}
        >
          {RENTING_FROM.map((v) => (
            <MenuItem key={v} value={v}>
              {prettyRentingFrom(v)}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Name (agency/landlord) — optional"
          value={data.rentingFromName ?? ""}
          onChange={(e) => set("rentingFromName", e.target.value)}
        />
      </Stack>

      <TextField
        fullWidth
        multiline
        minRows={3}
        label="Additional details (optional)"
        placeholder="Anything that stood out? Good/bad experiences?"
        value={data.notes ?? ""}
        onChange={(e) => set("notes", e.target.value)}
      />

      <TextField
        fullWidth
        type="email"
        label="Email (never shown, for verification/removal)"
        value={data.email ?? ""}
        onChange={(e) => set("email", e.target.value)}
      />
    </SectionCard>
  );
}
