if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

export const PRISMIC_API_URL = 'https://uniblog.cdn.prismic.io/api/v2';
export const ROOT_URL = process.env.SITE_ROOT || 'https://valentingurkov.com';
export const DEFAULT_SEO = {
  title: "Valentin Gurkov's Blog",
  description: 'Making good health and lifestyle choices has never been easier',
  charset: 'UTF-8',
  keywords:
    'blog, health, lifestyle, bodyweight, diet, recipes, training, body, sport, alternative sport, excercies, excercise at home, articles',
  openGraph: {
    type: 'website',
    locale: 'en_BG',
    url: ROOT_URL,
    title: "Valentin Gurkov's Blog",
    description: 'Making good health and lifestyle choices has never been easier',
    image: `${ROOT_URL}${require('../static/og-image.jpg')}`,
    image_alt: "Valentin Gurko's Blog logo",
    site_name: ROOT_URL,
    imageWidth: 1242,
    imageHeight: 650
  },
  twitter: {
    handle: '@vgblog',
    cardType: 'summary_large_image'
  },
  canonical: ROOT_URL
};

export const GOOGLE_API_KEY = 'AIzaSyB8fvIWLECBvLWsyULSfpdt9oHYU95_vH4';
export const OFFICE_COORDINATES = { lat: -6.1028928, lng: 105.4226227 };
