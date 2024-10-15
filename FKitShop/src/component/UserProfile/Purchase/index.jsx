// ProfileInformation.js
import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Image,
  Dropdown,
  Menu,
  Modal,
  Input,
  message,
} from "antd";
import {
  UnorderedListOutlined,
  RollbackOutlined
} from "@ant-design/icons";
import './index.css';
import {
  getOrdersByAccountID,
  getOrderDetailsByOrderID,
} from "../../../service/orderService";
import { getProductById } from "../../../service/productService";
import { createSupport } from "../../../service/supportService";
import { formatCurrency } from "../../../util/CurrencyUnit";
import { getLabByAccountID } from "../../../service/labService";

const { TextArea } = Input;

export default function Purchase({ userInfo }) {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [showOrderList, setShowOrderList] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (userInfo?.accountID) {
        const response = await getOrdersByAccountID(userInfo.accountID);
        setOrders(response.data);
      }
    };
    fetchOrders();
  }, [userInfo]);

  const showOrderDetails = async (orderId) => {
    const details = await getOrderDetailsByOrderID(orderId);
    const detailsWithImages = await Promise.all(
      details.data.map(async (detail) => {
        const product = await getProductById(detail.productID);
        return {
          ...detail,
          image: product.data.images[0]?.url,
        };
      })
    );
    setOrderDetails(detailsWithImages);
    setSelectedOrder(orders.find((order) => order.orders.ordersID === orderId));
    setShowOrderList(false);
  };

  const backToOrderList = () => {
    setSelectedOrder(null);
    setOrderDetails([]);
    setShowOrderList(true);
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: ["orders", "ordersID"],
      key: "ordersID",
    },
    {
      title: "Order Date",
      dataIndex: ["orders", "orderDate"],
      key: "orderDate",
    },
    {
      title: "Paying Method",
      dataIndex: ["orders", "payingMethod"],
      key: "payingMethod",
    },
    {
      title: "Total Price",
      dataIndex: ["orders", "totalPrice"],
      key: "totalPrice",
      render: (price) => formatCurrency(price),
    },
    {
      title: "Status",
      dataIndex: ["orders", "status"],
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => showOrderDetails(record.orders.ordersID)}>
          View
        </Button>
      ),
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);

  const showModal = (type, productId) => {
    setModalType(type);
    setSelectedProductId(productId);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (modalType === "Support") {
      try {
        const res = await getLabByAccountID(userInfo.accountID);
        const orderLabs = res.data.orderLabs;

        // Lọc ra các lab có productID trùng với selectedProductId
        const matchingLabs = orderLabs.filter(
          (order) => order.lab.productID === selectedProductId
        );

        // Lấy ra các labID
        const labIDs = matchingLabs.map((lab) => lab.lab.labID);

        console.log("Matching Lab IDs:", labIDs);

        // Nếu có ít nhất một labID phù hợp, sử dụng labID đầu tiên
        if (labIDs.length > 0) {
          const response = await createSupport({
            accountID: userInfo.accountID,
            labID: labIDs[0],
            description: modalContent,
          });
          console.log("RESPONSE", response);
          
          message.success("Support request created successfully");
        } else {
          message.error(
            "No matching lab found for this product. This is a component, not a kit"
          );
        }
      } catch (error) {
        console.error("Error creating support request:", error);
        message.error("Failed to create support request");
      }
    } else {
      // Handle Question submission here
      message.info("Question submission not implemented yet");
    }
    setIsModalVisible(false);
    setModalContent("");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setModalContent("");
  };

  const menu = (productId) => (
    <Menu>
      <Menu.SubMenu key="support" title="Support">
        <Menu.Item key="supportView">View</Menu.Item>
        <Menu.Item
          key="supportNew"
          onClick={() => showModal("Support", productId)}
        >
          New
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="question" title="Question">
        <Menu.Item key="questionView">View</Menu.Item>
        <Menu.Item
          key="questionNew"
          onClick={() => showModal("Question", productId)}
        >
          New
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

  const detailColumns = [
    {
      title: "Product",
      dataIndex: "image",
      key: "image",
      render: (image) => <Image src={image} width={50} />,
    },
    {
      title: "Product ID",
      dataIndex: "productID",
      key: "productID",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => formatCurrency(price),
    },
    {
      title: "Total",
      key: "total",
      render: (_, record) => formatCurrency(record.price * record.quantity),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Dropdown overlay={menu(record.productID)} trigger={["click"]}>
          <Button icon={<UnorderedListOutlined />} />
        </Dropdown>
      ),
    },
  ];

  // Thêm state cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4; // Số sản phẩm mỗi trang

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  return (
    <div style={{ marginTop: "-10px" }}>
      {showOrderList ? (
        <Table
          columns={columns}
          dataSource={orders}
          rowKey={(record) => record.orders.ordersID}
        />
      ) : (
        <div>
          <Button
            icon={<RollbackOutlined />}
            onClick={backToOrderList}
            style={{ marginBottom: 16 }}
          />
          {/* <h3>Order Details</h3> */}
          <p>
            <strong>Order ID:</strong> {selectedOrder.orders.ordersID}
          </p>
          <p>
            <strong>Address:</strong> {selectedOrder.orders.address},{" "}
            {selectedOrder.orders.ward}, {selectedOrder.orders.district},{" "}
            {selectedOrder.orders.province}
          </p>
          <p>
            <strong>Status:</strong> {selectedOrder.orders.status}
          </p>
          <Table
            columns={detailColumns}
            dataSource={orderDetails}
            rowKey="orderDetailsID"
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: orderDetails.length,
              showSizeChanger: false,
            }}
            onChange={handleTableChange}
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
        <TextArea
          rows={4}
          value={modalContent}
          onChange={(e) => setModalContent(e.target.value)}
          placeholder={`Enter your ${modalType.toLowerCase()} here...`}
        />
      </Modal>
    </div>
  );
}
