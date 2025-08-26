// src/lib/submit/constants.ts
export const BRAND = {
  accent: '#ffb000',
  accentHover: '#e6a000',
  cream: '#FFF4E4',
  creamAlt: '#FFEACC',
};

// Options (extend later or fetch from DB)
export const NL_CITIES = ['Groningen', 'Amsterdam', 'Utrecht', 'Eindhoven', 'Rotterdam'] as const;
export const UNIT_TYPES = ['ROOM', 'STUDIO', 'APARTMENT'] as const;
export const FURNISHING = ['BARE', 'UPHOLSTERED', 'FURNISHED'] as const;
export const RENTING_FROM = ['AGENCY', 'LANDLORD', 'SUBLETTING'] as const;
