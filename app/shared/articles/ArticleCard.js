// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import Dotdotdot from 'react-dotdotdot';
import { Col, Row, Skeleton } from 'antd';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMap } from '@fortawesome/free-regular-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { Link, Router } from '../../../config/routes';

const i18nPrefix = 'articles/common';
const i18nCommonPrefix = 'common';

type Props = {
  t: TFunction,
  article: any,
  global: any,
  className: string,
};

type State = {
  isMounted: boolean,
};

const mapStateToProps = state => ({
  global: state.global,
});

@withNamespaces([i18nCommonPrefix, i18nPrefix])
@connect(mapStateToProps)
class ArticleCard extends React.Component<Props, State> {
  state = {
    isMounted: false,
  };

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  handleArticleCardClick = () => {
    const {
      article,
      global: {
        data: { destinations },
      },
    } = this.props;

    let destinationSlug = null;
    for (let i = 0; i < destinations.length; i += 1) {
      if (destinations[i].id === article.destination_id) {
        destinationSlug = destinations[i].name;
      }
    }

    Router.pushRoute('article', { destination: destinationSlug, article: article.slug });
  };

  render() {
    const {
      t,
      article,
      className,
      global: {
        data: { themes, destinations },
      },
    } = this.props;
    const { isMounted } = this.state;

    let theme = null;
    for (let i = 0; i < themes.length; i += 1) {
      if (themes[i].id === article.theme_id) theme = t(`${i18nCommonPrefix}:themes.${themes[i].name}`);
    }

    let destination = null;
    let destinationSlug = null;
    for (let i = 0; i < destinations.length; i += 1) {
      if (destinations[i].id === article.destination_id) {
        destinationSlug = destinations[i].name;
        destination = t(`${i18nCommonPrefix}:destinations.${destinationSlug}`);
      }
    }

    return (
      <div
        className="article-card"
        onClick={this.handleArticleCardClick}
        onKeyPress={() => {}}
        style={{ cursor: 'pointer' }}
      >
        <div className="article-card-image ant-visible@m">
          <div
            className="article-card-image-background"
            style={{ backgroundImage: `url(${article.thumbnail})` }}
          />
          {theme && <div className="article-card-theme">{theme}</div>}
        </div>
        <div className="article-card-content">
          {isMounted && (
            <Dotdotdot clamp={2}>
              <h2>{article.title}</h2>
            </Dotdotdot>
          )}
          {!isMounted && (
            <div style={{ marginBottom: 20 }}>
              <Skeleton paragraph={false} active title={{ width: '50%' }} />
            </div>
          )}

          {isMounted && (
            <Dotdotdot clamp={3}>
              <p
                style={{ marginBottom: 0 }}
                // eslint-disable-next-line
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </Dotdotdot>
          )}
          {!isMounted && <Skeleton title={false} active paragraph={{ rows: 3, width: '100%' }} />}
          <div className="info-block">
            <Row style={{ height: 22, overflow: 'hidden' }}>
              {!isMounted && (
                <Skeleton title={false} active paragraph={{ rows: 1, width: '100%' }} />
              )}

              {isMounted && (
                <Col span={0} md={8}>
                  <Link
                    route="article"
                    params={{ destination: destinationSlug, article: article.slug }}
                  >
                    <a className={className || ''} style={{ display: 'block' }}>
                      <span style={{ marginRight: 10 }} className="ant-text-bold">
                        {t(`${i18nPrefix}:read_more`)}
                      </span>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </a>
                  </Link>
                </Col>
              )}
              {isMounted && (
                <Col span={24} md={16} className="ant-text-right@m ant-text-center">
                  <FontAwesomeIcon icon={faClock} />
                  <Moment
                    format="MMM D YYYY"
                    date={article.published_at}
                    style={{ marginRight: 10 }}
                  />
                  {' · '}
                  <FontAwesomeIcon icon={faMap} style={{ marginLeft: 10 }} />
                  {destination}
                </Col>
              )}
            </Row>
          </div>
        </div>
        <div className="article-card-image-mobile ant-hidden@m">
          <div
            className="article-card-image-background"
            style={{ backgroundImage: `url(${article.image})` }}
          />
          {theme && <div className="article-card-theme">{theme}</div>}
        </div>
      </div>
    );
  }
}

export default ArticleCard;
