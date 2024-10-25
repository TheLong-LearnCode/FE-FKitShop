import React, { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Radio,
  Button,
  Row,
  Col,
  Card,
} from "antd";
import {
  addImages,
  deleteImages,
  ProductUploadImage,
  updateImage,
} from "../../../service/productService";

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
  deletedImages,
  updatedImages,
  setUpdatedImages,
  setDeletedImages,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (product && (mode === "edit" || mode === "view")) {
      const dimension = product?.dimension?.replace("cm", "") || "0x0x0"; // Remove 'cm' and default to "0x0x0"
      //const [length, width, height] = dimension.split("x").map(Number);
      const [length, width, height] = dimension
        .split("x")
        .map((dim) => (isNaN(dim) ? 0 : Number(dim)));

      form.setFieldsValue({
        ...product,
        dimension: {
          length: length || 0,
          width: width || 0,
          height: height || 0,
        },
        categoryID: product.categories?.map((cat) => cat.categoryID) || [],
      });

      setFileList(
        product.images?.map((img) => ({
          uid: img.id,
          name: img.name,
          status: "done",
          url: img.url,
        })) || []
      );
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
    form.validateFields().then(async (values) => {
      const formData = new FormData();

      // Append all form values to FormData
      Object.keys(values).forEach((key) => {
        if (key === "categoryID") {
          formData.append(key, values[key]);
        } else if (key === "dimension") {
          formData.append(
            key,
            `${values[key].length}x${values[key].width}x${values[key].height}cm`
          );
        } else if (key !== "images") {
          // Skip 'images' field since it's handled separately
          formData.append(key, values[key]);
        }
      });

      // Append images (without indices, just "images" field)
      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("images", file.originFileObj); // key should be 'images' for array upload
        }
      });

      if (deletedImages.length > 0) {
        console.log(deletedImages);
        
        const imageIDs = deletedImages.join(",");
        await deleteImages({ productID: product?.productID, imageIDs });
      }

      // Handle updated images if there are any
      for (const { uid, file } of updatedImages) {
        const formData = new FormData();
        formData.append("images", file); // Add new image file
        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }

        await addImages(product?.productID, formData);
      }

      // Log formData for debugging
      // for (let [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }

      // Submit the form data
      onOk(formData);
      setDeletedImages([]);
      setUpdatedImages([]);
      form.resetFields();
    });
  };

  return (
    <Modal
      visible={visible}
      title={
        mode === "add"
          ? "* Add New Product *"
          : mode === "edit"
          ? "* Edit Product *"
          : "* View Product *"
      }
      onCancel={onCancel}
      onOk={handleOk}
      okText={mode !== "view" ? "Save" : ""}
      cancelText={mode === "view" ? null : "Cancel"}
      width="70%"
      bodyStyle={{
        borderRadius: "8px",
        padding: "24px",
        backgroundColor: "#f5f5f5",
      }}
      footer={
        mode !== "view" && (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="primary" onClick={handleOk}>
              Save
            </Button>
          </div>
        )
      }
    >
      <Form form={form} layout="vertical">
        <Row gutter={[16, 16]}>
          {/* Section 1 */}
          <Col span={13}>
            <Card title="Product Details" bordered={false}>
              <Form.Item
                name="images"
                label="Images"
                rules={[
                  {
                    required: true,
                    validator: (_, value) =>
                      fileList.length > 0
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error("Please upload at least one image")
                          ),
                  },
                ]}
              >
                <ProductUploadImage
                  mode={mode}
                  fileList={fileList}
                  setFileList={setFileList}
                  uploading={uploading}
                  setUploading={setUploading}
                  productID={product?.productID}
                  setDeletedImages={setDeletedImages}
                  setUpdatedImages={setUpdatedImages}
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
                label={
                  <span>
                    {" "}
                    Price
                    <span style={{ color: "red" }}> (VNĐ)</span>
                  </span>
                }
                rules={[{ required: true }]}
              >
                <InputNumber
                  min={0}
                  disabled={mode === "view"}
                  className="product-details-number"
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
              <Form.Item
                name="discount"
                label={
                  <span>
                    Discount
                    <span style={{ color: "red" }}> (%)</span>
                  </span>
                }
                rules={[{ required: true }]}
              >
                <InputNumber min={0} disabled={mode === "view"} />
              </Form.Item>
            </Card>
          </Col>

          {/* Section 4 */}
          <Col span={11}>
            <Card title="Status & Classification" bordered={false}>
              <Form.Item
                name="quantity"
                label="Stock"
                rules={[{ required: true }]}
              >
                <InputNumber
                  min={0}
                  disabled={mode === "view"}
                  className="product-details-number"
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>

              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true }]}
              >
                <Radio.Group disabled={mode === "view"}>
                  <Radio value="active">Active</Radio>
                  <Radio value="inactive">Inactive</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                <Radio.Group disabled={mode === "view"}>
                  <Radio value="kit">Kit</Radio>
                  <Radio value="item">Item</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="categoryID"
                label="Category"
                rules={[{ required: true }]}
              >
                <Select
                  mode="multiple"
                  disabled={mode === "view"}
                  placeholder="Select categories..."
                >
                  {categories?.map((category) => (
                    <Select.Option
                      key={category.categoryID}
                      value={category.categoryID}
                    >
                      {category.categoryName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Card>
          </Col>

          {/* Section 2 */}
          <Col span={13}>
            <Card title="Additional Information" bordered={false}>
              <Form.Item name="publisher" label="Publisher">
                <Input disabled={mode === "view"} />
              </Form.Item>
              <Form.Item name="description" label="Description">
                <Input.TextArea disabled={mode === "view"} />
              </Form.Item>
            </Card>
          </Col>
          {/* Section 3 */}
          <Col span={11}>
            <Card title="Product Specifications" bordered={false}>
              <Form.Item
                label={
                  <span>
                    Dimensions
                    <span style={{ color: "red" }}> (cm)</span>
                  </span>
                }
              >
                <Input.Group compact>
                  <Form.Item
                    name={["dimension", "length"]}
                    noStyle
                    rules={[
                      { required: true, message: "Please input the length!" },
                    ]}
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
                    rules={[
                      { required: true, message: "Please input the width!" },
                    ]}
                  >
                    <InputNumber
                      placeholder="Width"
                      min={0}
                      disabled={mode === "view"}
                    />
                  </Form.Item>
                  <span style={{ margin: "0 8px" }}>x</span>
                  <Form.Item
                    name={["dimension", "height"]}
                    noStyle
                    rules={[
                      { required: true, message: "Please input the height!" },
                    ]}
                  >
                    <InputNumber
                      placeholder="Height"
                      min={0}
                      disabled={mode === "view"}
                    />
                  </Form.Item>
                </Input.Group>
              </Form.Item>

              <Form.Item
                name="weight"
                label={
                  <span>
                    Weight
                    <span style={{ color: "red" }}> (kg)</span>
                  </span>
                }
              >
                <InputNumber min={0} disabled={mode === "view"} />
              </Form.Item>

              <Form.Item name="material" label="Material">
                <Input.TextArea disabled={mode === "view"} />
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ProductModal;
