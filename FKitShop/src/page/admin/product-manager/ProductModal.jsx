import React, { useEffect } from "react";
import { Modal, Form, Input, InputNumber, Select, Radio } from "antd";
import { ProductUploadImage } from "../../../service/productService";

const { Option } = Select;

const ProductModal = ({
  visible,
  mode,
  product,
  categories,
  onCancel,
  onOk,
  fileList,
  setFileList,
  uploading,
  setUploading,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (product && (mode === "edit" || mode === "view")) {
      form.setFieldsValue({
        ...product,
        categoryID: product.category?.map(cat => cat.categoryID) || []
      });
      setFileList(product.images?.map(img => ({
        uid: img.id,
        name: img.name,
        status: 'done',
        url: img.url,
      })) || []);
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [product, mode, form, setFileList]);

  const handleOk = () => {
    if (mode === "view") {
      onCancel();
      return;
    }
    form.validateFields().then((values) => {
      const formData = new FormData();

      // Append all form values to FormData
      Object.keys(values).forEach(key => {
        if (key === 'categoryID') {
          formData.append(key, values[key].join(','));
        } else if (key === 'dimension') {
          formData.append(key, `${values[key].length}x${values[key].width}cm`);
        } else if (key !== 'images') { // Skip 'images' field
          formData.append(key, values[key]);
        }
      });

      // Append images
      fileList.forEach((file, index) => {
        if (file.originFileObj) {
          formData.append(`images[${index}]`, file.originFileObj);
        } else if (file.url) {
          // For existing images, you might want to send the URL or ID
          formData.append(`existingImages[${index}]`, file.url);
        }
      });

      // Log formData for debugging
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      onOk(formData);
      form.resetFields();
    });
  };

  return (
    <Modal
      visible={visible}
      title={
        mode === "add"
          ? "Add New Product"
          : mode === "edit"
          ? "Edit Product"
          : "View Product"
      }
      onCancel={onCancel}
      onOk={handleOk}
      okText={mode === "view" ? "Close" : "Save"}
      cancelText={mode === "view" ? null : "Cancel"}
    >
      <Form form={form} layout="vertical" rules={[{ required: true }]}>
        <Form.Item name="images" label="Images">
          <ProductUploadImage
            fileList={fileList}
            setFileList={setFileList}
            uploading={uploading}
            setUploading={setUploading}
          />
        </Form.Item>
        <Form.Item
          name="name"
          label="Product Name"
          rules={[{ required: true }]}
        >
          <Input disabled={mode === "view"} />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price (VNĐ)"
          rules={[{ required: true }]}
        >
          <InputNumber
            min={0}
            disabled={mode === "view"}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>
        <Form.Item name="quantity" label="Stock" rules={[{ required: true }]}>
          <InputNumber min={0} disabled={mode === "view"} />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea disabled={mode === "view"} />
        </Form.Item>
        <Form.Item name="publisher" label="Publisher">
          <Input disabled={mode === "view"} />
        </Form.Item>
        <Form.Item
          name="discount"
          label="Discount"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} disabled={mode === "view"} />
        </Form.Item>
        <Form.Item name="type" label="Type" rules={[{ required: true }]}>
          <Radio.Group disabled={mode === "view"}>
            <Radio value="kit">Kit</Radio>
            <Radio value="item">Item</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="weight" label="Weight">
          <InputNumber min={0} disabled={mode === "view"} />
        </Form.Item>
        <Form.Item
          name="material"
          label="Material"
          rules={[{ required: true }]}
        >
          <Input disabled={mode === "view"} />
        </Form.Item>
        <Form.Item label="Dimension" required>
          <Input.Group compact>
            <Form.Item
              name={["dimension", "length"]}
              noStyle
              rules={[{ required: true, message: "Please input the length!" }]}
            >
              <InputNumber
                placeholder="Length"
                min={0}
                disabled={mode === "view"}
              />
            </Form.Item>
            <span style={{ margin: "0 8px" }}>x</span>
            <Form.Item
              name={["dimension", "width"]}
              noStyle
              rules={[{ required: true, message: "Please input the width!" }]}
            >
              <InputNumber
                placeholder="Width"
                min={0}
                disabled={mode === "view"}
              />
            </Form.Item>
            <span style={{ marginLeft: "8px" }}>cm</span>
          </Input.Group>
        </Form.Item>
        <Form.Item
          name="unitOnOrder"
          label="Unit on Order"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} disabled={mode === "view"} />
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Radio.Group disabled={mode === "view"}>
            <Radio value="active">Active</Radio>
            <Radio value="inactive">Inactive</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="categoryID"
          label="Category"
          rules={[
            {
              required: true,
              message: "Please select at least one category",
            },
          ]}
        >
          <Select
            disabled={mode === "view"}
            mode="multiple"
            placeholder="Select categories..."
          >
            {categories?.map((category) => (
              <Option key={category.categoryID} value={category.categoryID}>
                {category.categoryName}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;
