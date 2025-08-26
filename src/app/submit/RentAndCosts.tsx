// src/components/submit/RentAndCosts.tsx
"use client";
import * as React from "react";
import { Stack } from "@mui/material";
import SectionCard from "./SectionCard";
import NextHint from "./NextHint";
import MoneyField from "./MoneyField";
import { isPositiveNumber } from "./utils";
import { FormState } from "./types";
import { HelperText } from "./bits";

export default function RentAndCosts({
  data,
  set,
}: {
  data: FormState;
  set: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  const stepDone =
    isPositiveNumber(data.baseRent) && isPositiveNumber(data.total);

  return (
    <SectionCard title="Rent & Costs" required>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
        <MoneyField
          label="Base rent (per month)"
          value={data.baseRent}
          onChange={(v) => set("baseRent", v)}
          helper="per month"
        />
        <MoneyField
          label="Service costs"
          value={data.service}
          onChange={(v) => set("service", v)}
        />
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
        <MoneyField
          label="Utilities (per month)"
          value={data.utilities}
          onChange={(v) => set("utilities", v)}
          helper="per month"
        />
        <MoneyField
          label="Total (per month)"
          value={data.total}
          onChange={(v) => set("total", v)}
          helper="per month"
        />
      </Stack>

      <MoneyField
        label="Deposit"
        value={data.deposit}
        onChange={(v) => set("deposit", v)}
        sx={{ maxWidth: { sm: 280 } }}
      />

      <HelperText>
        “Total” auto = base + service + utilities. Adjust if all-inclusive.
      </HelperText>
      <NextHint done={stepDone} />
    </SectionCard>
  );
}
