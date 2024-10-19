import React, { useState } from "react";
import { Modal, Form, Input, Button, Checkbox, message } from "antd"; // Import message here

interface EmailSubscriptionModalProps {
  onClose: () => void;
}

const EmailSubscriptionModal: React.FC<EmailSubscriptionModalProps> = ({
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const response = await fetch(
        "https://vantageofficial.vercel.app/api/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`${errorText}`);
      }

      const data = await response.json();

      message.success(data.message); // Use message here for success
      onClose();
      form.resetFields();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error during submission:", error);
        message.error(error.message || "An error occurred. Please try again."); // Use message for errors
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
      title="EMAIL SUBSCRIPTION"
      visible={true}
      width={600}
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
          Back
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
      <Form
        form={form} // Link the form instance to the Form component
        layout="vertical"
        style={{ color: "#444", fontSize: "16px", padding: "10px 0" }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
          style={{
            fontSize: "14px !important",
            marginBottom: "16px !important",
          }}
        >
          <Input
            type="email"
            placeholder="Enter your email"
            style={{
              borderColor: "#aaa",
              borderRadius: 8,
              padding: "12px 16px",
              fontSize: "16px",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#666")}
            onBlur={(e) => (e.target.style.borderColor = "#aaa")}
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
        <Form.Item name="consent" valuePropName="checked" noStyle>
          <Checkbox>Saya setuju untuk menerima email dari VANTAGE.</Checkbox>
        </Form.Item>
      </Form>

      <style>
        {`
        .ant-checkbox-checked .ant-checkbox-inner {
            background-color: black !important;;
            border-color: transparent !important;;
        }

        .ant-checkbox-checked:hover .ant-checkbox-inner {
            background-color: rgba(0, 0, 0, 0.7) !important;;
            border-color: rgba(0, 0, 0, 0.5) !important;;
        }

        .ant-checkbox:hover .ant-checkbox-inner {
            border-color: rgba(0, 0, 0, 0.5) !important; /* Add a hover border color */
        }

        @media (max-width: 768px) {
          .ant-modal .ant-modal-content {
            width: 80% !important;
            max-width: 500px;
            padding: 24px;
            margin: 0 auto;
          }
        }
        `}
      </style>
    </Modal>
  );
};

export default EmailSubscriptionModal;
