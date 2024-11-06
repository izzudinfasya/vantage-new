import React, { useState } from "react";
import {
  Layout,
  Col,
  Typography,
  Row,
  Button,
  DatePicker,
  message,
  Card,
  Statistic,
} from "antd";
import moment from "moment";

const { Content } = Layout;
const { Title } = Typography;

const AdminPage: React.FC = () => {
  const [targetDate, setTargetDate] = useState<Date | null>(null);

  const handleDateChange = (date: moment.Moment | null) => {
    setTargetDate(date ? date.toDate() : null);
  };

  const handleSaveDate = () => {
    if (targetDate) {
      localStorage.setItem("countdownTargetDate", targetDate.toISOString());
      message.success("Release date has been updated!");
    } else {
      message.error("Please select a target date!");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content>
        {/* Page Title Section */}
        <div
          style={{
            background: "#fff",
            padding: "24px",
            marginBottom: "24px",
          }}
        >
          <Title level={3} style={{ margin: "0 !important" }}>
            Admin Dashboard
          </Title>
        </div>

        {/* Overview Sections */}
        <div style={{ background: "#fff", padding: "24px" }}>
          {/* Sales Overview Section */}
          <Row gutter={[16, 24]}>
            <Col xs={24} sm={12} md={8}>
              <Card>
                <Title level={4}>Sales Overview</Title>
                <Statistic title="Total Sales" value={0} prefix="IDR" />
                <Statistic title="Orders" value={0} />
              </Card>
            </Col>

            {/* Customer Management Section */}
            <Col xs={24} sm={12} md={8}>
              <Card>
                <Title level={4}>Customer</Title>
                <Statistic title="Total Customers" value={0} />
                <Statistic title="New Customers" value={0} />
              </Card>
            </Col>

            {/* Inventory Status Section */}
            <Col xs={24} sm={12} md={8}>
              <Card>
                <Title level={4}>Inventory Status</Title>
                <Statistic title="Products In Stock" value={24} />
                <Statistic title="Low Stock Alerts" value={0} />
              </Card>
            </Col>
          </Row>
        </div>

        {/* Separate Countdown Target Date Section */}
        <div
          style={{
            background: "#fff",
            padding: "24px",
            marginTop: "24px",
          }}
        >
          <Row gutter={[16, 24]}>
            <Col xs={24}>
              <Title level={4}>Set Release Date</Title>
              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <DatePicker
                  onChange={handleDateChange}
                  showTime
                  style={{
                    flex: 1,
                    marginRight: "16px",
                    padding: "12px",
                    fontSize: "16px",
                  }}
                  placeholder="Select Release Date"
                />
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "black",
                    borderColor: "black",
                    color: "white",
                    borderRadius: "4px",
                    padding: "22px 20px",
                    fontWeight: "500",
                    transition: "background-color 0.3s",
                  }}
                  onClick={handleSaveDate}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#333")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "black")
                  }
                >
                  Set Date
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default AdminPage;
