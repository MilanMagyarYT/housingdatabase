// src/lib/submit/types.ts
import { UNIT_TYPES, FURNISHING, RENTING_FROM } from './constants';

export type UnitType = typeof UNIT_TYPES[number];
export type Furnishing = typeof FURNISHING[number];
export type RentingFrom = typeof RENTING_FROM[number];

export type FormState = {
  // Step 1
  city?: string;
  neighborhood?: string;
  street?: string;
  postalCode?: string;
  unitType?: UnitType;
  areaSqm?: number | '';
  // Step 2
  baseRent?: number | '';
  service?: number | '';
  utilities?: number | '';
  total?: number | '';
  deposit?: number | '';
  // Step 3
  furnishing?: Furnishing;
  registration?: boolean | null;
  registrationCount?: number | '';
  allowance?: boolean | null;
  facilities: string[];
  // Context & verify
  rentingFrom?: RentingFrom;
  rentingFromName?: string;
  notes?: string;
  email?: string;
  // Privacy
  privacyEnhanced?: boolean;
};
