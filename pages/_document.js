import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class _Document extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, i18n: ctx.req.i18n };
  }

  render() {
    const {
      i18n: { language },
    } = this.props;

    return (
      <html lang={language}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <link
            href="https://fonts.googleapis.com/css?family=Raleway:300,400,600,700"
            rel="stylesheet"
          />
          <link href="https://fonts.googleapis.com/css?family=Montserrat:600" rel="stylesheet" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/apple-touch-icon.png?v=dLJJ2QRGaG"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon-32x32.png?v=dLJJ2QRGaG"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="194x194"
            href="/static/favicon-194x194.png?v=dLJJ2QRGaG"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/static/android-chrome-192x192.png?v=dLJJ2QRGaG"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon-16x16.png?v=dLJJ2QRGaG"
          />
          <link rel="manifest" href="/static/site.webmanifest?v=dLJJ2QRGaG" />
          <link rel="mask-icon" href="/static/safari-pinned-tab.svg?v=dLJJ2QRGaG" color="#0076de" />
          <link rel="shortcut icon" href="/static/favicon.ico?v=dLJJ2QRGaG" />
          <meta name="apple-mobile-web-app-title" content="Chronometriq" />
          <meta name="application-name" content="Chronometriq" />
          <meta name="msapplication-TileColor" content="#0076de" />
          <meta name="msapplication-TileImage" content="/static/mstile-144x144.png?v=dLJJ2QRGaG" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
