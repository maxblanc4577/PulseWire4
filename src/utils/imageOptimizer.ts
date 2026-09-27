/**
 * High-Resolution Image Utilities for Pulsewire Global Intelligence
 * Provides crystal-clear image asset resolutions, Retina 2x/3x srcSet generation,
 * and automatic resolution upscaling for Unsplash photography assets.
 */

import { Article, Publication, RegionalDesk } from '../data/pulsewireData';

/**
 * Normalizes and upgrades an image URL (particularly Unsplash) to high-resolution display standards.
 * Ensures minimum crisp widths (e.g. 2000px for full-width editorial photos, 400px for avatars).
 */
export function getHighResImageUrl(
  url: string | undefined | null,
  targetWidth: number = 2000,
  quality: number = 88,
  aspectRatio?: 'square' | 'wide'
): string {
  if (!url) return '';

  // Handle Unsplash images
  if (url.includes('images.unsplash.com')) {
    try {
      const urlObj = new URL(url);
      urlObj.searchParams.set('auto', 'format');
      urlObj.searchParams.set('fit', 'crop');
      urlObj.searchParams.set('w', targetWidth.toString());
      urlObj.searchParams.set('q', quality.toString());

      if (aspectRatio === 'square') {
        urlObj.searchParams.set('h', targetWidth.toString());
        urlObj.searchParams.set('crop', 'faces');
      }

      return urlObj.toString();
    } catch {
      // If URL parsing fails, string replacement fallback
      return url
        .replace(/w=\d+/, `w=${targetWidth}`)
        .replace(/q=\d+/, `q=${quality}`);
    }
  }

  return url;
}

/**
 * Generates responsive srcset string for multi-DPI / Retina screens.
 */
export function getResponsiveSrcSet(
  url: string | undefined | null,
  widths: number[] = [640, 1024, 1600, 2400]
): string {
  if (!url || !url.includes('images.unsplash.com')) return '';

  return widths
    .map((w) => `${getHighResImageUrl(url, w, 88)} ${w}w`)
    .join(', ');
}

/**
 * Generates crisp 1x/2x/3x srcSet for author avatars.
 */
export function getAvatarSrcSet(url: string | undefined | null): string {
  if (!url || !url.includes('images.unsplash.com')) return '';

  return `${getHighResImageUrl(url, 120, 90, 'square')} 1x, ${getHighResImageUrl(url, 240, 90, 'square')} 2x, ${getHighResImageUrl(url, 400, 90, 'square')} 3x`;
}

/**
 * Upgrades an article's image and avatar URLs to pristine high-resolution.
 */
export function upgradeArticleImages(article: Article): Article {
  return {
    ...article,
    imageUrl: getHighResImageUrl(article.imageUrl, 2400, 88),
    author: {
      ...article.author,
      avatar: getHighResImageUrl(article.author.avatar, 400, 90, 'square')
    }
  };
}

/**
 * Upgrades regional desk imagery to high-resolution.
 */
export function upgradeRegionalDeskImages(desk: RegionalDesk): RegionalDesk {
  return {
    ...desk,
    imageUrl: getHighResImageUrl(desk.imageUrl, 2000, 88)
  };
}

/**
 * Upgrades publication cover imagery to high-resolution.
 */
export function upgradePublicationImages(pub: Publication): Publication {
  return {
    ...pub,
    coverImage: getHighResImageUrl(pub.coverImage, 1600, 90)
  };
}
