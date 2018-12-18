// @flow
import React from 'react';
import { withNamespaces } from 'react-i18next';
import { Col, Row, Divider } from 'antd';

const i18nPrefix = 'articles/common';

type Props = {
  article: any,
};

@withNamespaces([i18nPrefix])
class Top extends React.Component<Props> {
  render() {
    const { article } = this.props;

    return (
      <div className="article-top">
        {article.top_titles.map((item, index) => (
          <Row key={item} className="ant-margin-medium-top">
            <Col span={24}>
              <h2>
                <span className="emphasis">{`${index + 1}.`}</span>
                {item}
              </h2>
            </Col>
            <Col span={24}>
              <div
                className="img"
                style={{ backgroundImage: `url('${article.top_images[index]}')` }}
              />
            </Col>
            <Col
              span={24}
              dangerouslySetInnerHTML={{ __html: article.top_contents[index] }}
              className="ant-margin-top ant-margin-medium-bottom"
            />
            <Divider style={{ marginBottom: 0 }} />
          </Row>
        ))}
      </div>
    );
  }
}

export default Top;