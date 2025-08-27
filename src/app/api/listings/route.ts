// src/app/api/listings/route.ts
import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import type { QueryDocumentSnapshot, Timestamp } from 'firebase-admin/firestore';

type SubmissionDoc = {
  city?: string;
  street?: string;
  postalCode?: string;
  unitType?: string;
  areaSqm?: number;
  total?: number;
  baseRent?: number;
  service?: number;
  utilities?: number;
  furnishing?: string;
  registration?: boolean;
  facilities?: string[];
  createdAt?: Timestamp;
  rentingFromName?: string;
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const city = (searchParams.get('city') || '').trim();
    const max = searchParams.get('max') ? Number(searchParams.get('max')) : undefined;
    const unitType = searchParams.get('unitType') || undefined;
    const registration = searchParams.get('registration');
    const limit = Math.min(Number(searchParams.get('limit') || '100'), 500);

    if (!city) {
      return NextResponse.json({ error: 'city is required' }, { status: 400 });
    }

    let q = adminDb.collectionGroup('submissions').where('city', '==', city);

    if (typeof max === 'number' && !Number.isNaN(max)) {
      q = q.where('total', '<=', max);
    }
    if (unitType) {
      q = q.where('unitType', '==', unitType);
    }
    if (registration === 'true' || registration === 'false') {
      q = q.where('registration', '==', registration === 'true');
    }

    q = q.orderBy('total').limit(limit);

    const snap = await q.get();

    const rows = snap.docs.map((d: QueryDocumentSnapshot): {
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
      createdAt: number | null;
      landlord: string | null;
    } => {
      const x = d.data() as SubmissionDoc;
      return {
        id: d.id,
        city: x.city ?? null,
        address: [x.street, x.postalCode].filter(Boolean).join(', '),
        unitType: x.unitType ?? null,
        areaSqm: x.areaSqm ?? null,
        total: x.total ?? null,
        baseRent: x.baseRent ?? null,
        service: x.service ?? null,
        utilities: x.utilities ?? null,
        furnishing: x.furnishing ?? null,
        registration: x.registration ?? null,
        facilities: Array.isArray(x.facilities) ? x.facilities : [],
        createdAt: x.createdAt?.toMillis ? x.createdAt.toMillis() : null,
        landlord: x.rentingFromName ?? null,
      };
    });

    return NextResponse.json({ rows });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : typeof err === 'string' ? err : JSON.stringify(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
