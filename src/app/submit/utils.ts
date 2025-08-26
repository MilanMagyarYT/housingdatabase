// src/lib/submit/utils.ts
import { RentingFrom } from './types';

export function numberOrEmpty(v: string): number | '' {
  const n = Number(String(v).replace(/[^\d.]/g, ''));
  return Number.isFinite(n) && n >= 0 ? n : '';
}
export function numberOr0(v: number | string | undefined | ''): number {
  if (v === '' || v == null) return 0;
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}
export function isPositiveNumber(v: number | '' | undefined) {
  return typeof v === 'number' && v > 0;
}
export function toggleInArray<T>(arr: T[], item: T) {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
}
export function labelize(s: string) {
  return s.charAt(0) + s.slice(1).toLowerCase();
}
export function formatEuro(n: number) {
  try {
    return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
  } catch {
    return `€${n}`;
  }
}
export function isValidEmailOrEmpty(v?: string) {
  if (!v) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
export function normalizePostalCode(v: string) {
  return v.toUpperCase().replace(/\s+/g, ' ').trim();
}
export function isValidPostalCode(v: string) {
  // 4 digits + space + 2 letters  OR  4 digits + space + 2 digits
  return /^(\d{4}\s?[A-Z]{2}|\d{4}\s?\d{2})$/.test(v.trim().toUpperCase());
}
export function prettyRentingFrom(v: RentingFrom) {
  if (v === 'AGENCY') return 'Agency';
  if (v === 'LANDLORD') return 'Landlord';
  return 'Subletting';
}
