export type Vertical = string | null;
export type PageType = "geo" | "service" | "blog" | "resource" | "comparison";
export type PageStatus = "draft" | "review" | "published" | "indexed";

export type BlockType =
  | "intro"
  | "text"
  | "callout"
  | "bullets"
  | "steps"
  | "comparison"
  | "image"
  | "stat-grid"
  | "cta"
  // Legacy types from Phase 2 seed
  | "hero"
  | "services"
  | "why";

export interface BulletItem {
  title: string;
  body: string;
}

export interface StepItem {
  title: string;
  body: string;
}

export interface StatItem {
  value: string;
  label: string;
  note?: string;
}

export interface ComparisonRow {
  feature: string;
  left: string;
  right: string;
}

export interface ContentSection {
  type: BlockType;
  heading?: string;
  body?: string;
  items?: BulletItem[] | { title: string; description: string }[];
  reasons?: { title: string; description: string }[];
  steps?: StepItem[];
  stats?: StatItem[];
  rows?: ComparisonRow[];
  left_label?: string;
  right_label?: string;
  image_slot?: "mid-1" | "mid-2" | "mid-3";
  caption?: string;
  imageRef?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PageRow {
  id: string;
  vertical: Vertical;
  page_type: PageType;
  url_slug: string;
  city: string | null;
  county: string | null;
  wave: number | null;
  primary_keyword: string | null;
  supporting_keywords: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  h1: string | null;
  content: ContentSection[] | null;
  faq: FAQItem[] | null;
  schema_markup: Record<string, unknown> | null;
  word_count: number | null;
  og_image_url: string | null;
  status: PageStatus;
  published_at: string | null;
  indexing_requested_at: string | null;
  indexed_at: string | null;
  gsc_status: string | null;
  spanish_variant: boolean;
  created_at: string;
  updated_at: string;
}

export interface PhotoRow {
  id: string;
  page_id: string;
  vertical: Vertical;
  photo_type: "ai_generated" | "real_job";
  storage_path: string;
  public_url: string;
  alt_text: string | null;
  width: number | null;
  height: number | null;
  file_size_kb: number | null;
  prompt_used: string | null;
  created_at: string;
}

export interface PageWithPhotos extends PageRow {
  photos: PhotoRow[];
}
