import React from 'react';
import { Form, Input, Select, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const LabForm = ({ form, products, onFileChange }) => {
  return (
    <Form form={form} layout="vertical">
      <Form.Item name="productID" label="Product ID" rules={[{ required: true }]}>
        <Select>
          {products.map(product => (
            <Option key={product.productID} value={product.productID}>{product.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="level" label="Level" rules={[{ required: true }]}>
        <Select>
          <Option value="easy">Easy</Option>
          <Option value="medium">Medium</Option>
          <Option value="hard">Hard</Option>
        </Select>
      </Form.Item>
      <Form.Item name="fileNamePDF" label="PDF File">
        <Upload
          name="pdf"
          onChange={onFileChange}
          beforeUpload={() => false}
        >
          <Button icon={<UploadOutlined />}>Upload PDF</Button>
        </Upload>
      </Form.Item>
    </Form>
  );
};

export default LabForm;