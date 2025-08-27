"use client";

import * as React from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  Stack,
  TextField,
  MenuItem,
  Typography,
  Chip,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { BRAND } from "@/app/submit/constants";

type Row = {
  id: string;
  address: string;
  unitType: string | null;
  areaSqm: number | null;
  total: number | null;
  furnishing: string | null;
  registration: boolean | null;
  facilities: string[];
  landlord: string | null;
};

const UNIT_TYPES = ["ROOM", "STUDIO", "APARTMENT"];

export default function CityPage() {
  const { city } = useParams<{ city: string }>();
  const router = useRouter();
  const sp = useSearchParams();

  const [rows, setRows] = React.useState<Row[]>([]);
  const [max, setMax] = React.useState<number | "">(
    sp.get("max") ? Number(sp.get("max")) : ""
  );
  const [unitType, setUnitType] = React.useState<string>(
    sp.get("unitType") || ""
  );
  const [registration, setRegistration] = React.useState<string>(
    sp.get("registration") || ""
  );

  const fetchData = async () => {
    const params = new URLSearchParams({ city: String(city) });
    if (max !== "" && !Number.isNaN(max)) params.set("max", String(max));
    if (unitType) params.set("unitType", unitType);
    if (registration) params.set("registration", registration);
    params.set("limit", "200");

    const res = await fetch(`/api/listings?${params.toString()}`);
    const json = await res.json();
    if (!res.ok) throw new Error(json?.error || "Failed");
    setRows(json.rows || []);
  };

  // Fetch on mount & when filters change
  React.useEffect(() => {
    fetchData().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, max, unitType, registration]);

  // Reflect filters in URL (nice for sharing)
  React.useEffect(() => {
    const params = new URLSearchParams();
    if (max !== "" && !Number.isNaN(max)) params.set("max", String(max));
    if (unitType) params.set("unitType", unitType);
    if (registration) params.set("registration", registration);
    router.replace(`?${params.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [max, unitType, registration]);

  return (
    <Box
      sx={{ bgcolor: BRAND.cream, minHeight: "100dvh", py: { xs: 2, md: 4 } }}
    >
      <Box
        sx={{
          maxWidth: 1000,
          mx: "auto",
          px: { xs: 1.5, md: 2 },
          display: "grid",
          gap: 2,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 800 }}>
          {decodeURIComponent(String(city))}
        </Typography>

        {/* Filters */}
        <Stack direction={{ xs: "column", sm: "row" }} gap={1.5}>
          <TextField
            label="Max price (€ / mo)"
            value={max}
            onChange={(e) => setMax(toNumberOrEmpty(e.target.value))}
            sx={{ maxWidth: 220 }}
            inputProps={{ inputMode: "numeric" }}
          />

          <TextField
            select
            label="Type"
            value={unitType}
            onChange={(e) => setUnitType(e.target.value)}
            sx={{ maxWidth: 200 }}
          >
            <MenuItem value="">Any</MenuItem>
            {UNIT_TYPES.map((u) => (
              <MenuItem key={u} value={u}>
                {u[0] + u.slice(1).toLowerCase()}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Registration"
            value={registration}
            onChange={(e) => setRegistration(e.target.value)}
            sx={{ maxWidth: 200 }}
          >
            <MenuItem value="">Any</MenuItem>
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </TextField>

          <Button
            onClick={() => {
              setMax("");
              setUnitType("");
              setRegistration("");
            }}
          >
            Reset
          </Button>
        </Stack>

        {/* Results */}
        <Stack gap={1.5}>
          {rows.map((r) => (
            <Card
              key={r.id}
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                bgcolor: "background.paper",
              }}
            >
              <CardContent sx={{ display: "grid", gap: 0.5 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="baseline"
                >
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    {r.address || "—"}
                  </Typography>
                  {typeof r.total === "number" && (
                    <Chip
                      label={`€${Math.round(r.total).toLocaleString(
                        "nl-NL"
                      )}/mo`}
                      sx={{ bgcolor: BRAND.creamAlt }}
                    />
                  )}
                </Stack>
                <Stack direction="row" gap={1} flexWrap="wrap">
                  {r.unitType && <Chip label={titleize(r.unitType)} />}
                  {r.areaSqm != null && <Chip label={`${r.areaSqm} m²`} />}
                  {r.furnishing && <Chip label={titleize(r.furnishing)} />}
                  {typeof r.registration === "boolean" && (
                    <Chip
                      label={`Registration: ${r.registration ? "Yes" : "No"}`}
                    />
                  )}
                  {r.landlord && <Chip label={r.landlord} />}
                </Stack>
                {r.facilities?.length ? (
                  <Typography sx={{ color: "text.secondary" }}>
                    {r.facilities.join(" • ")}
                  </Typography>
                ) : null}
              </CardContent>
            </Card>
          ))}
          {!rows.length && (
            <Typography sx={{ color: "text.secondary" }}>
              No results with these filters yet.
            </Typography>
          )}
        </Stack>
      </Box>
    </Box>
  );
}

function titleize(s: string) {
  return s.charAt(0) + s.slice(1).toLowerCase();
}
function toNumberOrEmpty(v: string): number | "" {
  const n = Number(String(v).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) && n >= 0 ? n : "";
}
