// @flow
import React from 'react';
import { withNamespaces } from 'react-i18next';
import { Carousel } from 'antd';

type Props = {};

@withNamespaces(['home'])
class Home extends React.Component<Props> {
  render() {
    return (
      <div className="home">
        <div className="home-hero">
          <Carousel autoplay dots={false} effect="fade" className="home-hero-carousel">
            <div className="hero-carousel-item" />
            <div className="hero-carousel-item" />
          </Carousel>

          <div className="dark-overlay" />
          <div className="hero-menu" />
        </div>
      </div>
    );
  }
}

export default Home;
