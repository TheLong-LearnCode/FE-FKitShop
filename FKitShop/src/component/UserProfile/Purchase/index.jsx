// ProfileInformation.js
import React, { useEffect, useState, useCallback } from "react";
import { message, Modal } from "antd";
import { useNavigate, useParams } from 'react-router-dom';
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
  const [isSupportModalVisible, setIsSupportModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchOrders = useCallback(async () => {
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
        }
      });
      
      setTabCounts(counts);
    }
  }, [userInfo]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    if (id) {
      const orderId = id.split('=')[1];
      showOrderDetails(orderId);
    }
  }, [id]);

  const handleTabChange = (key) => {
    setActiveTab(key);
    if (key === 'all') {
      setFilteredOrders(allOrders);
    } else {
      const filtered = allOrders.filter(order => order.orders.status.toLowerCase() === key);
      setFilteredOrders(filtered);
    }
  };

  const showOrderDetails = useCallback(async (orderId) => {
    navigate(`/user/purchase/orderid=${orderId}`, { replace: true });
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
    setSelectedOrder(allOrders.find(order => order.orders.ordersID === orderId));
    setIsModalVisible(true);
  }, [allOrders, navigate]);

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
    setOrderDetails([]);
    navigate('/user/purchase', { replace: true });
  };

  const showSupportModal = (type, productId) => {
    setModalType(type);
    setSelectedProductId(productId);
    setIsSupportModalVisible(true);
  };

  const handleSupportOk = async () => {
    if (modalType === "Support") {
      try {
        const res = await getLabByAccountID(userInfo.accountID);
        const orderLabs = res.data.orderLabs;
        const matchingLabs = orderLabs.filter(
          (order) => order.lab.productID === selectedProductId
        );
        const labIDs = matchingLabs.map((lab) => lab.lab.labID);
        if (labIDs.length > 0) {
          await createSupport({
            accountID: userInfo.accountID,
            labID: labIDs[0],
            description: modalContent,
          });
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
    setIsSupportModalVisible(false);
    setModalContent("");
  };

  const handleSupportCancel = () => {
    setIsSupportModalVisible(false);
    setModalContent("");
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  return (
    <div style={{ marginTop: "-10px" }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <OrderTabs activeTab={activeTab} tabCounts={tabCounts} onTabChange={handleTabChange} />
      </div>

      <OrderList 
        filteredOrders={filteredOrders} 
        showOrderDetails={showOrderDetails} 
        pageSize={5}
      />

      <Modal
        visible={isModalVisible}
        onCancel={handleModalCancel}
        width={800}
        footer={null}
        style={{ marginTop: "3%" }}
      >
        {selectedOrder && (
          <OrderDetails
            selectedOrder={selectedOrder}
            orderDetails={orderDetails}
            showModal={showSupportModal}
            currentPage={currentPage}
            pageSize={2}
            handleTableChange={handleTableChange}
          />
        )}
      </Modal>

      <SupportModal
        isModalVisible={isSupportModalVisible}
        modalType={modalType}
        modalContent={modalContent}
        handleOk={handleSupportOk}
        handleCancel={handleSupportCancel}
        setModalContent={setModalContent}
      />
    </div>
  );
}
