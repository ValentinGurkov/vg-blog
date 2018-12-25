import React from 'react';
import Router from 'next/router';

import Header from '../../containers/Header/Hader';
import Footer from '../Footer/Footer';

import * as gtag from '../../lib/gtag';

Router.events.on('routeChangeComplete', url => gtag.pageview(url));

const Layout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);
export default Layout;
