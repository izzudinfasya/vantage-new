import React from "react";
import { Layout } from "antd";
import ProductInterest from "components/productInterest";
import ProductCatalogue from "components/productCatalogue";

const { Content } = Layout;

const HomePage: React.FC = () => {
  return (
    <Content>
      <ProductCatalogue />
      <ProductInterest />
    </Content>
  );
};

export default HomePage;
