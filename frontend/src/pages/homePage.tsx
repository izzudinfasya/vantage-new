import React from "react";
import { Layout } from "antd";
import ProductInterest from "components/productInterest";
import ProductCatalogue from "components/productCatalogue";
import Marquee from "components/marquee";

const { Content } = Layout;

const HomePage: React.FC = () => {
  return (
    <Content>
      <ProductCatalogue />
      <Marquee />
      <ProductInterest />
    </Content>
  );
};

export default HomePage;
