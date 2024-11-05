import React from "react";
import { Layout, Col, Typography, Row } from "antd";
import WaitingListTable from "../components/waitinglistTable";

const { Content } = Layout;
const { Title } = Typography;

const WaitingListPage: React.FC = () => {
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
                  Data Waiting List
                </Title>
              </Col>
            </Row>
            <WaitingListTable />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default WaitingListPage;
