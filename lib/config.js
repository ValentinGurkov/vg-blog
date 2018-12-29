if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

export const PRISMIC_API_URL = 'https://uniblog.cdn.prismic.io/api/v2';
export const ROOT_URL = process.env.SITE_ROOT || 'https://valentingurkov.herokuapp.com';
export const DEFAULT_SEO = {
  title: 'VG BLOG',
  description: 'Making good health and lifestyle choices has never been easier',
  charset: 'UTF-8',
  keywords:
    'blog, health, lifestyle, bodyweight, diet, recipes, training, body, sport, alternative sport, excercies, excercise at home',
  openGraph: {
    type: 'website',
    locale: 'en_BG',
    url: 'https://vgblog.com',
    title: 'VG BLOG',
    description: 'Making good health and lifestyle choices has never been easier',
    image: `${ROOT_URL}/static/icons/og-image.jpg`,
    site_name: 'vgblog.com',
    imageWidth: 279,
    imageHeight: 279
  },
  twitter: {
    handle: '@vgblog',
    cardType: 'summary_large_image'
  }
};

export const GOOGLE_API_KEY = 'AIzaSyB8fvIWLECBvLWsyULSfpdt9oHYU95_vH4';
export const OFFICE_COORDINATES = { lat: -6.1028928, lng: 105.4226227 };
