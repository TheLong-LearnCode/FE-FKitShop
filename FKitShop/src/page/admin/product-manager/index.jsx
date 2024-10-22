import React, { useState, useEffect } from "react";
import {
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  message,
  Image,
  Carousel,
  Divider,
  Radio,
  Upload,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  PictureOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import { formatCurrency } from "../../../util/CurrencyUnit";
import { getAllProducts } from "../../../service/productService";
import "./index.css";
import { ImageUploader } from "../../../service/uploadImages";
const { Option } = Select;

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingProductId, setEditingProductId] = useState(null);

  const [visibleImages, setVisibleImages] = useState([]); // Trạng thái để hiển thị tất cả hình ảnh của sản phẩm
  const [isImagesModalVisible, setIsImagesModalVisible] = useState(false); // Trạng thái để hiển thị modal xem ảnh

  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const response = await getAllProducts();
      setProducts(response.data);
    };
    fetchAllProducts();
  }, []);

  // const handleUpload = async (options) => {
  //   const { onSuccess, onError, file } = options;
  //   setUploading(true);
  //   try {
  //     const response = await uploadImage(file); // Call API to upload the image
  //     onSuccess(response.data); // Pass the image URL to success callback
  //     message.success(`${file.name} uploaded successfully.`);
  //   } catch (error) {
  //     console.error("Upload failed:", error);
  //     message.error(`${file.name} upload failed.`);
  //     onError(error); // Pass error to error callback
  //   }
  //   setUploading(false);
  // };

  // const uploadProps = {
  //   customRequest: handleUpload,
  //   onChange: ({ fileList }) => setFileList(fileList),
  //   onRemove: (file) =>
  //     setFileList(fileList.filter((item) => item.uid !== file.uid)),
  // };

  const columns = [
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "flex-end", gap: "10px" }}>
          <Carousel autoplay style={{ width: "70px", height: "70px" }}>
            {record.images?.slice(0, 3).map((image) => (
              <div key={image?.id} style={{ textAlign: "center" }}>
                <Image
                  src={image?.url}
                  alt={record.name}
                  width={70}
                  height={70}
                  style={{ objectFit: "cover", justifyContent: "center" }}
                  fallback="https://s3.ap-southeast-2.amazonaws.com/fkshop/Product/no-image.png"
                />
              </div>
            ))}
          </Carousel>
          <Button
            icon={<PictureOutlined />} // Thêm nút "View All Images"
            onClick={() => handleViewImages(record.images)}
          >
            {/* View All Images */}
          </Button>
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => <span className="ellipsis-text">{name}</span>,
    },
    {
      title: "Stock",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price (VNĐ)",
      dataIndex: "price",
      key: "price",
      render: (_, record) => <span>{formatCurrency(record.price)}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => <span>{record.status}</span>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (_, record) => <span>{record.type}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => showEditModal(record)}>
            {/* Edit */}
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            danger
          >
            {/* Delete */}
          </Button>
        </Space>
      ),
    },
  ];

  // Hàm mới để hiển thị modal với tất cả hình ảnh
  const handleViewImages = (images) => {
    setVisibleImages(images); // Lưu trữ danh sách hình ảnh
    setIsImagesModalVisible(true); // Mở modal hiển thị hình ảnh
  };

  const showModal = () => {
    setIsModalVisible(true);
    setEditingProductId(null);
    form.resetFields();
  };

  const showEditModal = (record) => {
    setIsModalVisible(true);
    setEditingProductId(record.id);
    form.setFieldsValue(record);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingProductId) {
          setProducts(
            products.map((product) =>
              product.id === editingProductId
                ? { ...product, ...values }
                : product
            )
          );
          message.success("Product updated successfully");
        } else {
          const newProduct = { ...values, id: Date.now() };
          setProducts([...products, newProduct]);
          message.success("New product added successfully");
        }
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this product?",
      content: "This action cannot be undone.",
      onOk() {
        setProducts(products.filter((product) => product.id !== id));
        message.success("Product deleted successfully");
      },
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showModal}
        style={{ marginBottom: "20px" }}
      >
        Add New Product
      </Button>
      <Table columns={columns} dataSource={products} rowKey="id" />
      <Modal
        title={editingProductId ? "Edit Product" : "Add New Product"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          {/* Replace this with the reusable ImageUploader component */}
          <Form.Item name="image" label="Image">
            <ImageUploader
              fileList={fileList}
              setFileList={setFileList}
              uploading={uploading}
              setUploading={setUploading}
            />
          </Form.Item>
          <Form.Item
            name="name"
            label="Product Name"
            rules={[
              { required: true, message: "Please input the product name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <InputNumber
              min={0}
              step={0.01}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Stock"
            rules={[
              { required: true, message: "Please input the stock quantity!" },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>

          <Form.Item name="publisher" label="Publisher">
            <Input />
          </Form.Item>
          <Form.Item
            name="discount"
            label="Discount"
            rules={[{ required: true, message: "Please input the discount!" }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name="type" label="Type">
            <Radio.Group>
              <Radio value="Kit">Kit</Radio>
              <Radio value="Item">Item</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="weight" label="Weight">
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name="material" label="Material">
            <Input />
          </Form.Item>
          {/* Dimension */}
          <Form.Item name="dimension" label="Dimension">
            <Input.Group compact>
              <Form.Item
                name={["dimension", "length"]}
                noStyle
                rules={[
                  { required: true, message: "Please input the length!" },
                ]}
              >
                <InputNumber placeholder="Length" min={0} />
              </Form.Item>
              <span style={{ margin: "0 8px" }}>x</span>
              <Form.Item
                name={["dimension", "width"]}
                noStyle
                rules={[{ required: true, message: "Please input the width!" }]}
              >
                <InputNumber placeholder="Width" min={0} />
              </Form.Item>
              <span style={{ marginLeft: "8px" }}>cm</span>
            </Input.Group>
          </Form.Item>
          {/* Unit on Order */}
          <Form.Item name="unitOnOrder" label="Unit on Order">
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Radio.Group>
              <Radio value="active">Active</Radio>
              <Radio value="inactive">Inactive</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="type" label="Type">
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category">
            <Select>
              <Option value="Starter">Starter</Option>
              <Option value="Advanced">Advanced</Option>
              <Option value="Home Automation">Home Automation</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="All Images"
        visible={isImagesModalVisible}
        onCancel={() => setIsImagesModalVisible(false)}
        footer={null}
        style={{ alignItems: "center" }}
      >
        <Carousel autoplay>
          {visibleImages.map((image) => (
            <div key={image?.id} style={{ textAlign: "center" }}>
              <Image
                src={image?.url}
                alt="product image"
                width={300}
                height={300}
                style={{ objectFit: "cover", alignContent: "center" }}
                fallback="https://s3.ap-southeast-2.amazonaws.com/fkshop/Product/no-image.png"
              />
            </div>
          ))}
        </Carousel>
      </Modal>
    </div>
  );
};

export default ProductManager;
