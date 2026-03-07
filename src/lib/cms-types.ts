export type LocalizedText = {
  id: string;
  en: string;
};

export type TourRecord = {
  id: string;
  slug: string;
  title: LocalizedText;
  destination: LocalizedText;
  duration: string;
  price: string;
  rating: string;
  category: LocalizedText;
  summary: LocalizedText;
  highlights: {
    id: string[];
    en: string[];
  };
  image: string;
  gallery?: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type BlogRecord = {
  id: string;
  slug: string;
  title: LocalizedText;
  category: LocalizedText;
  excerpt: LocalizedText;
  content: {
    id: string[];
    en: string[];
  };
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type InquiryRecord = {
  id: string;
  type: "contact" | "tour";
  fullName: string;
  email: string;
  phone: string;
  destination: string;
  message: string;
  departureDate: string;
  locale: string;
  tourSlug: string;
  createdAt: string;
};

export type HomepageWhySection = {
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  points: {
    id: string[];
    en: string[];
  };
};

export type HomepageDestinationItem = {
  name: LocalizedText;
  label: LocalizedText;
  query: string;
  customLink: string;
};

export type HomepageFaqItem = {
  id: string;
  question: LocalizedText;
  answer: LocalizedText;
  keywords: string[];
};

export type HomepageDocumentationItem = {
  id: string;
  image: string;
  title: LocalizedText;
  label: LocalizedText;
};

export type HomepageSettings = {
  whySection: HomepageWhySection;
  topDestinations: HomepageDestinationItem[];
  faqItems: HomepageFaqItem[];
  documentationItems: HomepageDocumentationItem[];
};

export type CmsData = {
  tours: TourRecord[];
  blogs: BlogRecord[];
  inquiries: InquiryRecord[];
  homepage: HomepageSettings;
};
