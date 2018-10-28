// @flow
import React from 'react';
import Head from 'next/head';

const isMobile = false;

type Props = {
  title: string,
  description: string,
  currentLocale?: string,
  currentUrl?: string,
  noIndexPage?: boolean,
};

class SEOHead extends React.PureComponent<Props> {
  static defaultProps = {
    currentLocale: '',
    currentUrl: '',
    noIndexPage: false,
  };

  render() {
    const {
      title, description, currentLocale = '', currentUrl = '', noIndexPage,
    } = this.props;

    // Share values
    const name = 'Chronometriq';
    const facebookAppId = '412305015964029';
    const shareImageLink = '/static/images/share/share.png';
    const primaryColor = '#0076DE';
    const baseDesktopUrl = 'https://chronometriq.com';
    const baseMobileUrl = 'https://m.chronometriq.com';
    const baseUrl = isMobile ? baseMobileUrl : baseDesktopUrl;
    // HrefLang
    let englishPageUrl = '';
    let frenchPageUrl = '';
    let cannonicalUrl = '';

    // root path is '/', we want ''
    let currentPath = baseUrl;
    if (currentUrl !== '/') {
      currentPath += currentUrl;
    }

    // determine translation, cannonical and current url
    if (currentLocale === 'fr') {
      // Translation to english page : /fr/search -> /en/search, /fr -> ''
      frenchPageUrl = currentPath;
      if (currentUrl === '/fr') {
        englishPageUrl = baseUrl;
      } else {
        englishPageUrl = currentPath.replace('/fr/', '/en/');
      }
      cannonicalUrl = frenchPageUrl;
    } else {
      // Translation to french page : /en/search -> /fr/search, /en/search -> /fr/search, /fr ->
      if (currentUrl === '/en' || currentUrl === '') {
        frenchPageUrl = `${baseUrl}/fr`;
        cannonicalUrl = baseUrl;
      } else {
        frenchPageUrl = currentPath.replace('/en/', '/fr/');
        cannonicalUrl = currentPath;
      }
      englishPageUrl = currentPath;
    }

    return (
      <div>
        <Head>
          <title>{title}</title>

          <meta name="description" content={description} />
          <meta name="author" content={name} />

          {/* Hreflang */}
          <link rel="alternate" hrefLang="fr" href={frenchPageUrl} />
          <link rel="alternate" hrefLang="fr-ca" href={frenchPageUrl} />
          <link rel="alternate" hrefLang="en" href={englishPageUrl} />
          <link rel="alternate" hrefLang="en-ca" href={englishPageUrl} />
          <link rel="alternate" hrefLang="en-us" href={englishPageUrl} />
          <link rel="alternate" hrefLang="x-default" href={englishPageUrl} />

          {/* Cannonical */}
          {!isMobile && <link rel="canonical" href={cannonicalUrl} />}
          {/* Cannonical for Desktop page */}
          {isMobile && <link rel="canonical" href={baseDesktopUrl + currentUrl} />}

          {/* Alternate meta to redirect to mobile app */}
          {!isMobile && (
            <link
              rel="alternate"
              media="only screen and (max-width: 575px)"
              href={baseMobileUrl + currentUrl}
            />
          )}

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
            content="aNqXZH8q2ule-mPHw8f458bOhBe2rBa5_lxSZUEkqYw"
          />
        </Head>
      </div>
    );
  }
}

export default SEOHead;
