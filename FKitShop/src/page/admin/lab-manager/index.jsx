import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Space,
  Upload,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { createLab, getAllLab, uploadLab } from "../../../service/labService";
import { getAllProducts } from "../../../service/productService";
import {
  getAllLabGuide,
  getLabGuideByLabID,
} from "../../../service/labGuideService";

const { Option } = Select;

const LabManager = () => {
  const [labs, setLabs] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingLabId, setEditingLabId] = useState(null);
  const [products, setProducts] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null); // Lưu file đã upload
  const [labGuides, setLabGuides] = useState([]); // State to hold lab guides
  const [labGuideByLabID, setLabGuideByLabID] = useState([]); // State to hold lab guides

  const [isMergeModalVisible, setIsMergeModalVisible] = useState(false); // New state for merge modal
  const [selectedLabGuideIDs, setSelectedLabGuideIDs] = useState([]); // State to hold selected lab guide IDs

  const [selectedLabID, setSelectedLabID] = useState(null); // State to hold selected lab ID
  const [labGuideOptions, setLabGuideOptions] = useState([]); // State to hold lab guide options based on selected lab

  useEffect(() => {
    fetchProducts();
    fetchAllLabs();
  }, []);

  const fetchAllLabGuides = async () => {
    const response = await getAllLabGuide(); // Fetch lab guides
    setLabGuides(response.data);
  };

  const fetchLabGuidesByLabID = async (labID) => {
    const response = await getLabGuideByLabID(labID); // Fetch lab guides
    setLabGuideByLabID(response.data);
  };

  const fetchAllLabs = async () => {
    // API call to fetch labs
    const response = await getAllLab();
    setLabs(response);
  };

  const fetchProducts = async () => {
    // API call to fetch products
    const response = await getAllProducts();
    setProducts(response.data);
  };
  //--------------------------------------------------
  const fetchLabGuidesForLab = async (labID) => {
    try {
      const response = await getLabGuideByLabID(labID); // Fetch lab guides for the selected lab
      console.log("FETCH LAB GUIDES FOR LAB: ", response.data.labGuides); // Check the structure of the response
      setLabGuideOptions(response.data.labGuides); // Set the options for lab guides
    } catch (error) {
      message.error(error.response.data.message);
    }
  };
  const handleLabIDChange = (value) => {
    setSelectedLabID(value); // Update selected lab ID
    fetchLabGuidesForLab(value); // Fetch lab guides for the selected lab ID
  };
  //--------------------------------------------------

  const columns = [
    { title: "Lab ID", dataIndex: "labID", key: "labID" },
    { title: "Product ID", dataIndex: "productID", key: "productID" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Level", dataIndex: "level", key: "level" },
    {
      title: "Create Date",
      dataIndex: "createDate",
      key: "createDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "PDF File",
      dataIndex: "fileNamePDF",
      key: "fileNamePDF",
      render: (fileName) =>
        fileName ? (
          //render tên filename
          <Space align="baseline">
            <p>
              {fileName.length > 10
                ? `${fileName.substring(0, 10)}...`
                : fileName}
            </p>
            <Button
              icon={<DownloadOutlined />}
              onClick={() => handleDownloadPDF(fileName)}
            ></Button>
          </Space>
        ) : (
          "N/A"
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button icon={<EditOutlined />} onClick={() => showEditModal(record)}>
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.labID)}
            danger
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const showMergeModal = () => {
    setIsMergeModalVisible(true);
    fetchAllLabGuides(); // Fetch lab guides when opening the modal
    fetchAllLabs();
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
      if (uploadedFile) {
        values.fileNamePDF = uploadedFile.name; // Sử dụng tên file đã upload
      }
      if (editingLabId) {
        // API call to update lab
      } else {
        try {
          const response = await createLab(values);
          if (response.status === 1000) {
            message.success("Lab created successfully");
            fetchAllLabs();
          }
        } catch (error) {
          message.error("Failed to create lab");
        }
      }
      setIsModalVisible(false);
    });
  };

  const handleMerge = async () => {
    const labGuideIDs = selectedLabGuideIDs.join(","); // Convert array to comma-separated string
    try {
      const response = await axios.post(
        `http://localhost:8080/fkshop/lab/pdf/create/${selectedLabID}`,
        { labGuideIDs }
      );
      if (response.data.status === 1000) {
        message.success("Lab guides merged successfully");
        setIsMergeModalVisible(false);
        setSelectedLabID(null); // Reset selected lab ID
        setSelectedLabGuideIDs([]); // Reset selected lab guide IDs
        setLabGuideOptions([]); // Reset lab guide options
      }
    } catch (error) {
      message.error("Failed to merge lab guides");
    }
  };

  const handleLabGuideSelect = (selectedIds) => {
    setSelectedLabGuideIDs(selectedIds); // Store selected lab guide IDs
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsMergeModalVisible(false);
  };

  const handleDelete = async (labID) => {
    try {
      // API call to delete lab
      message.success("Lab deleted successfully");
      fetchAllLabs();
    } catch (error) {
      message.error("Failed to delete lab");
    }
  };

  const handleDownloadPDF = (fileName) => {
    // Implement logic to download PDF here
    console.log(`Downloading ${fileName}`);
    // You might want to call an API endpoint to get the file
  };

  const handleFileChange = (info) => {
    if (info.file.status === "done") {
      setUploadedFile(info.file.originFileObj); // Lưu file khi upload thành công
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lab Manager</h1>
      <Space style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
          style={{ marginBottom: "20px" }}
        >
          Add New Lab
        </Button>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showMergeModal}
          style={{ marginBottom: "20px" }}
        >
          Merge Lab Guide
        </Button>
      </Space>
      <Table columns={columns} dataSource={labs} rowKey="labID" />
      <Modal
        title={editingLabId ? "Edit Lab" : "Add New Lab"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ marginTop: "-6%" }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="productID"
            label="Product ID"
            rules={[{ required: true }]}
          >
            <Select>
              {products.map((product) => (
                <Option key={product.productID} value={product.productID}>
                  {product.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="level" label="Level" rules={[{ required: true }]}>
            <Select>
              <Option value="easy">Easy</Option>
              <Option value="medium">Medium</Option>
              <Option value="hard">Hard</Option>
            </Select>
          </Form.Item>
          {/* <Form.Item name="createDate" label="Create Date">
            <Input type="date" />
          </Form.Item> */}
          <Form.Item name="fileNamePDF" label="PDF File">
            <Upload
              name="pdf"
              //action={uploadLab()}
              onChange={handleFileChange}
            >
              <Button icon={<UploadOutlined />}>Upload PDF</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* Merge Lab Guide Modal */}
      <Modal
        title="Merge Lab Guide"
        visible={isMergeModalVisible}
        onOk={handleMerge}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item label="Select Lab ID">
            <Select onChange={handleLabIDChange} placeholder="Select a lab">
              {labs.map((lab) => (
                <Option key={lab.labID} value={lab.labID}>
                  {lab.labID} - {lab.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Select Lab Guides">
            <Select
              mode="multiple"
              placeholder="Select lab guides to merge"
              onChange={handleLabGuideSelect}
              disabled={!selectedLabID} // Disable if no lab ID is selected
            >
              {labGuideOptions.map((guide) => (
                <Option key={guide.labGuideID} value={guide.labGuideID}>
                  {guide.labGuideID} - {guide.description}{" "}
                  {/* Adjust display to show labGuideID and description */}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LabManager;
