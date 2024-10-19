import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";

interface ModalPromoProps {
  onClose: () => void;
}

const ModalPromo: React.FC<ModalPromoProps> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);

      setLoading(true);

      // Send data to the backend
      const response = await fetch(
        "http://localhost:5000/api/vouchers/get-voucher",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: values.email, name: values.name }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`${errorText}`);
      }

      const data = await response.json();

      message.success(data.message);
      onClose();
      form.resetFields();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error during submission:", error);
        message.error(error.message || "An error occurred. Please try again.");
      } else {
        console.error("Unexpected error:", error);
        message.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <div style={{ textAlign: "center", fontSize: "24px" }}>
          Get 10% Off on Your First Purchase
        </div>
      }
      visible={true}
      width={600}
      closable={false} // Disable the close (X) button
      footer={[
        <Button
          key="back"
          onClick={onClose}
          style={{
            backgroundColor: "transparent",
            color: "#444",
            borderColor: "#444",
          }}
        >
          Close
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleOk}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            backgroundColor: isHovered ? "#444" : "#000000",
            color: "#fff",
            border: "none",
          }}
        >
          Subscribe
        </Button>,
      ]}
      onCancel={onClose}
      className="modal-container"
      style={{ backgroundColor: "transparent" }}
    >
      <p
        style={{ textAlign: "center", fontSize: "14px", marginBottom: "20px" }}
      >
        Sign up to get a 10% discount on your first purchase!
      </p>
      <Form
        form={form}
        layout="vertical"
        style={{ color: "#444", fontSize: "16px", padding: "10px 0" }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            type="email"
            placeholder="Enter your email"
            style={{
              borderColor: "#aaa",
              borderRadius: 8,
              padding: "12px 16px",
              fontSize: "16px",
            }}
          />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input
            type="text"
            placeholder="Enter your name"
            style={{
              borderColor: "#aaa",
              borderRadius: 8,
              padding: "12px 16px",
              fontSize: "16px",
            }}
          />
        </Form.Item>
      </Form>

      <style>{`
        .ant-modal .ant-modal-footer {
            margin-top: 5px;
        }

        @media (max-width: 768px) {
          .ant-modal .ant-modal-content {
            width: 80% !important;
            max-width: 500px;
            padding: 24px;
            margin: 0 auto;
          }
        }
      `}</style>
    </Modal>
  );
};

export default ModalPromo;
