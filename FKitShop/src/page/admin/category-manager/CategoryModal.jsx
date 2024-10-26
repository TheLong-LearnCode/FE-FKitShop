import React, { useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';

const { Option } = Select;

const CategoryModal = ({ visible, mode, category, onCancel, onOk }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (category && (mode === 'edit' || mode === 'view')) {
      form.setFieldsValue(category);
    } else {
      form.resetFields();
    }
  }, [category, mode, form]);

  const handleOk = () => {
    if (mode === 'view') {
      onCancel();
      return;
    }
    form.validateFields().then(values => {
      onOk(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      visible={visible}
      title={mode === 'add' ? 'Add Category' : mode === 'edit' ? 'Edit Category' : 'View Category'}
      onCancel={onCancel}
      onOk={handleOk}
      okText={mode === 'view' ? 'Close' : 'Save'}
      cancelText={mode === 'view' ? null : 'Cancel'}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="categoryID" label="CategoryID">
          <Input disabled />
        </Form.Item>
        <Form.Item name="tagID" label="Select Tag" rules={[{ required: true }]}>
          <Select disabled={mode === 'view'}>
            {category?.map(category => (
              <Select.Option key={category.categoryID} value={category.tagID}>
                {category.tagID}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="categoryName" label="Category Name" rules={[{ required: true }]}>
          <Input disabled={mode === 'view'} />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea disabled={mode === 'view'} />
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Select disabled={mode === 'view'}>
            <Option value="1">Active</Option>
            <Option value="0">Inactive</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryModal;
