import React, { Component } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';

import Header from '../Header/Header';
import Footer from '~/components/Footer/Footer';
import Spinner from '~/components/UI/Spinner/Spinner';
import * as gtag from '~/lib/gtag';

Router.events.on('routeChangeComplete', url => gtag.pageview(url));

export default class Layout extends Component {
  state = {
    loading: false
  };

  componentDidMount() {
    Router.onRouteChangeStart = () => {
      this.setState({ loading: true });
    };
    Router.onRouteChangeComplete = () => {
      this.setState({ loading: false });
    };
    Router.onRouteChangeError = () => {
      this.setState({ loading: false });
    };
  }

  render() {
    return (
      <>
        <Header />
        {this.state.loading ? <Spinner /> : this.props.children}
        <Footer />
      </>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};
