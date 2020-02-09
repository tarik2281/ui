export interface DescriptionParagraph {
  title?: string;
  content: string;
}

export interface Product {
  idString: string;
  title: string;
  overviewImage: string;
  overviewDescription: string;
  variants: ProductVariant[];
}

export interface ProductVariant {
  id: number;
  title: string;
  cartTitle: string;
  images: string[];
  price: number;
  shortDescription: string;
  features: string[];
  longDescription: DescriptionParagraph[];
}
