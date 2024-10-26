import React, { useState, useEffect } from "react";
import { Button, Table, Image, Dropdown, Menu, Card, Row, Col } from "antd";
import { RollbackOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { formatCurrency } from "../../../util/CurrencyUnit";
import { getProvinces, getDistricts, getWards } from "../../../service/ghnApi";
import { Link } from "react-router-dom";

const OrderDetails = ({
  selectedOrder,
  orderDetails,
  backToOrderList,
  showModal,
  currentPage,
  pageSize,
  handleTableChange,
}) => {
  //------------------------------------------------------------
  const [addressDetails, setAddressDetails] = useState({
    province: "",
    district: "",
    ward: "",
  });

  useEffect(() => {
    const fetchAddressDetails = async () => {
      try {
        const provinces = await getProvinces();
        const province = provinces.find(
          (p) => p.ProvinceID == selectedOrder.orders.province
        );

        if (province) {
          const districts = await getDistricts(province.ProvinceID);
          const district = districts.find(
            (d) => d.DistrictID == selectedOrder.orders.district
          );

          if (district) {
            const wards = await getWards(district.DistrictID);
            const ward = wards.find(
              (w) => w.WardCode == selectedOrder.orders.ward
            );

            setAddressDetails({
              province: province.ProvinceName,
              district: district.DistrictName,
              ward: ward ? ward.WardName : selectedOrder.orders.ward,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching address details:", error);
      }
    };

    fetchAddressDetails();
  }, [selectedOrder]);
  ///----------------------------------------------------------

  const detailColumns = [
    {
      title: "Product",
      dataIndex: "image",
      key: "image",
      render: (image) => <Image src={image} width={50} />,
    },
    {
      title: "Product Name", // Thay "Product ID" thành "Product Name"
      dataIndex: "productID",
      key: "productID",
      render: (_, record) => (
        <Link
          to={`/detail/${record.productID}`}
          style={{ textDecoration: "none" }}
        >
          {record.productName.length > 25
            ? `${record.productName.substring(0, 25)}...`
            : record.productName}
        </Link>
      ),
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
      render: (_, record) => formatCurrency(record.price / record.quantity),
    },
    {
      title: "Total",
      key: "total",
      render: (_, record) => formatCurrency(record.price),
    },
  ];

  return (
    <div>
      <Row gutter={16}>
        <Col span={24}>
          <Card
            title={<strong>Details</strong>}
            //hoverable={true}
            style={{ margin: "10px 20px" }}
          >
            <Row gutter={16}>
              <Col span={8}>
                <Card title={<strong>Customer</strong>} hoverable={true}>
                  <p>
                    <strong>Name:</strong> {selectedOrder.orders.name}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedOrder.orders.phoneNumber}
                  </p>
                </Card>
              </Col>
              <Col span={16}>
                <p>
                  <strong>Order ID:</strong> {selectedOrder.orders.ordersID}
                </p>
                <p>
                  <strong>Note:</strong> {selectedOrder.orders.note}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {selectedOrder.orders.status.toLowerCase() === "processing"
                    ? "In Progress"
                    : selectedOrder.orders.status}
                </p>
                <p>
                  <strong>Shipping Price:</strong>{" "}
                  {formatCurrency(selectedOrder.orders.shippingPrice)}
                </p>
                <p>
                  <strong>Total Price:</strong>{" "}
                  {formatCurrency(selectedOrder.orders.totalPrice)}
                </p>
                <p>
                  <strong>Address:</strong> {selectedOrder.orders.address},{" "}
                  {addressDetails.ward}, {addressDetails.district},{" "}
                  {addressDetails.province}
                </p>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

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
  );
};

export default OrderDetails;
