import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Radio } from "antd";

export default function BlogModal({
  visible,
  mode,
  tags,
  blog,
  onCancel,
  onOk,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (blog && (mode === "edit" || mode === "view")) {
      form.setFieldsValue(blog);
    } else {
      form.resetFields();
    }
  }, [blog, mode, form]);

  const handleOk = () => {
    if (mode === "view") {
      onCancel();
      return;
    }
    form.validateFields().then((values) => {
      const blogData = {
        ...values,
        accountID: blog ? blog.accountID : null, // assuming accountID stays same
      };
      onOk(blogData);
      form.resetFields();
    });
  };

  return (
    <Modal
      visible={visible}
      title={
        mode === "add"
          ? "Add Blog"
          : mode === "edit"
          ? "Edit Blog"
          : "View Blog"
      }
      onCancel={onCancel}
      onOk={handleOk}
      okText={mode === "view" ? "Close" : "Save"}
      cancelText={mode === "view" ? null : "Cancel"}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="blogID" label="Blog ID" hidden={mode === "add"}>
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="blogName"
          label="Blog Name"
          rules={[{ required: true }]}
        >
          <Input disabled={mode === "view"} />
        </Form.Item>
        <Form.Item name="content" label="Content" rules={[{ required: true }]}>
          <Input.TextArea disabled={mode === "view"} />
        </Form.Item>
        <Form.Item name="tagName" label="Select Tags">
          <Select disabled={mode === "view"} mode="multiple">
            {tags?.map((tag) => (
              <Select.Option key={tag.tagID} value={tag.tagID}>
                {tag.tagName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Radio.Group disabled={mode === "view"}>
            <Radio value="draft">Draft</Radio>
            <Radio value="published">Published</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
}
