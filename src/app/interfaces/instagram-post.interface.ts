export interface InstagramPost {
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  caption?: string;
  permalink?: string;
  // ... otras propiedades
}