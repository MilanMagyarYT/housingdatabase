// src/lib/submit/saveSubmission.ts
import { FormState } from '@/app/submit/types';
import { db } from '@/lib/firebase';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';

export async function saveSubmission(data: FormState) {
  if (!data.email) {
    throw new Error('Email is required to save your submission.');
  }

  const emailHash = await sha256Hex(data.email.trim().toLowerCase());

  // shape the payload we store (avoid storing raw email)
  const payload = {
    // Required bits
    city: data.city ?? null,
    neighborhood: data.neighborhood ?? null,
    street: data.street ?? null,
    postalCode: data.postalCode ?? null,
    unitType: data.unitType ?? null,
    areaSqm: data.areaSqm ?? null,

    baseRent: data.baseRent ?? null,
    service: data.service ?? null,
    utilities: data.utilities ?? null,
    total: data.total ?? null,
    deposit: data.deposit ?? null,

    furnishing: data.furnishing ?? null,
    registration: data.registration ?? null,
    registrationCount: data.registrationCount ?? null,
    allowance: data.allowance ?? null,
    facilities: data.facilities ?? [],

    rentingFrom: data.rentingFrom ?? null,
    rentingFromName: data.rentingFromName ?? null,
    notes: data.notes ?? null,

    privacyEnhanced: !!data.privacyEnhanced,

    // meta
    emailHash,
    createdAt: serverTimestamp(),
  };

  // /listings/{emailHash}/submissions/{autoId}
  const ref = doc(collection(db, 'listings', emailHash, 'submissions'));
  await setDoc(ref, payload);
  return { id: ref.id, emailHash };
}

async function sha256Hex(input: string): Promise<string> {
  const enc = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  const bytes = Array.from(new Uint8Array(buf));
  return bytes.map(b => b.toString(16).padStart(2, '0')).join('');
}
