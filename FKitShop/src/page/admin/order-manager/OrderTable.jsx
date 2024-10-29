import React, { useMemo } from "react";
import { Table, Button, Dropdown, Menu, Tabs, Badge } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { formatCurrency } from "../../../util/CurrencyUnit";

const { TabPane } = Tabs;

export default function OrderTable({
  orders,
  currentPage,
  ordersPerPage,
  handleViewOrderDetails,
  handleUpdateOrderStatus,
  handleCancel,
  onPageChange,
  activeTab,
  setActiveTab,
  handleExport
}) {
  const statusOptions = [
    "pending",
    "in-progress",
    "delivering",
    "delivered",
    //"cancel",
  ];

  const columns = [
    {
      title: "No",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => (currentPage - 1) * ordersPerPage + index + 1,
    },
    {
      title: "Order ID",
      dataIndex: "ordersID",
      key: "ordersID",
    },
    {
      title: "Customer Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => formatCurrency(price),
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (date) =>
        new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(new Date(date)),
      sorter: (a, b) => new Date(a.createDate) - new Date(b.createDate),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => handleViewOrderDetails(record)}
            style={{ marginRight: 8 }}
          >
            View
          </Button>
          <Dropdown
            overlay={
              <Menu>
                {statusOptions.map((status) => (
                  <Menu.Item
                    key={status}
                    onClick={() => handleUpdateOrderStatus(record, status)}
                    disabled={record.status === status}
                  >
                    {status}
                  </Menu.Item>
                ))}
              </Menu>
            }
          >
            <Button>
              Set Status <DownOutlined />
            </Button>
          </Dropdown>
          <Button
            danger
            onClick={() => handleCancel(record)}
            disabled={record.status === "cancel"}
            style={{ marginLeft: 8 }}
          >
            Cancel
          </Button>
        </>
      ),
    },
  ];

  const filterOrders = (status) => {
    if (status === "all") {
      return orders;
    } else {
      return orders.filter((order) => order.status === status);
    }
  };

  const filteredOrders = filterOrders(activeTab);

  const statusCounts = useMemo(() => {
    const counts = {
      all: orders.length,
      pending: 0,
      "in-progress": 0,
      delivering: 0,
      delivered: 0,
      cancel: 0,
    };

    orders.forEach((order) => {
      if (counts.hasOwnProperty(order.status)) {
        counts[order.status]++;
      }
    });

    return counts;
  }, [orders]);

  const renderTabTitle = (title, count) => (
    <span>
      {title} <Badge count={count} style={{ backgroundColor: "#52c41a" }} />
    </span>
  );

  return (
    <div className="order-container">
      <div
        //className="order-header"
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        {/* Button aligned to the left */}
        <Button size="large" onClick={handleExport}>
          <img
            src={"/img/icons8-microsoft-excel-96.png"}
            alt="Your Icon"
            style={{ width: 50, height: 50, marginRight: 8 }}
          />
        </Button>

        {/* Tabs aligned to the right */}
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          className="custom-tabs"
        >
          <TabPane tab={renderTabTitle("All", statusCounts.all)} key="all" />
          <TabPane
            tab={renderTabTitle("Pending", statusCounts.pending)}
            key="pending"
          />
          <TabPane
            tab={renderTabTitle("In Progress", statusCounts["in-progress"])}
            key="in-progress"
          />
          <TabPane
            tab={renderTabTitle("Delivering", statusCounts.delivering)}
            key="delivering"
          />
          <TabPane
            tab={renderTabTitle("Delivered", statusCounts.delivered)}
            key="delivered"
          />
          <TabPane
            tab={renderTabTitle("Cancel", statusCounts.cancel)}
            key="cancel"
          />
        </Tabs>
      </div>
      <Table
        columns={columns}
        dataSource={filteredOrders}
        rowKey="ordersID"
        pagination={{
          current: currentPage,
          pageSize: ordersPerPage,
          total: filteredOrders.length,
          onChange: onPageChange,
        }}
      />
    </div>
  );
}
