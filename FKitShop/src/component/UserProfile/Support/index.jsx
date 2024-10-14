import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Pagination, Dropdown, Menu, Tabs, Input, message, Select, Image } from "antd";
import { MoreOutlined, UnorderedListOutlined } from "@ant-design/icons";
import {
  getSupportByAccountID,
  createSupport,
} from "../../../service/supportService";
import { getLabByProductID } from "../../../service/labService";
import { getOrdersByAccountID } from "../../../service/orderService";
import { getProductById } from "../../../service/productService";
import "./index.css";

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

export default function Support({ userInfo }) {
  const [supports, setSupports] = useState([]);
  const [filteredSupports, setFilteredSupports] = useState([]);
  const [selectedSupport, setSelectedSupport] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalType, setModalType] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const pageSize = 5;
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [labs, setLabs] = useState([]);
  const [selectedLabId, setSelectedLabId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (userInfo?.accountID) {
        // Fetch supports
        const supportResponse = await getSupportByAccountID(userInfo.accountID);
        setSupports(supportResponse.data.labSupports);
        setFilteredSupports(supportResponse.data.labSupports);
        
        // Fetch orders
        const orderResponse = await getOrdersByAccountID(userInfo.accountID);
        setOrders(orderResponse.data);
        
        // Extract unique products from orders and fetch product details
        const uniqueProductIds = new Set();
        orderResponse.data.forEach(order => {
          order.orderDetails.forEach(detail => {
            if (detail.isActive === 1) {
              uniqueProductIds.add(detail.productID);
            }
          });
        });

        const productDetails = await Promise.all(
          Array.from(uniqueProductIds).map(async (productId) => {
            const productResponse = await getProductById(productId);
            const product = productResponse.data;
            return {
              id: product.productID,
              name: product.name,
              image: product.images[0]?.url || 'default-image-url.jpg'
            };
          })
        );

        setProducts(productDetails);
      }
    };
    fetchData();
  }, [userInfo]);

  useEffect(() => {
    const fetchLabs = async () => {
      if (selectedProductId) {
        const labResponse = await getLabByProductID(selectedProductId);
        setLabs(labResponse.data);
      }
    };
    fetchLabs();
  }, [selectedProductId]);

  useEffect(() => {
    filterSupports(activeTab);
  }, [supports, activeTab]);

  const filterSupports = (status) => {
    if (status === "all") {
      setFilteredSupports(supports);
    } else {
      const statusIndex = ["received", "approved", "done"].indexOf(status);
      setFilteredSupports(
        supports.filter((support) => support.supporting.status === statusIndex)
      );
    }
    setCurrentPage(1);
  };

  const showModal = (type, support) => {
    setSelectedSupport(support);
    setModalType(type);
    setIsModalVisible(true);
    setModalContent("");
    setSelectedLabId(null);
    setSelectedProductId(null);
  };

  const handleOk = async () => {
    if (modalType === "Create a Support Request") {
      if (!selectedProductId) {
        message.error("Please select a product");
        return;
      }
      if (!selectedLabId) {
        message.error("Please select a lab");
        return;
      }
      try {
        await createSupport({
          accountID: userInfo.accountID,
          labID: selectedLabId,
          description: modalContent,
        });
        const response = await getSupportByAccountID(userInfo.accountID);
        setSupports(response.data.labSupports);
        message.success("Support request created successfully");
      } catch (error) {
        console.error("Error creating support:", error);
        message.error("Failed to create support request");
      }
    }
    setIsModalVisible(false);
    setModalContent("");
    setSelectedLabId(null);
    setSelectedProductId(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setModalContent("");
  };

  const menu = (record) => (
    <Menu>
      <Menu.Item
        key="viewDetail"
        onClick={() => showModal("View Detail", record)}
      >
        View Detail
      </Menu.Item>
      <Menu.Item
        key="createRequest"
        onClick={() => showModal("Create a Support Request", record)}
      >
        Create a Request Support
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "Lab Name",
      dataIndex: "labName",
      key: "labName",
    },
    {
      title: "Available Support",
      dataIndex: ["supporting", "countSupport"],
      key: "countSupport",
      render: (countSupport) => `#${5 - countSupport}`,
    },
    {
      title: "Request Date",
      dataIndex: ["supporting", "postDate"],
      key: "postDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Expected Date",
      dataIndex: ["supporting", "expectedSpDate"],
      key: "expectedSpDate",
      render: (date) => (date ? new Date(date).toLocaleDateString() : "Not Yet"),
    },
    {
      title: "Support Date",
      dataIndex: ["supporting", "supportDate"],
      key: "supportDate",
      render: (date) => (date ? new Date(date).toLocaleDateString() : "Not Yet"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Dropdown overlay={menu(record)} trigger={["hover"]}>
          <Button icon={<UnorderedListOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const indexOfLastSupport = currentPage * pageSize;
  const indexOfFirstSupport = indexOfLastSupport - pageSize;
  const currentSupports = filteredSupports.slice(
    indexOfFirstSupport,
    indexOfLastSupport
  );

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const showCreateSupportModal = () => {
    showModal("Create a Support Request", null);
  };

  return (
    <div className="support-container">
      <div className="support-header">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          className="custom-tabs"
        >
          <TabPane tab="All" key="all" />
          <TabPane tab="Received" key="received" />
          <TabPane tab="Approved" key="approved" />
          <TabPane tab="Done" key="done" />
        </Tabs>
      </div>
      {currentSupports.length > 0 ? (
        <Table
          columns={columns}
          dataSource={currentSupports}
          rowKey={(record) => record.supporting.supportingID}
          pagination={false}
        />
      ) : (
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <p>No support requests found.</p>
          <Button type="primary" onClick={showCreateSupportModal}>
            Create A Request Support
          </Button>
        </div>
      )}

      {currentSupports.length > 0 && (
        <div className="pagination-container">
          <Pagination
            current={currentPage}
            total={filteredSupports.length}
            pageSize={pageSize}
            onChange={onPageChange}
          />
        </div>
      )}

      <Modal
        title={modalType}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: "20%" }}
      >
        {modalType === "View Detail" && selectedSupport && (
          <div>
            <p>
              <strong>Lab ID:</strong> {selectedSupport.labID}
            </p>
            <p>
              <strong>Lab Name:</strong> {selectedSupport.labName}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {selectedSupport.supporting.description}
            </p>
            <p>
              <strong>Available Support:</strong>{" "}
              #{5 - selectedSupport.supporting.countSupport}
            </p>
            <p>
              <strong>Request Date:</strong>{" "}
              {new Date(
                selectedSupport.supporting.postDate
              ).toLocaleDateString()}
            </p>
            <p>
              <strong>Expected Date:</strong>{" "}
              {selectedSupport.supporting.expectedSpDate
                ? new Date(
                    selectedSupport.supporting.expectedSpDate
                  ).toLocaleDateString()
                : "Not Yet"}
            </p>
            <p>
              <strong>Support Date:</strong>{" "}
              {selectedSupport.supporting.supportDate
                ? new Date(
                    selectedSupport.supporting.supportDate
                  ).toLocaleDateString()
                : "Not Yet"}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color:
                    selectedSupport.supporting.status === 0
                      ? "#006d75"
                      : selectedSupport.supporting.status === 1
                      ? "blue"
                      : "green",
                    fontWeight: "bold",
                }}
              >
                {
                  ["Received", "Approved", "Done"][
                    selectedSupport.supporting.status
                  ]
                }
              </span>
            </p>
          </div>
        )}
        {modalType === "Create a Support Request" && (
          <>
            <Select
              style={{ width: '100%', marginBottom: '16px', height: '50px' }}
              placeholder="Select a product"
              onChange={(value) => {
                setSelectedProductId(value);
                setSelectedLabId(null); // Reset lab selection when product changes
              }}
              value={selectedProductId}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            >
              {products.map((product) => (
                <Option 
                  key={product.id} 
                  value={product.id}
                  style={{ padding: '10px', height: 'auto' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      style={{ width: 40, height: 40, marginRight: 10, objectFit: 'cover' }}
                    />
                    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {product.name}
                    </span>
                  </div>
                </Option>
              ))}
            </Select>
            <Select
              style={{ width: '100%', marginBottom: '16px', height: '50px' }}
              placeholder="Select a lab"
              onChange={(value) => setSelectedLabId(value)}
              value={selectedLabId}
              disabled={!selectedProductId}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            >
              {labs.map((lab) => (
                <Option 
                  key={lab.labID} 
                  value={lab.labID}
                  style={{ padding: '10px', height: 'auto' }}
                >
                  {lab.name}
                </Option>
              ))}
            </Select>
            <TextArea
              rows={4}
              value={modalContent}
              onChange={(e) => setModalContent(e.target.value)}
              placeholder="Enter your support request here..."
            />
          </>
        )}
      </Modal>
    </div>
  );
}
