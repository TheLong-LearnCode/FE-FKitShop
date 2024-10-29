import React, { useEffect } from "react";
import { Modal, Form, Input, InputNumber } from "antd";

const FeedbackModal = ({ visible, mode, feedback, onCancel, onOk }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (feedback && (mode === "edit" || mode === "view")) {
      const formattedFeedback = {
        ...feedback,
        createDate: feedback.createDate
          ? new Date(feedback.createDate).toLocaleDateString("en-GB")
          : "",
      };
      form.setFieldsValue(formattedFeedback);
    } else {
      form.resetFields();
    }
  }, [feedback, mode, form]);

  const handleOk = () => {
    if (mode === "view") {
      onCancel();
      return;
    }
    form.validateFields().then((values) => {
      onOk(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      visible={visible}
      title={
        mode === "add"
          ? "Add Feedback"
          : mode === "edit"
          ? "Edit Feedback"
          : "View Feedback"
      }
      onCancel={onCancel}
      onOk={handleOk}
      okText={mode === "view" ? "Close" : "Save"}
      cancelText={mode === "view" ? null : "Cancel"}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="feedbackID" label="FeedbackID" hidden={mode === "add"}>
          <Input disabled />
        </Form.Item>
        <Form.Item name="accountID" label="AccountID">
          <Input disabled={mode === "view"} />
        </Form.Item>
        <Form.Item name="productID" label="Product ID">
          <Input disabled={mode === "view"} />
        </Form.Item>
        <Form.Item name="productName" label="Product Name">
          <Input disabled={mode === "view"} />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea disabled={mode === "view"} />
        </Form.Item>
        <Form.Item
          name="rate"
          label="Rate"
          rules={[{ required: true, message: "Please enter a rate" }]}
        >
          <InputNumber disabled={mode === "view"} min={1} max={5} />
        </Form.Item>
        <Form.Item
          name="createDate"
          label="Create Date"
          hidden={mode === "add"}
        >
          <Input disabled />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FeedbackModal;
