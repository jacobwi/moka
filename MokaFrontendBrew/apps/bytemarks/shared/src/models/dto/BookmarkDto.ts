/* eslint-disable @typescript-eslint/no-explicit-any */
import { BookmarkCategoryDto, ImageDto } from '@shared/models';

// Purpose: DTO for Bookmark model.
export interface BookmarkDto {
  tag: any;
  category: any;
  id?: number;
  title: string;
  url: string;
  description: string;
  isPasswordProtected: boolean;
  image?: ImageDto;
  tags: BookmarkDto[];
  categories: BookmarkCategoryDto[];
}
