// @flow
import React from 'react';
import { withNamespaces } from 'react-i18next';
import { Col, Row } from 'antd';

const i18nPrefix = 'articles/common';

type Props = {
  t: TFunction,
  article: any,
};

type State = {
  isMounted: boolean,
};

@withNamespaces([i18nPrefix])
class Article extends React.Component<Props, State> {
  state = {
    isMounted: false,
  };

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  render() {
    const { t, article } = this.props;
    const { isMounted } = this.state;

    return (
      <div className="article-top ant-margin-large-top">
        <h2>{article.top_title}</h2>
        {article.top_items
          && article.top_items.map((item, index) => (
            <Row className="ant-margin-medium-top" type="flex" align="middle">
              <Col span={4}>
                <div
                  className="article-top-image"
                  style={{ backgroundImage: `url(${article.top_images[index]})` }}
                >
                  <div className="article-top-image-index">{index + 1}</div>
                </div>
              </Col>
              <Col span={20}>{item}</Col>
            </Row>
          ))}
      </div>
    );
  }
}

export default Article;
