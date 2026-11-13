export interface User {
  id: number;
  firstname: string;
  lastname: string;
  avatarUrl: string;
  attribution: string;
  bio?: string;
  nbPublications: number;
  memberSince: number;
}
