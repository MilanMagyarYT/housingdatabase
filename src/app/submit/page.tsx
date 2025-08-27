"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";
import { FormState } from "./types";
import { isPositiveNumber, isValidEmailOrEmpty, numberOr0 } from "./utils";
import { BRAND } from "./constants";
import PrivacyToggleCard from "./PrivacyToggleCard";
import LocationAndType from "./LocationAndType";
import RentAndCosts from "./RentAndCosts";
import FurnishingAndFacilities from "./FurnishedAndFacilities";
import ContextVerification from "./ContextVerification";
import SubmitBar from "./SubmitBar";
import BottomSpacer from "./BottomSpace";
import { saveSubmission } from "@/lib/submit/saveSubmission";
import ThankYouDialog from "./ThankYouDialog";

function getErrorMessage(err: unknown) {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  try {
    return JSON.stringify(err);
  } catch {
    return "Failed to save submission.";
  }
}

export default function SubmitHousingPage() {
  const [thanksOpen, setThanksOpen] = React.useState(false);

  const [data, setData] = React.useState<FormState>({
    facilities: [],
    registration: null,
    allowance: null,
    privacyEnhanced: false,
  });

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  React.useEffect(() => {
    const base = numberOr0(data.baseRent);
    const svc = numberOr0(data.service);
    const util = numberOr0(data.utilities);
    setData((d) => ({ ...d, total: base + svc + util || "" }));
  }, [data.baseRent, data.service, data.utilities]);

  // Reveal conditions (mirror the section components)
  const step1Done =
    !!data.city &&
    !!data.street &&
    !!data.postalCode &&
    !!data.unitType &&
    isPositiveNumber(data.areaSqm);
  const step2Done =
    isPositiveNumber(data.baseRent) && isPositiveNumber(data.total);
  const step3Done = !!data.furnishing && data.registration !== null;
  const contextDone = !!data.rentingFrom;

  const canSubmit =
    step1Done &&
    step2Done &&
    step3Done &&
    contextDone &&
    isValidEmailOrEmpty(data.email);

  const onSubmit = async () => {
    try {
      await saveSubmission(data);
      setThanksOpen(true);
    } catch (err: unknown) {
      console.error(err);
      alert(getErrorMessage(err));
    }
  };

  const handleThanksClose = () => {
    setThanksOpen(false);
  };

  return (
    <Box
      sx={{ bgcolor: BRAND.cream, minHeight: "100dvh", py: { xs: 2, md: 4 } }}
    >
      <Box
        sx={{
          maxWidth: 880,
          mx: "auto",
          px: { xs: 1.5, md: 2 },
          display: "grid",
          gap: 2.5,
        }}
      >
        <Box sx={{ mb: 0.5 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
            Add Your Housing Details
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Help students see real prices and conditions across the Netherlands.
            Takes ~2 minutes.
          </Typography>
        </Box>

        <PrivacyToggleCard
          value={!!data.privacyEnhanced}
          onChange={(v) => set("privacyEnhanced", v)}
        />

        <LocationAndType data={data} set={set} />
        {step1Done && <RentAndCosts data={data} set={set} />}
        {step1Done && step2Done && (
          <FurnishingAndFacilities data={data} set={set} />
        )}
        {step1Done && step2Done && step3Done && (
          <ContextVerification data={data} set={set} />
        )}

        {step1Done && step2Done && step3Done && (
          <SubmitBar
            totalPerMonth={numberOr0(data.total)}
            disabled={!canSubmit}
            onSubmit={onSubmit}
          />
        )}

        {/* Add the dialog here */}
        <ThankYouDialog open={thanksOpen} onClose={handleThanksClose} />

        <BottomSpacer />
      </Box>
    </Box>
  );
}
