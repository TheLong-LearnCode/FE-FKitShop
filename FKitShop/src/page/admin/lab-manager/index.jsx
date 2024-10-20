import React, { useState, useEffect } from 'react';
import { Button, Form, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getAllLab, createLab, updateLab, deleteLab } from '../../../service/labService';
import { getAllProducts } from '../../../service/productService';
import LabTable from './LabTable';
import LabModal from './LabModal';

const LabManager = () => {
  const [labs, setLabs] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingLabId, setEditingLabId] = useState(null);
  const [products, setProducts] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);

  useEffect(() => {
    fetchLabs();
    fetchProducts();
  }, []);

  const fetchLabs = async () => {
    const response = await getAllLab();
    setLabs(response);
  };

  const fetchProducts = async () => {
    const response = await getAllProducts();
    setProducts(response.data);
  };

  const showModal = () => {
    setIsModalVisible(true);
    setEditingLabId(null);
    form.resetFields();
  };

  const showEditModal = (record) => {
    setIsModalVisible(true);
    setEditingLabId(record.labID);
    form.setFieldsValue(record);
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach(key => formData.append(key, values[key]));
      if (uploadedFile) {
        formData.append("file", uploadedFile);
      }

      try {
        if (editingLabId) {
          await updateLab(formData, editingLabId);
          message.success('Lab updated successfully');
        } else {
          await createLab(formData);
          message.success('Lab created successfully');
        }
        fetchLabs();
        setIsModalVisible(false);
      } catch (error) {
        message.error('Operation failed');
      }
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async (labID) => {
    try {
      await deleteLab(labID);
      message.success('Lab deleted successfully');
      fetchLabs();
    } catch (error) {
      message.error('Failed to delete lab');
    }
  };

  const handleDownloadPDF = (fileName) => {
    console.log(`Downloading ${fileName}`);
    // Implement PDF download logic
  };

  const handleFileChange = (info) => {
    if (info.file.status === 'done') {
      setUploadedFile(info.file.originFileObj);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showModal}
        style={{ marginBottom: '20px' }}
      >
        Add New Lab
      </Button>
      <LabTable
        labs={labs}
        onEdit={showEditModal}
        onDelete={handleDelete}
        onDownloadPDF={handleDownloadPDF}
      />
      <LabModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        form={form}
        products={products}
        onFileChange={handleFileChange}
        editingLabId={editingLabId}
      />
    </div>
  );
};

export default LabManager;