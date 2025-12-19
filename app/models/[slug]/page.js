
import modelsData from '@/data/models.json';
import { notFound } from 'next/navigation';
import ModelDetails from './ModelDetails';

export const dynamic = 'error';       
export const dynamicParams = false;   // only prebuilt slugs

export default function Page({ params: { slug } }) {
  const model = modelsData[slug];
  if (!model) notFound();
  return <ModelDetails model={model} />;
}

export function generateStaticParams() {
  return Object.keys(modelsData).map((slug) => ({ slug }));
}
