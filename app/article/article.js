// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { Row, Col } from 'antd';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMap } from '@fortawesome/free-regular-svg-icons';

import Container from '../components/Container';
import { Link } from '../../config/routes';
import TopList from './parts/topList';
import Top from './parts/top';

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
  state = {
    isMounted: false,
  };

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  render() {
    const {
      t,
      currentArticle: {
        data: { article },
      },
      global: {
        data: { themes, destinations },
      },
    } = this.props;
    const { isMounted } = this.state;

    let destination = null;
    let destinationSlug = null;
    for (let i = 0; i < destinations.length; i += 1) {
      if (destinations[i].id === article.destination_id) {
        destination = t(`${i18nCommonPrefix}:destinations.${destinations[i].name}`);
        destinationSlug = destinations[i].name;
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
            <Col span={24}>
              <div className="article-hero" style={{ backgroundImage: `url(${article.image})` }} />
            </Col>
            <Col xs={24} md={16}>
              <h1 className="ant-margin-top ant-margin-small-bottom">{article.title}</h1>
              <Row className="ant-margin-bottom article-details-bar">
                <Col span={24}>
                  {isMounted && <FontAwesomeIcon icon={faClock} />}
                  {isMounted && (
                    <Moment
                      format="MMM D YYYY"
                      date={article.published_at}
                      style={{ marginRight: 10 }}
                    />
                  )}
                  {' · '}
                  {isMounted && <FontAwesomeIcon icon={faMap} style={{ marginLeft: 10 }} />}
                  {isMounted && (
                    <Link route="destination-details" params={{ destination: destinationSlug }}>
                      <a>{destination}</a>
                    </Link>
                  )}
                </Col>
              </Row>
              <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {article.top_list_images && article.top_list_items && <TopList article={article} />}
              {article.top_images && article.top_contents && <Top article={article} />}

              {article.bottom_content && (
                <div
                  className="article-bottom-content ant-margin-medium-top"
                  dangerouslySetInnerHTML={{ __html: article.bottom_content }}
                />
              )}
            </Col>
            <Col xs={24} md={8} />
          </Row>
        </Container>
      </div>
    );
  }
}

export default Article;
