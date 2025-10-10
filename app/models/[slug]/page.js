// ⛔ No "use client" in this file
import modelsData from '@/data/models.json';
import { notFound } from 'next/navigation';

import ModelPageClient from './ModelPageClient';

export default function Page({ params: { slug } }) {
  const model = modelsData[slug];
  if (!model) return notFound();
  return <ModelPageClient model={model} />;
}

// Required for output: 'export'
export function generateStaticParams() {
  // If your JSON keys are the slugs (recommended), this is enough:
  return Object.keys(modelsData).map((slug) => ({ slug }));

  // If instead you store an array and each item has a "slug" prop, do:
  // return modelsArray.map((m) => ({ slug: m.slug }));
}

export const dynamicParams = false; // ensures only prebuilt slugs exist
