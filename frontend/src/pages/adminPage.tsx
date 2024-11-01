import React from "react";
import { Layout, Col, Typography, Row, Button, Card } from "antd";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title } = Typography;

const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Content>
          <div style={{ background: "#fff", padding: "24px" }}>
            <Title level={3}>Dashboard</Title>
            <Row gutter={16}>
              <Col span={6}>
                <Card title="Container 1" bordered>
                  <p>Some static data for Container 1</p>
                  <Button onClick={() => navigate("/some-path")}>
                    Action 1
                  </Button>
                </Card>
              </Col>
              <Col span={6}>
                <Card title="Container 2" bordered>
                  <p>Some static data for Container 2</p>
                  <Button onClick={() => navigate("/some-path")}>
                    Action 2
                  </Button>
                </Card>
              </Col>
              <Col span={6}>
                <Card title="Container 3" bordered>
                  <p>Some static data for Container 3</p>
                  <Button onClick={() => navigate("/some-path")}>
                    Action 3
                  </Button>
                </Card>
              </Col>
              <Col span={6}>
                <Card title="Container 4" bordered>
                  <p>Some static data for Container 4</p>
                  <Button onClick={() => navigate("/some-path")}>
                    Action 4
                  </Button>
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPage;
