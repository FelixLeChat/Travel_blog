// @flow
import React from 'react';
import { withNamespaces } from 'react-i18next';
import { Col, Row } from 'antd';

const i18nPrefix = 'articles/common';

type Props = {
  article: any,
};

@withNamespaces([i18nPrefix])
class TopList extends React.Component<Props> {
  render() {
    const { article } = this.props;

    return (
      <div className="article-top-list ant-margin-large-top">
        <h2
          // eslint-disable-next-line
          dangerouslySetInnerHTML={{ __html: article.top_list_title }}
        />
        {article.top_list_items
          && article.top_list_items.map((item, index) => (
            <Row key={item} className="ant-margin-large-top" type="flex" align="middle">
              <Col span={24} md={{ span: 6 }} lg={{ span: 4 }}>
                <div
                  className="article-top-image"
                  style={{ backgroundImage: `url(${article.top_list_images[index]})` }}
                >
                  <div className="article-top-image-index">{index + 1}</div>
                </div>
              </Col>
              <Col span={24} md={{ span: 18 }} lg={{ span: 20 }} className="article-top-text">
                <span
                  // eslint-disable-next-line
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              </Col>
            </Row>
          ))}
      </div>
    );
  }
}

export default TopList;
