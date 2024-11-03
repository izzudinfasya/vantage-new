import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Typography,
  InputNumber,
  message,
  Space,
  Upload,
  Row,
  Col,
  Layout,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { UploadChangeParam, UploadFile } from "antd/es/upload/interface";

const { Title } = Typography;
const { Content } = Layout;

const AdminUpload: React.FC = () => {
  const location = useLocation();
  const product = location.state?.product;
  const [form] = Form.useForm();
  const [details, setDetails] = useState<string[]>([""]);
  const [washingInstructions, setWashingInstructions] = useState<string[]>([
    "",
  ]);
  const [sizes, setSizes] = useState([{ name: "", qty: 0 }]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [fileList2, setFileList2] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (product) {
      // Populate form with existing product data
      form.setFieldsValue({
        id: product._id,
        title: product.title,
        linkProduct: product.linkProduct,
        qtyTotal: product.qtyTotal,
        badgeType: product.badgeType,
        originalPrice: product.originalPrice,
        discountedPrice: product.discountedPrice,
        sizeModel: product.sizeModel,
        heightModel: product.heightModel,
      });
      setDetails(product.details || [""]);
      setSizes(product.sizes || [""]);
      setWashingInstructions(product.washingInstructions || [""]);

      setFileList(product.images || []);
      setFileList2(product.sizeChart || []);
    }
  }, [form, product]);

  const resetForm = () => {
    form.resetFields();
    setDetails([""]);
    setSizes([{ name: "", qty: 0 }]);
    setWashingInstructions([""]);
    setFileList([]);
    setFileList2([]);
  };

  const onFinish = async (values: any) => {
    const formData = new FormData();

    // Append necessary product fields
    const fieldsToAppend = [
      "title",
      "badgeType",
      "linkProduct",
      "sizeModel",
      "qtyTotal",
      "heightModel",
      "originalPrice",
      "discountedPrice",
    ];

    fieldsToAppend.forEach((field) => {
      if (values[field] !== undefined) {
        formData.append(field, values[field]);
      }
    });

    // Append product images
    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("images", file.originFileObj);
      }
    });

    fileList2.forEach((file) => {
      if (file.originFileObj) {
        formData.append("sizeChart", file.originFileObj);
      }
    });

    // Append custom fields
    const appendCustomFields = (fieldName: string, items: string[]) => {
      items.forEach((item, index) => {
        if (item.trim()) {
          formData.append(`${fieldName}[${index}]`, item);
        }
      });
    };

    appendCustomFields("details", details);
    sizes.forEach((size, index) => {
      const name = size.name || "";
      if (name.trim()) {
        formData.append(`sizes[${index}][name]`, name);
        formData.append(`sizes[${index}][qty]`, String(size.qty));
      }
    });

    appendCustomFields("washingInstructions", washingInstructions);

    try {
      setLoading(true);
      const apiUrl = product
        ? `${process.env.REACT_APP_API_URL}/products/update/${product._id}`
        : `${process.env.REACT_APP_API_URL}/products/upload`;
      const method = product ? "put" : "post";

      const response = await axios({
        method,
        url: apiUrl,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        message.success(
          product
            ? "Product updated successfully!"
            : "Product uploaded successfully!"
        );
        resetForm();
      } else {
        message.error("Failed to upload product.");
      }
    } catch (error: any) {
      console.error(
        "Upload error:",
        error.response ? error.response.data : error.message
      );
      message.error("An error occurred while uploading the product.");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  // Handler for the first upload (Product Images)
  const handleChange1 = (info: UploadChangeParam<UploadFile<any>>) => {
    setFileList(info.fileList);
  };

  // Handler for the second upload (Size Chart Product)
  const handleChange2 = (info: UploadChangeParam<UploadFile<any>>) => {
    setFileList2(info.fileList);
  };

  const handleAddDetail = () => setDetails([...details, ""]);
  const handleRemoveDetail = (index: number) =>
    setDetails(details.filter((_, i) => i !== index));

  const handleAddSize = () => {
    setSizes([...sizes, { name: "", qty: 0 }]);
  };

  const handleRemoveSize = (index: number) => {
    const newSizes = sizes.filter((_, i) => i !== index);
    setSizes(newSizes);
  };

  const handleAddWashingInstruction = () =>
    setWashingInstructions([...washingInstructions, ""]);
  const handleRemoveWashingInstruction = (index: number) =>
    setWashingInstructions(washingInstructions.filter((_, i) => i !== index));

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content>
        <Row justify="center">
          <Col span={24} md={24} lg={24}>
            <div
              style={{
                padding: "20px",
                maxWidth: "100%",
                margin: "0 auto",
                backgroundColor: "#ffffff",
                color: "#000000",
              }}
            >
              <Title
                level={4}
                style={{ textAlign: "left", marginBottom: "20px" }}
              >
                {product ? "Edit Product" : "Upload Product"}
              </Title>

              <Form
                form={form}
                name="productUpload"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
              >
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Product Title"
                      name="title"
                      rules={[
                        {
                          required: true,
                          message: "Please input the product title!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Form.Item label="Link Product" name="linkProduct">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Badge Type"
                      name="badgeType"
                      rules={[
                        {
                          required: true,
                          message: "Please input the badge type!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Original Price"
                      name="originalPrice"
                      rules={[
                        {
                          required: true,
                          message: "Please input the original price!",
                        },
                      ]}
                    >
                      <InputNumber style={{ width: "100%" }} min={0} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Discounted Price"
                      name="discountedPrice"
                      rules={[
                        {
                          required: true,
                          message: "Please input the discounted price!",
                        },
                      ]}
                    >
                      <InputNumber style={{ width: "100%" }} min={0} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Qty Product"
                      name="qtyTotal"
                      rules={[
                        {
                          required: true,
                          message: "Please input the qty product!",
                        },
                      ]}
                    >
                      <InputNumber style={{ width: "100%" }} min={0} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Product Images"
                      rules={[
                        {
                          required: true,
                          message: "Please upload product images!",
                        },
                      ]}
                    >
                      <Upload
                        listType="picture-card"
                        showUploadList={true}
                        multiple
                        fileList={fileList}
                        onChange={handleChange1}
                        beforeUpload={() => false}
                      >
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      </Upload>
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Size Chart Product"
                      rules={[
                        {
                          required: true,
                          message: "Please upload size chart product!",
                        },
                      ]}
                    >
                      <Upload
                        listType="picture-card"
                        showUploadList={true}
                        multiple
                        fileList={fileList2}
                        onChange={handleChange2}
                        beforeUpload={() => false}
                      >
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    {/* Dynamic Fields: Detail Item, Size, Washing Instructions, Return Policies, Shipping Policies */}
                    <Form.Item label="Detail Item (add one at a time)">
                      <Space direction="vertical" style={{ width: "100%" }}>
                        {details.map((detail, index) => (
                          <Space key={index} style={{ width: "100%" }}>
                            <Input
                              value={detail}
                              onChange={(e) => {
                                const newDetails = [...details];
                                newDetails[index] = e.target.value;
                                setDetails(newDetails);
                              }}
                              placeholder={`Detail ${index + 1}`}
                            />
                            <Button
                              type="text"
                              icon={<MinusCircleOutlined />}
                              onClick={() => handleRemoveDetail(index)}
                            />
                          </Space>
                        ))}
                        <Button
                          type="dashed"
                          onClick={handleAddDetail}
                          style={{ width: "100%" }}
                        >
                          Add Detail
                        </Button>
                      </Space>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item label="Available Size (add one at a time)">
                      <Space direction="vertical" style={{ width: "100%" }}>
                        {sizes.map((size, index) => (
                          <Space
                            key={index}
                            style={{ width: "100%" }}
                            align="baseline"
                          >
                            <Input
                              value={size.name}
                              onChange={(e) => {
                                const newSizes = [...sizes];
                                newSizes[index] = {
                                  ...newSizes[index],
                                  name: e.target.value,
                                };
                                setSizes(newSizes);
                              }}
                              placeholder={`Size ${index + 1}`}
                              style={{ marginRight: "8px" }}
                            />
                            <InputNumber
                              value={size.qty}
                              onChange={(value) => {
                                const newSizes = [...sizes];
                                newSizes[index] = {
                                  ...newSizes[index],
                                  qty: value !== null ? value : 0,
                                };
                                setSizes(newSizes);
                              }}
                              placeholder="Qty"
                              min={0}
                              style={{ width: "100px", marginRight: "8px" }}
                            />

                            <Button
                              type="text"
                              icon={<MinusCircleOutlined />}
                              onClick={() => handleRemoveSize(index)}
                            />
                          </Space>
                        ))}
                        <Button
                          type="dashed"
                          onClick={handleAddSize}
                          style={{ width: "100%" }}
                        >
                          Add Size
                        </Button>
                      </Space>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item label="Size Model" name="sizeModel">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item label="Height Model" name="heightModel">
                      <InputNumber style={{ width: "100%" }} min={0} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    {" "}
                    <Form.Item label="Washing Instructions (add one at a time)">
                      <Space direction="vertical" style={{ width: "100%" }}>
                        {washingInstructions.map((instruction, index) => (
                          <Space key={index} style={{ width: "100%" }}>
                            <Input
                              value={instruction}
                              onChange={(e) => {
                                const newInstructions = [
                                  ...washingInstructions,
                                ];
                                newInstructions[index] = e.target.value;
                                setWashingInstructions(newInstructions);
                              }}
                              placeholder={`Instruction ${index + 1}`}
                            />
                            <Button
                              type="text"
                              icon={<MinusCircleOutlined />}
                              onClick={() =>
                                handleRemoveWashingInstruction(index)
                              }
                            />
                          </Space>
                        ))}
                        <Button
                          type="dashed"
                          onClick={handleAddWashingInstruction}
                          style={{ width: "100%" }}
                        >
                          Add Washing Instruction
                        </Button>
                      </Space>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    style={{
                      width: "100%",
                      marginBottom: "10px",
                      backgroundColor: "#000",
                    }}
                  >
                    {product ? "Edit Product" : "Upload Product"}
                  </Button>
                  {product && (
                    <Button
                      type="default"
                      onClick={resetForm}
                      style={{ width: "100%" }}
                    >
                      Reset Form
                    </Button>
                  )}
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AdminUpload;
