// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import Dotdotdot from 'react-dotdotdot';
import { Col, Row } from 'antd';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMap } from '@fortawesome/free-regular-svg-icons';

import { Link } from '../../../config/routes';

const i18nPrefix = 'articles/common';
const i18nCommonPrefix = 'common';

type Props = {
  t: TFunction,
  i18n: I18nProps,
  article: any,
  global: any,
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

  render() {
    const {
      t,
      i18n,
      article,
      global: {
        data: { themes, destinations },
      },
    } = this.props;
    const { isMounted } = this.state;
    const locale = i18n.language;

    let theme = null;
    for (let i = 0; i < themes.length; i += 1) {
      if (themes[i].id === article.theme_id) theme = t(`${i18nCommonPrefix}:themes.${themes[i].name}`);
    }

    let destination = null;
    for (let i = 0; i < destinations.length; i += 1) {
      if (destinations[i].id === article.destination_id) destination = t(`${i18nCommonPrefix}:destinations.${destinations[i].name}`);
    }

    const dateFormat = locale === 'en' ? 'MMM D YYYY' : 'D MMM YYYY';

    return (
      <Link params={{ locale, article: article.slug }}>
        <a>
          <div className="article-card">
            <div className="article-card-image ant-visible@m">
              <div
                className="article-card-image-background"
                style={{ backgroundImage: `url(${article.image})` }}
              />
              {theme && <div className="article-card-theme">{theme}</div>}
            </div>
            <div className="article-card-content">
              <Dotdotdot clamp={2}>
                <h2>{article.title}</h2>
              </Dotdotdot>
              {isMounted && (
                <Dotdotdot clamp={3}>
                  <p
                    style={{ marginBottom: 0 }}
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                </Dotdotdot>
              )}
              <div className="info-block">
                <Row>
                  <Col span={12}>
                    {isMounted && <FontAwesomeIcon icon={faClock} />}
                    {isMounted && <Moment format={dateFormat} date={article.published_at} />}
                  </Col>
                  <Col span={12}>
                    {isMounted && <FontAwesomeIcon icon={faMap} />}
                    {isMounted && destination}
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          <div className="article-card-image-mobile ant-hidden@m">
            <div
              className="article-card-image-background"
              style={{ backgroundImage: `url(${article.image})` }}
            />
            {theme && <div className="article-card-theme">{theme}</div>}
          </div>
        </a>
      </Link>
    );
  }
}

export default ArticleCard;
