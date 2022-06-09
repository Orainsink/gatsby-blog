import type { DeepNonNullable, DeepRequired } from 'ts-essentials';

export type DeepRequiredAndNonNullable<T> = DeepRequired<DeepNonNullable<T>>;

export interface TableOfContents {
  url?: string;
  title?: string;
  items?: TableOfContents[];
}
