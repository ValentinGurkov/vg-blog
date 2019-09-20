import React from 'react';
import App from 'next/app';
import { register, unregister } from 'next-offline/runtime';
import Layout from '~/containers/Layout/Layout';
import DefaultMeta from '~/components/DefaultMeta/DefaultMeta';
import global from '~/scss/global.scss';

export default class MyApp extends App {
  componentDidMount() {
    register();
  }

  componentWillUnmount() {
    unregister();
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <DefaultMeta />
        <Layout>
          <main>
            <Component {...pageProps} />
          </main>
        </Layout>
        <style jsx global>
          {global}
        </style>
      </>
    );
  }
}
