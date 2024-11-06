import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  InputNumber,
  message,
  Space,
  Upload,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { UploadChangeParam, UploadFile } from "antd/es/upload/interface";

const { Title } = Typography;

const AdminUpload: React.FC = () => {
  const [form] = Form.useForm();
  const [details, setDetails] = useState<string[]>([""]);
  const [washingInstructions, setWashingInstructions] = useState<string[]>([
    "",
  ]);
  const [returnPolicies, setReturnPolicies] = useState<string[]>([""]);
  const [shippingPolicies, setShippingPolicies] = useState<string[]>([""]);
  const [sizes, setSizes] = useState<string[]>([""]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [fileList2, setFileList2] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const resetForm = () => {
    form.resetFields();
    setDetails([""]);
    setSizes([""]);
    setWashingInstructions([""]);
    setReturnPolicies([""]);
    setShippingPolicies([""]);
    setFileList([]);
    setFileList2([]);
  };

  const onFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("badgeType", values.badgeType);
    formData.append("linkProduct", values.linkProduct);
    formData.append("sizeModel", values.sizeModel);
    formData.append("heightModel", values.heightModel);
    formData.append("originalPrice", values.originalPrice);
    formData.append("discountedPrice", values.discountedPrice);

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
    details.forEach((detail, index) => {
      if (detail.trim()) {
        // Ensure detail is not just whitespace
        formData.append(`details[${index}]`, detail);
      }
    });

    sizes.forEach((size, index) => {
      if (size.trim()) {
        // Ensure size is not just whitespace
        formData.append(`sizes[${index}]`, size);
      }
    });

    washingInstructions.forEach((instruction, index) => {
      if (instruction.trim()) {
        // Ensure instruction is not just whitespace
        formData.append(`washingInstructions[${index}]`, instruction);
      }
    });

    returnPolicies.forEach((policy, index) => {
      if (policy.trim()) {
        // Ensure policy is not just whitespace
        formData.append(`returnPolicies[${index}]`, policy);
      }
    });

    shippingPolicies.forEach((policy, index) => {
      if (policy.trim()) {
        // Ensure policy is not just whitespace
        formData.append(`shippingPolicies[${index}]`, policy);
      }
    });

    try {
      setLoading(true);
      const apiUrl = `${process.env.REACT_APP_API_URL}/products/upload`;
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        message.success("Product uploaded successfully!");
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

  const handleAddSize = () => setSizes([...sizes, ""]);
  const handleRemoveSize = (index: number) =>
    setSizes(sizes.filter((_, i) => i !== index));

  const handleAddWashingInstruction = () =>
    setWashingInstructions([...washingInstructions, ""]);
  const handleRemoveWashingInstruction = (index: number) =>
    setWashingInstructions(washingInstructions.filter((_, i) => i !== index));

  const handleAddReturnPolicy = () =>
    setReturnPolicies([...returnPolicies, ""]);
  const handleRemoveReturnPolicy = (index: number) =>
    setReturnPolicies(returnPolicies.filter((_, i) => i !== index));

  const handleAddShippingPolicy = () =>
    setShippingPolicies([...shippingPolicies, ""]);
  const handleRemoveShippingPolicy = (index: number) =>
    setShippingPolicies(shippingPolicies.filter((_, i) => i !== index));

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
        color: "#000000",
      }}
    >
      <Title level={2} style={{ textAlign: "center" }}>
        Admin Product Upload
      </Title>
      <Form
        form={form}
        name="productUpload"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label="Product Title"
          name="title"
          rules={[
            { required: true, message: "Please input the product title!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Link Product" name="linkProduct">
          <Input />
        </Form.Item>

        <Form.Item
          label="Badge Type"
          name="badgeType"
          rules={[{ required: true, message: "Please input the badge type!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Original Price"
          name="originalPrice"
          rules={[
            { required: true, message: "Please input the original price!" },
          ]}
        >
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>

        <Form.Item
          label="Discounted Price"
          name="discountedPrice"
          rules={[
            { required: true, message: "Please input the discounted price!" },
          ]}
        >
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>

        <Form.Item
          label="Product Images"
          rules={[{ required: true, message: "Please upload product images!" }]}
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

        <Form.Item label="Available Size (add one at a time)">
          <Space direction="vertical" style={{ width: "100%" }}>
            {sizes.map((size, index) => (
              <Space key={index} style={{ width: "100%" }}>
                <Input
                  value={size}
                  onChange={(e) => {
                    const newSizes = [...sizes];
                    newSizes[index] = e.target.value;
                    setSizes(newSizes);
                  }}
                  placeholder={`Size ${index + 1}`}
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

        <Form.Item label="Size Model" name="sizeModel">
          <Input />
        </Form.Item>

        <Form.Item label="Height Model" name="heightModel">
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>

        <Form.Item label="Washing Instructions (add one at a time)">
          <Space direction="vertical" style={{ width: "100%" }}>
            {washingInstructions.map((instruction, index) => (
              <Space key={index} style={{ width: "100%" }}>
                <Input
                  value={instruction}
                  onChange={(e) => {
                    const newInstructions = [...washingInstructions];
                    newInstructions[index] = e.target.value;
                    setWashingInstructions(newInstructions);
                  }}
                  placeholder={`Instruction ${index + 1}`}
                />
                <Button
                  type="text"
                  icon={<MinusCircleOutlined />}
                  onClick={() => handleRemoveWashingInstruction(index)}
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

        <Form.Item label="Return Policies (add one at a time)">
          <Space direction="vertical" style={{ width: "100%" }}>
            {returnPolicies.map((policy, index) => (
              <Space key={index} style={{ width: "100%" }}>
                <Input
                  value={policy}
                  onChange={(e) => {
                    const newPolicies = [...returnPolicies];
                    newPolicies[index] = e.target.value;
                    setReturnPolicies(newPolicies);
                  }}
                  placeholder={`Policy ${index + 1}`}
                />
                <Button
                  type="text"
                  icon={<MinusCircleOutlined />}
                  onClick={() => handleRemoveReturnPolicy(index)}
                />
              </Space>
            ))}
            <Button
              type="dashed"
              onClick={handleAddReturnPolicy}
              style={{ width: "100%" }}
            >
              Add Return Policy
            </Button>
          </Space>
        </Form.Item>

        <Form.Item label="Shipping Policies (add one at a time)">
          <Space direction="vertical" style={{ width: "100%" }}>
            {shippingPolicies.map((policy, index) => (
              <Space key={index} style={{ width: "100%" }}>
                <Input
                  value={policy}
                  onChange={(e) => {
                    const newPolicies = [...shippingPolicies];
                    newPolicies[index] = e.target.value;
                    setShippingPolicies(newPolicies);
                  }}
                  placeholder={`Policy ${index + 1}`}
                />
                <Button
                  type="text"
                  icon={<MinusCircleOutlined />}
                  onClick={() => handleRemoveShippingPolicy(index)}
                />
              </Space>
            ))}
            <Button
              type="dashed"
              onClick={handleAddShippingPolicy}
              style={{ width: "100%" }}
            >
              Add Shipping Policy
            </Button>
          </Space>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ width: "100%" }}
          >
            Upload Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminUpload;
