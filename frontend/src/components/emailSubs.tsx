import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";

interface EmailSubscriptionModalProps {
  onClose: () => void;
}

const EmailSubscriptionModal: React.FC<EmailSubscriptionModalProps> = ({
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [form] = Form.useForm(); // Create a form instance

  const handleOk = async () => {
    try {
      // Validate fields
      const values = await form.validateFields();
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        console.log("Form submitted with values:", values); // You can handle the form submission here
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Validation Failed:", error);
      // Handle the validation error if needed
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
      </Form>
    </Modal>
  );
};

export default EmailSubscriptionModal;
