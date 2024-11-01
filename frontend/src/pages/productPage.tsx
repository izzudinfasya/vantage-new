import React from "react";
import { Layout, Col, Typography, Row, Button } from "antd";
import ProductsTable from "../components/productsTable";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title } = Typography;

const ProductPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Content>
          <div style={{ background: "#fff", padding: "24px" }}>
            <Row
              justify="space-between"
              align="middle"
              style={{ marginBottom: "28px" }}
            >
              <Col>
                <Title level={3} style={{ marginBottom: "0" }}>
                  Data Product
                </Title>
              </Col>
              <Col>
                <Button
                  type="primary"
                  onClick={() => navigate("/admin/product/settings")}
                  style={{
                    backgroundColor: "black",
                    borderColor: "black",
                    color: "white",
                  }}
                >
                  Add Product
                </Button>
              </Col>
            </Row>
            <ProductsTable />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProductPage;
