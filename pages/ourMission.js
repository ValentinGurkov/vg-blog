import React from 'react';
import Breadcrumbs from '~/components/Breadcrumbs/Breadcrumbs';
import { ROOT_URL } from '../lib/config';

const breadcrumbs = [
  {
    url: '/',
    page: 'Home'
  },
  {
    url: '/our-mission',
    page: 'Our Mission'
  }
];

const addBreadcrumbsLD = () => ({
  __html: `{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "${ROOT_URL}/"
    },{
      "@type": "ListItem",
      "position": 2,
      "name": "Our Mission",
      "item":"${ROOT_URL}/our-mission"
    }]
  }`
});

const ourMission = () => (
  <>
    <Breadcrumbs breadcrumbs={breadcrumbs} />
    <div>This page is under construction. Check back soon!</div>
    <script type="application/ld+json" dangerouslySetInnerHTML={addBreadcrumbsLD()} />
  </>
);

export default ourMission;
