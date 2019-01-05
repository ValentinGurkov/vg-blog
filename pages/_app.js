import React from 'react';
import App, { Container } from 'next/app';
import Layout from '~/containers/Layout/Layout';
import DefaultMeta from '~/components/DefaultMeta/DefaultMeta';

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <DefaultMeta />
        <Layout>
          <main>
            <Component {...pageProps} />
          </main>
        </Layout>
      </Container>
    );
  }
}
