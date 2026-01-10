// Supabase Storage URL utilities

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';

type StorageBucket = 'albums' | 'images';

/**
 * Get the public URL for a file in Supabase storage
 * @param bucket - Storage bucket name ('albums', 'images', etc.)
 * @param path - File path within the bucket
 * @returns Full public URL
 */
export function getStorageUrl(bucket: StorageBucket, path: string): string {
  if (!SUPABASE_URL) {
    console.warn('SUPABASE_URL is not configured');
    return '';
  }

  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${cleanPath}`;
}

/**
 * Get album cover image URL
 * @param filename - Image filename (e.g., 'aspiration.jpg')
 * @returns Full public URL for the album cover
 */
export function getAlbumCoverUrl(filename: string): string {
  return getStorageUrl('albums', filename);
}

/**
 * Check if a URL is already a full Supabase storage URL
 */
export function isSupabaseStorageUrl(url: string): boolean {
  return url.includes('supabase.co/storage/v1/object/public');
}

/**
 * Convert image path to Supabase storage URL
 * @param path - Can be:
 *   - Full URL (https://...) - returned as is
 *   - Legacy path (/assets/images/albums/filename.jpg)
 *   - Plain filename (filename.jpg)
 * @returns Supabase storage URL or null
 */
export function convertLegacyImagePath(path: string | null | undefined): string | null {
  if (!path) return null;

  // Already a full URL
  if (path.startsWith('http')) {
    return path;
  }

  // Legacy album path: /assets/images/albums/filename.jpg
  const albumMatch = path.match(/\/assets\/images\/albums\/(.+)$/);
  if (albumMatch) {
    return getAlbumCoverUrl(albumMatch[1]);
  }

  // Plain filename (e.g., 'im-not-alone.jpg')
  if (/\.(jpg|jpeg|png|gif|webp)$/i.test(path)) {
    return getAlbumCoverUrl(path);
  }

  // Return original if no match
  return path;
}
