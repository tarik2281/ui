export interface DescriptionParagraph {
  title?: string;
  content: string;
}

export interface ProductBackend {
  idString: string;
  title: string;
  overviewDescription: string;
  shortDescription: string;
  features: string;
  longDescription: string;
  price: number;
  images: string;
}

export interface Product {
  id: number;
  idTitle: string;
  title: string;
  // thumbnailUrl: string;
  // shortDescription: string;
  // longDescription: string;
  price: number;
  images: string[];
  overviewDescription: string;
  shortDescription: string;
  featuresDescription: string[];
  longDescription: DescriptionParagraph[];
}
