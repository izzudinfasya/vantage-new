import React, { useState, useEffect } from "react";
import gifAvatar from "../assets/gifAvatar.gif";
import "./passwordPage.css"; // Import CSS file
import { Modal, Button, Input, message, Form } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Tambahkan interface untuk props
interface PasswordPageProps {
  onLogin: (password: string) => void; // Fungsi onLogin yang akan digunakan
}

const PasswordPage: React.FC<PasswordPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [, setIsPasswordCorrect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Timer states
  const [timer, setTimer] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isTimeUp, setIsTimeUp] = useState(false);

  // Retrieve target date from local storage
  const storedTargetDate = localStorage.getItem("countdownTargetDate");
  const targetDate = storedTargetDate
    ? new Date(storedTargetDate).getTime()
    : new Date().getTime();

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
    setInputPassword(e.target.value);
  };

  const handleEnter = async () => {
    setIsLoading(true);
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/password/validate`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: inputPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsPasswordCorrect(true); // Update local state for success
        onLogin(inputPassword); // Call parent login function

        setTimeout(() => {
          navigate(data.redirectTo);
        }, 1500);
      } else {
        setIsLoading(false);
        message.error("Incorrect password");
      }
    } catch (error) {
      setIsLoading(false);
      message.error("An error occurred. Please try again.");
    }
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    setLoading(true); // Set loading to true
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/password/get-password`;
      const response = await axios.post(apiUrl, {
        email: values.email,
        name: values.name,
      });

      // Check response
      message.success(response.data.message);
      handleCancel();
      form.resetFields();
    } catch (error) {
      // Improved error handling
      if (axios.isAxiosError(error) && error.response) {
        message.error(
          error.response.data.message || "An error occurred. Please try again."
        );
      } else {
        message.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="password-page">
      <div className={`loading-overlay ${isLoading ? "" : "hidden"}`}>
        <div className="loading-content">
          <img src={gifAvatar} alt="Loading" className="loading-logo" />
        </div>
      </div>

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
              onChange={handlePasswordChange}
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
        </Form>
      </Modal>
    </div>
  );
};

export default PasswordPage;
