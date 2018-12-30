// @flow
import React from 'react';
import Head from 'next/head';

type Props = {
  title: string,
  description: string,
  currentLocale?: string,
  currentUrl?: string,
  noIndexPage?: boolean,
  shareImageLink?: string,
};

class SEOHead extends React.PureComponent<Props> {
  static defaultProps = {
    currentLocale: '',
    currentUrl: '',
    noIndexPage: false,
    shareImageLink:
      'https://res.cloudinary.com/heyjltyh0/image/upload/v1543774392/facebook_share.png',
  };

  render() {
    const {
      title,
      description,
      currentLocale = '',
      currentUrl = '',
      noIndexPage,
      shareImageLink,
    } = this.props;

    // Share values
    const name = 'Traveling Maude';
    const facebookAppId = '1843938182390871';
    const primaryColor = '#0C0C0E';
    const baseDesktopUrl = 'https://travelingmaude.com';
    const baseUrl = baseDesktopUrl;

    // root path is '/', we want ''
    let currentPath = baseUrl;
    if (currentUrl !== '/') {
      currentPath += currentUrl;
    }

    // HrefLang
    const englishPageUrl = currentPath;
    const cannonicalUrl = currentPath;

    return (
      <div>
        <Head>
          <title>{title}</title>

          <meta name="description" content={description} />
          <meta name="author" content={name} />

          {/* Hreflang */}
          <link rel="alternate" hrefLang="en" href={englishPageUrl} />
          <link rel="alternate" hrefLang="en-ca" href={englishPageUrl} />
          <link rel="alternate" hrefLang="en-us" href={englishPageUrl} />
          <link rel="alternate" hrefLang="x-default" href={englishPageUrl} />

          {/* Cannonical */}
          <link rel="canonical" href={cannonicalUrl} />

          {/* Twitter meta tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content={currentPath} />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={shareImageLink} />

          {/* Facebook meta tags */}
          <meta property="fb:app_id" content={facebookAppId} />

          {/* OpenGraph */}
          <meta property="og:url" content={currentPath} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:locale" content={`${currentLocale}_CA`} />
          <meta property="og:locale:alternate" content={`${currentLocale}_CA`} />
          <meta property="og:image" content={shareImageLink} />
          <meta property="og:image:alt" content={title} />
          <meta property="og:site_name" content={name} />

          {/* Schema */}
          <meta itemProp="name" content={title} />
          <meta itemProp="description" content={description} />
          <meta itemProp="image" content={shareImageLink} />
          <meta itemProp="sourceOrganization" content={name} />
          <meta itemProp="inLanguage" content={`${currentLocale}_CA`} />

          {/* Apple */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="apple-mobile-web-app-title" content={name} />

          {/* Microsoft */}
          <meta name="application-name" content={name} />
          <meta name="msapplication-tooltip" content={name} />
          <meta name="msapplication-window" content="width=1024;height=768" />
          <meta name="msapplication-navbutton-color" content={primaryColor} />
          <meta name="msapplication-starturl" content={`${baseDesktopUrl}/${currentLocale}`} />
          <meta name="msapplication-TileColor" content="#FFFFFF" />
          <meta name="msapplication-TileImage" content="/static/mstile-150x150.png" />

          {/* No Index */}
          {noIndexPage && <meta name="robots" content="noindex, follow" />}

          {/* Google Search Console validation */}
          <meta
            name="google-site-verification"
            content="tKzDoJ7uXE7z56qrBMQU1Y0rbAnsaRKXhbpX5sqs7Xk"
          />
        </Head>
      </div>
    );
  }
}

export default SEOHead;
