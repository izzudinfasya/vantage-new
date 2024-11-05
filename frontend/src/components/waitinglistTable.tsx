import React, { useState, useEffect } from "react";
import { Table, message, Spin, Button } from "antd";
import axios from "axios";
import { IPassword } from "../../../backend/src/models/Password"; // Adjust the import path accordingly
import { ColumnType } from "antd/es/table"; // Adjust this import according to your library

const WaitingListTable: React.FC = () => {
  const [passwords, setPasswords] = useState<IPassword[]>([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchWaitingList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchWaitingList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/password/get-waiting-list`);

      if (Array.isArray(response.data)) {
        setPasswords(response.data);
      } else {
        message.error("Unexpected data format received.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle specific Axios errors
        message.error(
          `Error fetching waiting list: ${
            error.response?.data?.message || error.message
          }`
        );
      } else {
        // Handle general errors
        message.error("Error fetching waiting list. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnType<IPassword>[] = [
    {
      title: "No.",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
      width: 70,
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text: any, record: IPassword) => (
        <span>
          <Button danger onClick={() => handleRemove(record._id)}>
            Remove
          </Button>
        </span>
      ),
    },
  ];

  const handleRemove = async (passwordId: string) => {
    try {
      // Mengirim permintaan DELETE ke API
      const response = await axios.delete(`${apiUrl}/password/${passwordId}`); // Adjust the endpoint accordingly

      // Cek status respons
      if (response.status === 200) {
        message.success("Waiting List removed successfully!");
        fetchWaitingList();
      } else {
        message.error("Failed to remove Waiting List.");
      }
    } catch (error: any) {
      console.error(
        "Remove error:",
        error.response ? error.response.data : error.message
      );
      message.error("An error occurred while removing the Waiting List.");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          dataSource={passwords}
          columns={columns}
          rowKey="_id"
          scroll={{ x: "max-content" }}
          style={{ width: "100%" }} // Set the table to full width
        />
      )}
      <style>{`
        .ant-spin-dot-item {
          background-color: black !important;
        }
      `}</style>
    </div>
  );
};

export default WaitingListTable;
