import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gifAvatar from "../assets/v-white.gif"; // Path ke GIF logo
import "./passwordPage.css"; // Import CSS file
import { Modal, Button, Input, message, Form } from "antd";

const PasswordPage: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputPassword, setInputPassword] = useState(""); // Renamed to inputPassword for clarity
  const [, setIsPasswordCorrect] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Timer states
  const [timer, setTimer] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isTimeUp, setIsTimeUp] = useState(false);
  const targetDate = new Date("2024-10-25T20:40:00+07:00").getTime();

  useEffect(() => {
    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsTimeUp(true);
        clearInterval(countdown);
      } else {
        setTimer({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [targetDate]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPassword(e.target.value); // Use setInputPassword
  };

  const handleEnter = async () => {
    try {
      console.log("Password entered:", inputPassword);

      const response = await fetch(
        "http://localhost:5000/api/password/validate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: inputPassword }), // Correctly reference inputPassword
        }
      );

      if (response.ok) {
        setIsPasswordCorrect(true);
        navigate("/home"); // Redirect to another page if password is correct
      } else {
        message.error("Incorrect password");
      }
    } catch (error) {
      message.error("An error occurred. Please try again.");
    }
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();

    // Format phone number
    let formattedPhoneNumber = values.phoneNumber;

    if (formattedPhoneNumber.startsWith("0")) {
      formattedPhoneNumber = formattedPhoneNumber.substring(1);
    }
    formattedPhoneNumber = "62" + formattedPhoneNumber;

    // Validate phone number
    if (!/^\d+$/.test(formattedPhoneNumber)) {
      message.error("Phone number must be numeric.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/password/get-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            phoneNumber: formattedPhoneNumber,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`${errorText}`);
      }

      const data = await response.json();
      message.success(data.message);
      handleCancel();
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
    <div className="password-page">
      <div className="avatar-container">
        <img src={gifAvatar} alt="Avatar" className="avatar-gif" />
      </div>

      {!isTimeUp && (
        <>
          <div className="timer">
            <div className="time-pair">
              <span className="time-number">{timer.days}</span>
              <span className="time-label">DAYS</span>
            </div>
            <div className="time-pair">
              <span className="time-number">{timer.hours}</span>
              <span className="time-label">HOURS</span>
            </div>
            <div className="time-pair">
              <span className="time-number">{timer.minutes}</span>
              <span className="time-label">MINUTES</span>
            </div>
            <div className="time-pair">
              <span className="time-number">{timer.seconds}</span>
              <span className="time-label">SECONDS</span>
            </div>
          </div>

          <div className="next-drop">
            <h1>COMING SOON</h1>
          </div>

          <button className="signup-countdown" onClick={showModal}>
            SIGN UP FOR PASSWORD
          </button>
        </>
      )}

      {isTimeUp && (
        <div className="password-input-wrapper">
          <div className="password-input-container">
            <input
              type="password"
              placeholder="Password"
              className="password-input"
              value={inputPassword}
              onChange={handlePasswordChange} // Use the handlePasswordChange function
            />
            <button className="enter-button" onClick={handleEnter}>
              Enter
            </button>
          </div>
          <button className="signup-button" onClick={showModal}>
            <p className="underline-text">SIGN UP FOR PASSWORD</p>
          </button>
          <div className="signup-desc">
            <p>**DROPS ARE ONLY ACCESSIBLE WITH PASSWORD**</p>
          </div>
        </div>
      )}

      <Modal
        title={
          <div
            style={{
              textAlign: "center",
              fontSize: "24px",
              lineHeight: 1.5,
              marginBottom: "30px",
            }}
          >
            <span
              style={{
                display: "block",
                fontWeight: "400",
                fontSize: "28px",
                color: "#000",
              }}
            >
              SIGN UP FOR
            </span>
            <span
              style={{
                display: "block",
                fontWeight: "bold",
                fontSize: "28px",
                color: "#000",
              }}
            >
              EARLY ACCESS PASSWORD
            </span>
          </div>
        }
        closable={false}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button
            key="cancel"
            onClick={handleCancel}
            style={{ backgroundColor: "transparent", color: "#000" }}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            style={{ backgroundColor: "#000", color: "#fff" }}
            onClick={handleSubmit}
            loading={loading}
          >
            Submit
          </Button>,
        ]}
        centered
        style={{ maxWidth: "85%", top: 20 }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
            style={{ marginBottom: "20px" }}
          >
            <Input placeholder="Enter your email" style={{ height: "50px" }} />
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name!" }]}
            style={{ marginBottom: "20px" }}
          >
            <Input placeholder="Enter your name" style={{ height: "50px" }} />
          </Form.Item>

          {/* <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: true, message: "Please enter your phone number!" },
              { pattern: /^\d+$/, message: "Phone number must be numeric." },
            ]}
            style={{ marginBottom: "20px" }}
          >
            <Space.Compact style={{ display: "flex", height: "50px" }}>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0 10px",
                  backgroundColor: "#f0f0f0",
                  border: "1px solid #d9d9d9",
                  borderRight: "none",
                  borderRadius: "4px 0 0 4px",
                }}
              >
                +62
              </span>
              <Input
                placeholder="Enter your phone number"
                maxLength={12}
                style={{
                  height: "50px",
                  borderRadius: "0 4px 4px 0", // Remove radius from the left side
                }}
              />
            </Space.Compact>
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
};

export default PasswordPage;
