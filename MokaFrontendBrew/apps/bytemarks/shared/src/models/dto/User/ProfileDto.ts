import { ImageDto } from '@shared/models';

export interface ProfileDto {
  userId: string;
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: Date | null;
  bio: string | null;
  avatar: ImageDto | null;
}
