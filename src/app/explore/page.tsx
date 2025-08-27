// src/app/explore/page.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  TextField,
  Autocomplete,
  Card,
  CardContent,
  Stack,
  Typography,
  Chip,
  CircularProgress,
  Button,
} from "@mui/material";
import { BRAND } from "@/app/submit/constants";
import { NL_CITIES } from "@/app/submit/constants";

type Row = {
  id: string;
  city: string | null;
  address: string;
  unitType: string | null;
  areaSqm: number | null;
  total: number | null;
  baseRent: number | null;
  service: number | null;
  utilities: number | null;
  furnishing: string | null;
  registration: boolean | null;
  facilities: string[];
  createdAt: number | null; // ms
  landlord: string | null;
};

export default function ExplorePage() {
  const router = useRouter();
  const [city, setCity] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);
  const [rows, setRows] = React.useState<Row[]>([]);

  const fetchCity = async (c: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/listings?city=${encodeURIComponent(c)}&limit=100`
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to load");
      setRows(json.rows || []);
    } catch (e) {
      console.error(e);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (city) fetchCity(city);
  }, [city]);

  const goToCity = () => {
    if (!city.trim()) return;
    router.push(`/city/${encodeURIComponent(city.trim())}`);
  };

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
          Explore Listings
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }} gap={1}>
          <Autocomplete
            freeSolo
            options={[...NL_CITIES]}
            value={city}
            onInputChange={(_, v) => setCity(v || "")}
            renderInput={(p) => (
              <TextField
                {...p}
                label="City"
                placeholder="Start typing a Dutch city…"
              />
            )}
            onChange={(_, v) => {
              // If user selects from the dropdown, take them straight to the city page.
              if (typeof v === "string" && v.trim()) {
                router.push(`/city/${encodeURIComponent(v.trim())}`);
              }
            }}
            sx={{ flex: 1 }}
          />

          <Button
            onClick={goToCity}
            disabled={!city.trim()}
            sx={{
              bgcolor: BRAND.accent,
              color: "#111",
              borderRadius: 2,
              fontWeight: 800,
              px: 2.5,
              whiteSpace: "nowrap",
              "&:hover": { bgcolor: BRAND.accentHover },
            }}
          >
            Open full filters
          </Button>
        </Stack>

        {loading && (
          <Stack direction="row" alignItems="center" gap={1}>
            <CircularProgress size={20} />
            <Typography>Loading…</Typography>
          </Stack>
        )}

        <Stack gap={1.5}>
          {rows.map((r) => (
            <Card
              key={r.id}
              elevation={0}
              onClick={goToCity} // make card open the city page too
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                bgcolor: "background.paper",
                cursor: city ? "pointer" : "default",
                "&:hover": city
                  ? {
                      borderColor: BRAND.accent,
                      boxShadow: "0 0 0 3px rgba(255,176,0,0.15)",
                    }
                  : undefined,
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
                  {r.city && <Chip label={r.city} />}
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

          {!loading && city && rows.length === 0 && (
            <Typography sx={{ color: "text.secondary" }}>
              No results yet for {city}. Try another city.
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
