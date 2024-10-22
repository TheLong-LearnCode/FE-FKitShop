import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Space,
  Radio,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  AccessibilityHelp,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  BlockToolbar,
  Bold,
  Code,
  CodeBlock,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  FullPage,
  GeneralHtmlSupport,
  Heading,
  HorizontalLine,
  HtmlComment,
  HtmlEmbed,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  PageBreak,
  Paragraph,
  PasteFromOffice,
  SelectAll,
  ShowBlocks,
  SimpleUploadAdapter,
  SourceEditing,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextPartLanguage,
  TextTransformation,
  Title,
  TodoList,
  Underline,
  Undo,
} from "ckeditor5";
import { getAllLab } from "../../../service/labService";
import {
  createLabGuide,
  deleteLabGuide,
  getAllLabGuide,
  getLabGuideByLabGuideID,
  getLabGuideByLabID,
  updateLabGuide,
  uploadImage,
} from "../../../service/labGuideService";

const { Option } = Select;

const LabGuideManager = () => {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const editorConfig = {
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "sourceEditing",
        "showBlocks",
        "textPartLanguage",
        "|",
        "heading",
        "|",
        "fontSize",
        "fontFamily",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "bold",
        "italic",
        "underline",
        "code",
        "|",
        "horizontalLine",
        "pageBreak",
        "link",
        "insertImage",
        "insertImageViaUrl",
        "mediaEmbed",
        "insertTable",
        "blockQuote",
        "codeBlock",
        "htmlEmbed",
        "|",
        "bulletedList",
        "numberedList",
        "todoList",
        "outdent",
        "indent",
      ],
      shouldNotGroupWhenFull: true,
    },
    plugins: [
      AccessibilityHelp,
      Autoformat,
      AutoImage,
      AutoLink,
      Autosave,
      BalloonToolbar,
      BlockQuote,
      BlockToolbar,
      Bold,
      Code,
      CodeBlock,
      Essentials,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      FullPage,
      GeneralHtmlSupport,
      Heading,
      HorizontalLine,
      HtmlComment,
      HtmlEmbed,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      MediaEmbed,
      PageBreak,
      Paragraph,
      PasteFromOffice,
      SelectAll,
      ShowBlocks,
      SimpleUploadAdapter,
      SourceEditing,
      // Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TextPartLanguage,
      TextTransformation,
      Title,
      TodoList,
      Underline,
      Undo,
    ],
    balloonToolbar: [
      "bold",
      "italic",
      "|",
      "link",
      "insertImage",
      "|",
      "bulletedList",
      "numberedList",
    ],
    blockToolbar: [
      "fontSize",
      "fontColor",
      "fontBackgroundColor",
      "|",
      "bold",
      "italic",
      "|",
      "link",
      "insertImage",
      "insertTable",
      "|",
      "bulletedList",
      "numberedList",
      "outdent",
      "indent",
    ],
    fontFamily: {
      supportAllValues: true,
    },
    fontSize: {
      options: [10, 12, 14, "default", 18, 20, 22],
      supportAllValues: true,
    },
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
        {
          model: "heading4",
          view: "h4",
          title: "Heading 4",
          class: "ck-heading_heading4",
        },
        {
          model: "heading5",
          view: "h5",
          title: "Heading 5",
          class: "ck-heading_heading5",
        },
        {
          model: "heading6",
          view: "h6",
          title: "Heading 6",
          class: "ck-heading_heading6",
        },
      ],
    },
    htmlSupport: {
      allow: [
        {
          name: /^.*$/,
          styles: true,
          attributes: true,
          classes: true,
        },
      ],
    },
    image: {
      toolbar: [
        "toggleImageCaption",
        "imageTextAlternative",
        "|",
        "imageStyle:inline",
        "imageStyle:wrapText",
        "imageStyle:breakText",
        "|",
        "resizeImage",
      ],
    },
    // initialData: content,
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: "https://",
      decorators: {
        toggleDownloadable: {
          mode: "manual",
          label: "Downloadable",
          attributes: {
            download: "file",
          },
        },
      },
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    menuBar: {
      isVisible: true,
    },
    placeholder: "Type or paste your content here!",
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "tableProperties",
        "tableCellProperties",
      ],
    },
  };

  const [labGuides, setLabGuides] = useState([]);
  const [labs, setLabs] = useState([]);
  const [selectedLabID, setSelectedLabID] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingGuideId, setEditingGuideId] = useState(null);
  const [content, setContent] = useState("");
  const [isViewMode, setIsViewMode] = useState(false);
  const [labID, setLabID] = useState(null);

  useEffect(() => {
    fetchLabs();
    fetchLabGuides();
  }, []);

  const editorConfiguration = {
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "imageUpload", // Thêm nút tải ảnh
      "codeBlock", // Thêm nút code block
      "|",
      "undo",
      "redo",
    ],
    // Các plugin bạn muốn sử dụng
    extraPlugins: [uploadPlugin], // Nếu bạn có plugin upload tùy chỉnh
  };

  const fetchAllLabGuides = async () => {
    const response = await getAllLabGuide();
    setLabGuides(response.data);
  };

  const fetchLabGuides = async (labID) => {
    if (!labID || labID === "all") {
      fetchAllLabGuides(); // fetch all lab guides if "All" is selected
      return;
    }
    // API call to fetch lab guides by labID
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
    { title: "Lab Guide ID", dataIndex: "labGuideID", key: "labGuideID" },
    // { title: "Lab ID", dataIndex: "selectedLabID", key: "selectedLabID" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Step", dataIndex: "step", key: "step" },
    {
      title: "Integrated",
      dataIndex: "isUsed",
      key: "isUsed",
      render: (isUsed) => (isUsed === 1 ? "Yes" : "No"),
    },
    // { title: "Content", dataIndex: "content", key: "content", render: (content) => content.slice(0, 50) + '...' },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button
            icon={<EyeOutlined />}
            onClick={() =>
              selectedLabID === "all"
                ? message.error("Please select a labID")
                : handleView(record.labGuideID)
            }
          >
            {/* View */}
          </Button>
          <Button icon={<EditOutlined />} onClick={() => showEditModal(record)}>
            {/* Edit */}
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() =>
              Modal.confirm({
                title: "Are you sure you want to delete this lab guide?",
                content: "This action cannot be undone.",
                onOk() {
                  handleDelete(record.labGuideID);
                },
              })
            }
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

    let selectedLab = selectedLabID;

    if (!selectedLabID || selectedLabID === "all") {
      // Find the correct labID corresponding to the labGuideID
      selectedLab = labs.find((lab) =>
        lab.labGuides.some((guide) => guide.labGuideID === record.labGuideID)
      )?.labID;

      if (selectedLab) {
        setSelectedLabID(selectedLab);
      }
    }

    // Set form values after fetching the correct labID and record details
    form.setFieldsValue({
      labID: selectedLab,
      description: record.description,
      content: record.content,
      isUsed: record.isUsed,
    });

    setContent(record.content || "");
  };

  //khi thay đổi labID ở dropdown thì fetchLabGuides
  const handleLabChange = (value) => {
    console.log("VALUE", value);
    setSelectedLabID(value);
    if (value === "all") {
      fetchAllLabGuides();
    } else {
      fetchLabGuides(value);
    }
  };

  const handleView = async (labGuideID) => {
    try {
      const response = await getLabGuideByLabGuideID(labGuideID);
      setIsModalVisible(true);
      setIsViewMode(true); // Bật chế độ chỉ xem
      const labGuide = response.data;

      // Tìm lab tương ứng với labGuideID
      const selectedLab = labs.find((lab) =>
        lab.labGuides.some((guide) => guide.labGuideID === labGuideID)
      );

      // Đặt labID và description cho form
      form.setFieldsValue({
        labID: selectedLab ? selectedLab.labID : null, // Đặt giá trị labID vào form
        description: labGuide.description,
        isUsed: labGuide.isUsed,
      });

      setContent(labGuide.content); // Đặt giá trị content
    } catch (error) {
      message.error("Failed to fetch lab guide details");
    }
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      const data = { ...values, content };
      if (editingGuideId) {
        // API call to update lab guide
        try {
          const response = await updateLabGuide(editingGuideId, data);
          message.success(response.message);
          fetchLabGuides(selectedLabID);
        } catch (error) {
          message.error(error.response.data.message);
        }
      } else {
        try {
          const response = await createLabGuide(data);
          message.success(response.message);
          fetchLabGuides(selectedLabID);
        } catch (error) {
          message.error("Failed to create lab guide");
        }
      }
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsViewMode(false); // Tắt chế độ xem khi đóng Modal
  };

  const handleDelete = async (labGuideID) => {
    try {
      // API call to delete lab guide
      console.log("LAB GUIDE ID", labGuideID);
      const response = await deleteLabGuide(labGuideID);
      message.success(response.message);
      fetchLabGuides(selectedLabID);
    } catch (error) {
      console.log("ERROR", error);
      message.error("Failed to delete lab guide");
    }
  };

  const uploadAdapter = (loader) => {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          loader.file.then(async (file) => {
            try {
              const imageUrl = await uploadImage(file);
              resolve({ default: imageUrl }); // Use the uploaded image URL
            } catch (error) {
              reject(error);
            }
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
              <Option value="all">All</Option>
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
      <Table
        columns={columns}
        dataSource={labGuides}
        rowKey="labGuideID"
        style={{ textAlign: "center" }}
        pagination={{ pageSize: 5 }}
      />
      {/* -------------------------------Modal----------------------------------- */}
      <Modal
        title={
          isViewMode
            ? "View Lab Guide"
            : editingGuideId
            ? "Edit Lab Guide"
            : "Add New Lab Guide"
        }
        visible={isModalVisible}
        onOk={isViewMode ? handleCancel : handleOk} // Nếu ở chế độ xem, chỉ có thể bấm "Cancel"
        onCancel={handleCancel}
        width={"100%"}
        bodyStyle={{ height: "450px", overflow: "auto" }}
        className="modal-content"
        footer={
          isViewMode
            ? [
                <Button key="close" onClick={handleCancel}>
                  Close
                </Button>,
              ]
            : undefined
        }
      >
        <Form form={form} layout="vertical">
          <Form.Item name="labID" label="Lab ID" rules={[{ required: true }]}>
            <Select disabled={isViewMode}>
              {/* Select không thể chỉnh sửa trong chế độ view */}
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
            <Input.TextArea disabled={isViewMode} />
          </Form.Item>

          <Form.Item label="Content" required>
            <div className="editor-container__editor">
              <div ref={editorRef}>
                {isLayoutReady && (
                  <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    config={editorConfig}
                    onChange={(event, editor) => {
                      if (!isViewMode) {
                        const data = editor.getData();
                        setContent(data);
                      }
                    }}
                  />
                )}
              </div>
            </div>

            {/* <CKEditor
              editor={ClassicEditor}
              data={content}
              onChange={(event, editor) => {
                if (!isViewMode) {
                  const data = editor.getData();
                  setContent(data);
                }
              }}
              config={editorConfiguration}
              disabled={isViewMode} // CKEditor sẽ không cho chỉnh sửa nếu ở chế độ xem
            /> */}
          </Form.Item>
        </Form>
      </Modal>
      {/* -------------------------------Modal----------------------------------- */}
    </div>
  );
};

export default LabGuideManager;
