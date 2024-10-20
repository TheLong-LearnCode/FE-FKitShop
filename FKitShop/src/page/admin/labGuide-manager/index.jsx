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
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
// import Editor from "ckeditor5/build";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getAllLab } from "../../../service/labService";
import {
  createLabGuide,
  getLabGuideByLabID,
  updateLabGuide,
} from "../../../service/labGuideService";

const { Option } = Select;

const LabGuideManager = () => {
  const [labGuides, setLabGuides] = useState([]);
  const [labs, setLabs] = useState([]);
  const [selectedLabID, setSelectedLabID] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingGuideId, setEditingGuideId] = useState(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchLabs();
    fetchLabGuides();
  }, []);

  const fetchLabGuides = async (labID) => {
    // API call to fetch lab guides
    const response = await getLabGuideByLabID(labID);
    console.log("RESPONSE", response);
    setLabGuides(response.data.labGuides);
    setSelectedLabID(labID);
  };

  const fetchLabs = async () => {
    // API call to fetch labs
    const response = await getAllLab();
    setLabs(response);
  };

  const columns = [
    { title: "Lab Guide ID", dataIndex: "labGuideID", key: "labGuideID",  },
    // { title: "Lab ID", dataIndex: "selectedLabID", key: "selectedLabID" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Step", dataIndex: "step", key: "step" },
    // { title: "Content", dataIndex: "content", key: "content", render: (content) => content.slice(0, 50) + '...' },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button icon={<EditOutlined />} onClick={() => showEditModal(record)}>
            {/* Edit */}
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.labGuideID)}
            danger
          >
            {/* Delete */}
          </Button>
        </Space>
      ),
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
    setEditingGuideId(null);
    form.resetFields();
    setContent("");
  };

  const showEditModal = async (record) => {
    setIsModalVisible(true);
    setEditingGuideId(record.labGuideID);
    form.setFieldsValue({
      labID: selectedLabID,
      description: record.description,
      //content: record.content,
    });
    console.log("LAB ID", selectedLabID);
    try {
      console.log("RECORD có labID là: ", record.labID);
      const LabID = selectedLabID;
      const response = await getLabGuideByLabID(LabID);
      console.log("RESPONSE123", response);
      setSelectedLabID(response.data.labID);
      setContent(
        response.data.labGuides.find(
          (guide) => guide.labGuideID === record.labGuideID
        )?.content || ""
      );
    } catch (error) {
      console.log("ERROR", error);

      message.error("Failed to fetch lab guide content");
    }
  };
  //khi thay đổi labID ở dropdown thì fetchLabGuides
  const handleLabChange = (value) => {
    console.log("VALUE", value);
    setSelectedLabID(value);
    fetchLabGuides(value);
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      const data = { ...values, content };
      if (editingGuideId) {
        // API call to update lab guide
        try {
          const response = await updateLabGuide(editingGuideId, data);
          message.success("Lab guide updated successfully");
          fetchLabGuides(selectedLabID);
        } catch (error) {
          message.error(error.response.data.message);
        }
      } else {
        try {
          const response = await createLabGuide(data);
          if (response.data.status === 1000) {
            message.success("Lab guide created successfully");
            fetchLabGuides(selectedLabID);
          }
        } catch (error) {
          message.error("Failed to create lab guide");
        }
      }
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async (labGuideID) => {
    try {
      // API call to delete lab guide
      message.success("Lab guide deleted successfully");
      fetchLabGuides(selectedLabID);
    } catch (error) {
      message.error("Failed to delete lab guide");
    }
  };

  const uploadAdapter = (loader) => {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          loader.file.then((file) => {
            console.log("file", file);
            const formData = new FormData();

            formData.append("file", file);
            console.log("formData in uploadAdapter", formData);
            axios
              .post("http://localhost:8080/fkshop/lab/upload-img", formData)
              .then((response) => {
                resolve({ default: response.data.url });
              })
              .catch((error) => {
                reject(error);
              });
          });
        });
      },
    };
  };

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  return (
    //-------------------------------Main Page-----------------------------------
    <div style={{ padding: "20px" }}>
      <h1>Lab Guide Manager</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          verticalAlign: "middle",
        }}
      >
        <div style={{ flex: "1", marginRight: "40%" }}>
          <Form.Item name="labID" label="Lab ID" rules={[{ required: true }]}>
            <Select onChange={handleLabChange}>
              {labs.map((lab) => (
                <Option key={lab.labID} value={lab.labID}>
                  {lab.labID} - {lab.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div style={{ flex: "0" }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showModal}
            style={{ marginBottom: "10px" }}
          >
            Add New Lab Guide
          </Button>
        </div>
      </div>
      <Table columns={columns} dataSource={labGuides} rowKey="labGuideID" style={{ textAlign: "center" }} />
      {/* -------------------------------Modal----------------------------------- */}
      <Modal
        title={editingGuideId ? "Edit Lab Guide" : "Add New Lab Guide"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"70%"}
        bodyStyle={{ height: "450px", overflow: "auto" }}
      >
        <Form form={form} layout="vertical">
          <Form.Item 
            name="labID" 
            label="Lab ID" 
            rules={[{ required: true }]}
          >
            <Select disabled={!!editingGuideId}>
              {labs.map((lab) => (
                <Option key={lab.labID} value={lab.labID}>
                  {lab.labID} - {lab.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Content" required>
            <CKEditor
              editor={ClassicEditor}
              data={content}
              onChange={(event, editor) => {
                const data = editor.getData();
                setContent(data);
              }}
              config={{
                extraPlugins: [uploadPlugin],
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
      {/* -------------------------------Modal----------------------------------- */}
    </div>
  );
};

export default LabGuideManager;
