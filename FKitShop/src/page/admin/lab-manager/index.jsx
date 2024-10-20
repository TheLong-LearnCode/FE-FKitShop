import React, { useState, useEffect } from "react";
import { Button, Form, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  getAllLab,
  createLab,
  updateLab,
  deleteLab,
} from "../../../service/labService";
import { getAllProducts } from "../../../service/productService";
import LabTable from "./LabTable";
import LabModal from "./LabModal";
import { downloadMyLab } from "../../../service/userService";

const LabManager = () => {
  const [labs, setLabs] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingLabId, setEditingLabId] = useState(null);
  const [products, setProducts] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [currentFileName, setCurrentFileName] = useState(null);

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
    setCurrentFileName(record.fileNamePDF);
    form.setFieldsValue(record);
  };

  // const handleOk = () => {
  //   form.validateFields().then(async (values) => {
  //     const formData = new FormData();
  //     Object.keys(values).forEach((key) => {
  //       if (key === "file" && values[key]) {
  //         formData.append(key, values[key][0].originFileObj);
  //       } else {
  //         formData.append(key, values[key]);
  //       }
  //     });

  //     try {
  //       if (editingLabId) {
  //         await updateLab(formData, editingLabId);
  //         message.success("Lab updated successfully");
  //       } else {
  //         await createLab(formData);
  //         message.success("Lab created successfully");
  //       }

  //       // Fetch updated labs list
  //       fetchLabs();

  //       // Clear form fields and file state after success
  //       form.resetFields(); // This will clear all the fields including 'file'
  //       setUploadedFile(null); // Reset uploaded file state
  //       setCurrentFileName(null); // Clear current file name
  //       setIsModalVisible(false); // Close the modal
  //     } catch (error) {
  //       message.error("Operation failed: " + error.message);
  //     }
  //   });
  // };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        if (key === 'file' && values[key]) {
          formData.append(key, values[key][0].originFileObj);
        } else {
          formData.append(key, values[key]);
        }
      });
  
      try {
        if (editingLabId) {
          await updateLab(formData, editingLabId);
          message.success('Lab updated successfully');
        } else {
          await createLab(formData);
          message.success('Lab created successfully');
        }
  
        // Fetch updated labs list
        fetchLabs();
        
        // Reset the form fields, file state, and modal visibility
        form.resetFields();  // Reset all form fields
        setUploadedFile(null);  // Clear uploaded file
        setCurrentFileName(null);  // Clear current file name
        setIsModalVisible(false);  // Close the modal
      } catch (error) {
        message.error('Operation failed: ' + error.message);
      }
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async (labID) => {
    try {
      await deleteLab(labID);
      message.success("Lab deleted successfully");
      fetchLabs();
    } catch (error) {
      message.error("Failed to delete lab");
    }
  };

  const handleDownloadPDF = async (fileName) => {
    console.log(`Downloading ${fileName}`);
    // Implement PDF download logic
  };

  // const handleFileChange = (info) => {
  //   if (info.file.status === "done") {
  //     setUploadedFile(info.file.originFileObj);
  //     message.success(`${info.file.name} file uploaded successfully`);
  //   } else if (info.file.status === "error") {
  //     setUploadedFile(null);
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
  // };

  const handleFileChange = (info) => {
    if (info.file.status === 'removed') {
      setUploadedFile(null);
      message.success(`File removed successfully`);
    } else if (info.file.status === 'done') {
      setUploadedFile(info.file.originFileObj);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      setUploadedFile(null);
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showModal}
        style={{ marginBottom: "20px" }}
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
        currentFileName={currentFileName}
        uploadedFile={uploadedFile}
      />
    </div>
  );
};

export default LabManager;
