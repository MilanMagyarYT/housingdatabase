"use client";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { BRAND } from "./constants";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ThankYouDialog({ open, onClose }: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
          bgcolor: BRAND.creamAlt,
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <CheckCircleOutlineIcon sx={{ color: BRAND.accent, fontSize: 28 }} />
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          Thank you!
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "grid", gap: 1 }}>
          <Typography sx={{ color: "text.primary" }}>
            Your housing details were submitted successfully.
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Your contribution helps students see transparent prices and
            conditions across the Netherlands.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            bgcolor: BRAND.accent,
            color: "#111",
            borderRadius: 2,
            fontWeight: 800,
            px: 2.5,
            "&:hover": { bgcolor: BRAND.accentHover },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
