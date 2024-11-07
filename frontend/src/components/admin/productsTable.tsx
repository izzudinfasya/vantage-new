import React, { useState, useEffect } from "react";
import { Table, Button, message, Spin } from "antd";
import axios from "axios";
import { IProducts } from "../../../../backend/src/models/Product";
import { useNavigate } from "react-router-dom";
import { ColumnType } from "antd/es/table"; // Adjust this import according to your library

const ProductsTable: React.FC = () => {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/products/get-products`);
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      message.error("Error fetching products. Please try again.");
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnType<IProducts>[] = [
    {
      title: "No.",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
      width: 70,
      align: "center",
    },
    {
      title: "Nama Produk",
      dataIndex: "title",
      key: "title",
      align: "center",
    },
    {
      title: "Images",
      key: "images",
      render: (value: any, record: IProducts, index: number) => {
        const lastImage = record.images?.[record.images.length - 1]; // Get the last image in the array
        return lastImage ? (
          <img
            src={lastImage}
            alt={`Product ${index + 1}`} // Use the correct index here
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
        ) : (
          <span>No Image</span>
        );
      },
      align: "center",
    },
    {
      title: "Tipe",
      dataIndex: "badgeType",
      key: "badgeType",
      align: "center",
    },
    {
      title: "Original Price",
      dataIndex: "originalPrice",
      key: "originalPrice",
      align: "center",
    },
    {
      title: "Discounted Price",
      dataIndex: "discountedPrice",
      key: "discountedPrice",
      align: "center",
    },
    {
      title: "Quantity Total",
      dataIndex: "qtyTotal",
      key: "qtyTotal",
      align: "center",
    },
    {
      title: "Stock",
      dataIndex: "sizes",
      key: "sizes",
      render: (sizes: { name: string; qty: number }[] = []) => {
        return (
          sizes.map((size) => `${size.name} (Qty: ${size.qty})`).join(", ") ||
          "N/A"
        ); // Join sizes with a fallback for undefined
      },
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text: any, record: IProducts) => (
        <span>
          <Button
            onClick={() => handleEditRedirect(record)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button danger onClick={() => handleRemove(record._id)}>
            Remove
          </Button>
        </span>
      ),
    },
  ];

  const handleEditRedirect = (product: IProducts) => {
    navigate("/admin/product/settings", { state: { product } });
  };

  const handleRemove = async (productId: string) => {
    try {
      // Mengirim permintaan DELETE ke API
      const response = await axios.delete(`${apiUrl}/products/${productId}`);

      // Cek status respons
      if (response.status === 200) {
        message.success("Product removed successfully!");
        fetchProducts();
      } else {
        message.error("Failed to remove product.");
      }
    } catch (error: any) {
      console.error(
        "Remove error:",
        error.response ? error.response.data : error.message
      );
      message.error("An error occurred while removing the product.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          dataSource={products}
          columns={columns}
          rowKey="_id"
          scroll={{ x: "max-content" }}
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

export default ProductsTable;
