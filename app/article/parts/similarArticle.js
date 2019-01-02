// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMap } from '@fortawesome/free-regular-svg-icons';
import Moment from 'react-moment';
import Dotdotdot from 'react-dotdotdot';

import { Link } from '../../../config/routes';

const i18nPrefix = 'articles/common';
const i18nCommonPrefix = 'common';

type Props = {
  t: Tfunction,
  article: any,
  global: any,
};

const mapStateToProps = state => ({
  global: state.global,
});

@withNamespaces([i18nPrefix, i18nCommonPrefix])
@connect(mapStateToProps)
class SimilarArticle extends React.Component<Props, State> {
  render() {
    const {
      t,
      article,
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
      <div className="similar-article">
        <Link route="article" params={{ destination, article: article.slug }}>
          <a>
            <div className="similar-article-content">
              <div
                className="similar-article-image"
                style={{ backgroundImage: `url(${article.thumbnail})` }}
              />
              <div className="similar-article-text">
                <div className="similar-article-theme">{theme}</div>
                <div className="similar-article-title">
                  <Dotdotdot clamp={2}>
                    <h2>{article.title}</h2>
                  </Dotdotdot>
                </div>

                <div className="similar-articles-details">
                  <div style={{ display: 'inline-block' }}>
                    <FontAwesomeIcon icon={faClock} />
                    <Moment format="MMM D YYYY" date={article.published_at} />
                  </div>
                  <span style={{ marginRight: 10, marginLeft: 10 }}> · </span>
                  <div style={{ display: 'inline-block' }}>
                    <FontAwesomeIcon icon={faMap} />
                    <span>{destinationTranslation}</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </Link>
      </div>
    );
  }
}

export default SimilarArticle;
