// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { Row, Col } from 'antd';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMap } from '@fortawesome/free-regular-svg-icons';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';

import Container from '../components/Container';
import { Link } from '../../config/routes';
import TopList from './parts/topList';
import Top from './parts/top';
import MapSider from '../shared/menus/MapSider';
import ArticleShareButton from '../shared/articles/ArticleShareButton';
import SimilarArticle from './parts/similarArticle';
import SideArticlePageAd from '../ads/sideArticlePageAd';
import AdsSider from '../ads/AdsSider';

const i18nPrefix = 'articles/common';
const i18nCommonPrefix = 'common';

type Props = {
  t: TFunction,
  currentArticle: any,
  global: any,
};

type State = {
  isMounted: boolean,
};

const mapStateToProps = state => ({
  currentArticle: state.article,
  global: state.global,
});

@withNamespaces([i18nPrefix])
@connect(mapStateToProps)
class Article extends React.Component<Props, State> {
  render() {
    const {
      t,
      currentArticle: {
        data: { article, relatedArticles },
      },
      global: {
        data: { themes, destinations },
      },
    } = this.props;

    let destination = null;
    let destinationTranslation = null;
    for (let i = 0; i < destinations.length; i += 1) {
      if (destinations[i].id === article.destination_id) {
        destination = destinations[i].name;
        destinationTranslation = t(`${i18nCommonPrefix}:destinations.${destination}`);
      }
    }

    let theme = null;
    for (let i = 0; i < themes.length; i += 1) {
      if (themes[i].id === article.theme_id) theme = t(`${i18nCommonPrefix}:themes.${themes[i].name}`);
    }

    return (
      <div className="article">
        <div className="article-brand">
          <h1>{t(`${i18nPrefix}:brand`)}</h1>
        </div>
        <Container>
          <Row>
            <Col span={24} className="ant-position-relative">
              <div className="article-hero" style={{ backgroundImage: `url(${article.image})` }} />
              <div
                className="ant-visible@m ant-position-absolute"
                style={{ bottom: -27, right: 20 }}
              >
                <ArticleShareButton article={article} />
              </div>
            </Col>
          </Row>
          <Row className="ant-margin-large-top ant-margin-large-bottom">
            <Col xs={24} md={16}>
              <h1 className="ant-margin-small-bottom">{article.title}</h1>
              <Row className="ant-margin-bottom article-details-bar">
                <Col span={24}>
                  <FontAwesomeIcon icon={faClock} />
                  <Moment
                    format="MMM D YYYY"
                    date={article.published_at}
                    style={{ marginRight: 10 }}
                  />
                  {' · '}
                  <FontAwesomeIcon icon={faMap} style={{ marginLeft: 10 }} />
                  <Link route="destination-details" params={{ destination }}>
                    <a style={{ marginRight: 10 }}>{destinationTranslation}</a>
                  </Link>
                  {' · '}
                  <FontAwesomeIcon icon={faCameraRetro} style={{ marginLeft: 10 }} />
                  <a>{theme}</a>
                </Col>
              </Row>
              <div
                className="article-content"
                // eslint-disable-next-line
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {article.top_list_images && article.top_list_items && <TopList article={article} />}
              {article.top_images
                && article.top_contents && (
                  <Top article={article} hideBottomBorder={!article.bottom_content} />
              )}

              {article.bottom_content && (
                <div
                  className="article-bottom-content ant-margin-large-top"
                  // eslint-disable-next-line
                  dangerouslySetInnerHTML={{ __html: article.bottom_content }}
                />
              )}
            </Col>
            <Col xs={0} md={8}>
              <MapSider destination={destination} />
              <AdsSider ads={<SideArticlePageAd />} className="ant-margin-top" />
            </Col>
          </Row>
        </Container>

        {/* Similar Articles */}
        {relatedArticles
          && relatedArticles.length > 0 && (
            <div className="related-articles">
              <Container>
                <h2>{t(`${i18nPrefix}:related_articles.title`)}</h2>
              </Container>
              <div>
                <Row type="flex" justify="center" align="top">
                  {relatedArticles.map((relatedArticle, index) => (
                    <Col
                      span={index === 0 ? 24 : 0}
                      sm={index < 2 ? 12 : 0}
                      md={index < 3 ? 8 : 0}
                      lg={6}
                      key={relatedArticle.title}
                    >
                      <SimilarArticle article={relatedArticle} />
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
        )}

        <div className="ant-hidden@m ant-position-fixed" style={{ bottom: 20, right: 20 }}>
          <ArticleShareButton article={article} />
        </div>
      </div>
    );
  }
}

export default Article;
