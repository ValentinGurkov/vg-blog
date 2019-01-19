import React from 'react';
import App, { Container } from 'next/app';
import Layout from '~/containers/Layout/Layout';
import DefaultMeta from '~/components/DefaultMeta/DefaultMeta';
import global from '~/scss/global.scss';
import { register, unregister } from 'next-offline/runtime';

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    register();
  }

  componentWillUnmount() {
    unregister();
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
        <style jsx global>
          {global}
        </style>
      </Container>
    );
  }
}
