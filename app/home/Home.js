// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import Dotdotdot from 'react-dotdotdot';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMap } from '@fortawesome/free-regular-svg-icons';

import { Row, Col, Button } from 'antd';
import Container from '../components/Container';
import DestinationSider from '../shared/menus/DestinationSider';
import { Link } from '../../config/routes';
import { compareValues } from '../utils/utils';
import ArticleCard from '../shared/articles/ArticleCard';
import InstagramSider from '../shared/menus/InstagramSider';

const i18nPrefix = 'pages/home';
const i18nCommonPrefix = 'common';

type Props = {
  t: TFunction,
  home: any,
  global: any,
};

const mapStateToProps = state => ({
  home: state.home,
  global: state.global,
});

@withNamespaces([i18nPrefix, i18nCommonPrefix])
@connect(mapStateToProps)
class Home extends React.Component<Props> {
  state = {
    isMounted: false,
  };

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  render() {
    const {
      t,
      home: {
        data: { articles },
      },
      global: {
        data: { destinations, themes },
      },
    } = this.props;
    const { isMounted } = this.state;

    // Set destinations for all articles
    for (let articleId = 0; articleId < articles.length; articleId += 1) {
      for (let i = 0; i < destinations.length; i += 1) {
        if (destinations[i].id === articles[articleId].destination_id) {
          articles[articleId].destination = destinations[i].name;
        }
      }
    }

    // Get Hero article
    let heroArticle = null;
    if (articles && articles.length > 0) {
      [heroArticle] = articles
        .filter(article => article.hero_article)
        .sort(compareValues('published_at', 'desc'));
    }

    return (
      <div className="home">
        <div className="home-brand">
          <h1>{t(`${i18nPrefix}:brand`)}</h1>
        </div>
        {heroArticle && (
          <div className="home-hero">
            <Row>
              <Col xs={24} style={{ position: 'relative' }}>
                <div
                  className="home-hero-image"
                  style={{ backgroundImage: `url(${heroArticle.image})` }}
                />
                <Row>
                  <Col xs={24} md={12} lg={8} className="home-hero-text-container">
                    <div className="home-hero-text ext-box">
                      <div className="int-box">
                        <h2>{heroArticle.title}</h2>
                        <div className="subtitle">
                          <Row>
                            <Col span={12}>
                              {isMounted && (
                                <FontAwesomeIcon icon={faClock} style={{ marginRight: 10 }} />
                              )}
                              {isMounted && (
                                <Moment format="MMM D YYYY" date={heroArticle.published_at} />
                              )}
                            </Col>
                            <Col span={12}>
                              {isMounted && (
                                <FontAwesomeIcon icon={faMap} style={{ marginRight: 10 }} />
                              )}
                              {isMounted && (
                                <Link
                                  route="destination-details"
                                  params={{ destination: heroArticle.destination }}
                                >
                                  <a>
                                    {t(
                                      `${i18nCommonPrefix}:destinations.${heroArticle.destination}`,
                                    )}
                                  </a>
                                </Link>
                              )}
                            </Col>
                          </Row>
                        </div>
                        <div className="content ant-visible@s" style={{ height: 110 }}>
                          {isMounted && (
                            <Dotdotdot clamp={4}>
                              <p
                                style={{ marginBottom: 0 }}
                                // eslint-disable-next-line
                                dangerouslySetInnerHTML={{ __html: heroArticle.content }}
                              />
                            </Dotdotdot>
                          )}
                        </div>
                        <div>
                          <Link
                            route="article"
                            params={{
                              article: heroArticle.slug,
                              destination: heroArticle.destination,
                            }}
                          >
                            <a>
                              <Button type="secondary">{t(`${i18nPrefix}:read_article`)}</Button>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        )}
        <Container className="ant-margin-large-top ant-margin-medium-bottom">
          <Row>
            <Col span={24} lg={16}>
              <Row className="home-themes">
                {themes
                  && themes.map(theme => (
                    <Col span={24} key={theme.name} className="ant-margin-large-bottom">
                      <Row>
                        <Col span={24}>
                          <div className="theme-title">
                            {t(`${i18nCommonPrefix}:themes_plural.${theme.name}`)}
                          </div>
                        </Col>
                        <Col span={24}>
                          <Row>
                            {articles
                              .filter(article => article.theme_id === theme.id)
                              .sort(compareValues('published_at', 'desc'))
                              .map(article => (
                                <Col span={24} key={article.title} className="ant-margin-bottom">
                                  <ArticleCard article={article} />
                                </Col>
                              ))}
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  ))}
              </Row>
            </Col>
            <Col span={0} lg={8}>
              <div style={{ marginTop: -10 }}>
                <DestinationSider />
                <InstagramSider className="ant-margin-large-top" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
