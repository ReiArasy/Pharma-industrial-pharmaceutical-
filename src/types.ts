export type Product = {
  slug: string;
  name: string;
  category:
    | 'Tablet Compression'
    | 'Mixing & Granulation'
    | 'Tablet Coating'
    | 'Filling & Packaging'
    | 'Capsule Filling'
    | 'Sterilization'
    | 'Cleanroom Equipment'
    | 'Labeling';
  capacity: string;
  compliance: string[];     // ["cGMP", "GMP", "ISO 9001"]
  cover: string;
  images: string[];
  specs: { label: string; value: string }[];
  description: string;
  specSheetUrl?: string;    // path to PDF
  featured: boolean;
};

export type Portfolio = {
  slug: string;
  title: string;
  clientName: string;
  clientIndustry: 'Pharmaceuticals' | 'Cosmetics' | 'Food & Beverage' | 'Cleanroom';
  year: string;
  location: string;
  cover: string;
  images: string[];
  challenge: string;
  result: string;
  quote: {
    text: string;
    author: string;
    role: string;
  };
  specs: { label: string; value: string }[];
  nextSlug: string;
  nextTitle: string;
};
