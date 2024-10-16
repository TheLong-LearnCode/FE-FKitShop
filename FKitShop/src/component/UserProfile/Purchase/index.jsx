// ProfileInformation.js
import React, { useEffect, useState } from "react";
import { message } from "antd";
import './index.css';
import {
  getOrdersByAccountID,
  getOrderDetailsByOrderID,
} from "../../../service/orderService";
import { getProductById } from "../../../service/productService";
import { createSupport } from "../../../service/supportService";
import { getLabByAccountID } from "../../../service/labService";
import OrderTabs from './OrderTabs';
import OrderList from './OrderList';
import OrderDetails from './OrderDetails';
import SupportModal from './SupportModal';

export default function Purchase({ userInfo }) {
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [showOrderList, setShowOrderList] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [tabCounts, setTabCounts] = useState({
    all: 0,
    pending: 0,
    processing: 0,
    delivering: 0,
    delivered: 0,
    canceled: 0
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  useEffect(() => {
    const fetchOrders = async () => {
      if (userInfo?.accountID) {
        const response = await getOrdersByAccountID(userInfo.accountID);
        setAllOrders(response.data);
        setFilteredOrders(response.data);
        
        const counts = {
          all: response.data.length,
          pending: 0,
          processing: 0,
          delivering: 0,
          delivered: 0,
          canceled: 0
        };
        
        response.data.forEach(order => {
          const status = order.orders.status.toLowerCase();
          if (counts.hasOwnProperty(status)) {
            counts[status]++;
          } else {
            console.log(`Unexpected status: ${status}`);
          }
        });
        
        console.log("Tab counts:", counts);
        setTabCounts(counts);
      }
    };
    fetchOrders();
  }, [userInfo]);

  const handleTabChange = (key) => {
    setActiveTab(key);
    if (key === 'all') {
      setFilteredOrders(allOrders);
    } else {
      const filtered = allOrders.filter(order => order.orders.status.toLowerCase() === key);
      setFilteredOrders(filtered);
    }
  };

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
    setSelectedOrder(allOrders.find((order) => order.orders.ordersID === orderId));
    setShowOrderList(false);
  };

  const backToOrderList = () => {
    setSelectedOrder(null);
    setOrderDetails([]);
    setShowOrderList(true);
  };

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
        const matchingLabs = orderLabs.filter(
          (order) => order.lab.productID === selectedProductId
        );
        const labIDs = matchingLabs.map((lab) => lab.lab.labID);
        console.log("Matching Lab IDs:", labIDs);
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
      message.info("Question submission not implemented yet");
    }
    setIsModalVisible(false);
    setModalContent("");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setModalContent("");
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  return (
    <div style={{ marginTop: "-10px" }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        {console.log("Current tabCounts before rendering OrderTabs:", tabCounts)}
        <OrderTabs activeTab={activeTab} tabCounts={tabCounts} onTabChange={handleTabChange} />
      </div>

      {showOrderList ? (
        <OrderList filteredOrders={filteredOrders} showOrderDetails={showOrderDetails} />
      ) : (
        <OrderDetails
          selectedOrder={selectedOrder}
          orderDetails={orderDetails}
          backToOrderList={backToOrderList}
          showModal={showModal}
          currentPage={currentPage}
          pageSize={pageSize}
          handleTableChange={handleTableChange}
        />
      )}

      <SupportModal
        isModalVisible={isModalVisible}
        modalType={modalType}
        modalContent={modalContent}
        handleOk={handleOk}
        handleCancel={handleCancel}
        setModalContent={setModalContent}
      />
    </div>
  );
}
