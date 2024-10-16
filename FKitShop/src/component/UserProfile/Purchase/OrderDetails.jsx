import React, { useState, useEffect } from 'react';
import { Button, Table, Image, Dropdown, Menu } from 'antd';
import { RollbackOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { formatCurrency } from "../../../util/CurrencyUnit";
import { getProvinces, getDistricts, getWards } from '../../../service/ghnApi';

const OrderDetails = ({ selectedOrder, orderDetails, backToOrderList, showModal, currentPage, pageSize, handleTableChange }) => {
//------------------------------------------------------------
    const [addressDetails, setAddressDetails] = useState({
    province: '',
    district: '',
    ward: ''
  });

  useEffect(() => {
    const fetchAddressDetails = async () => {
      try {
        const provinces = await getProvinces();
        const province = provinces.find(p => p.ProvinceID == selectedOrder.orders.province);

        if (province) {
          const districts = await getDistricts(province.ProvinceID);
          const district = districts.find(d => d.DistrictID == selectedOrder.orders.district);

          if (district) {
            const wards = await getWards(district.DistrictID);
            const ward = wards.find(w => w.WardCode == selectedOrder.orders.ward);

            setAddressDetails({
              province: province.ProvinceName,
              district: district.DistrictName,
              ward: ward ? ward.WardName : selectedOrder.orders.ward
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
  const menu = (productId) => (
    <Menu>
      <Menu.SubMenu key="question" title="Make a Question">
        <Menu.Item key="questionView">View</Menu.Item>
        <Menu.Item
          key="questionNew"
          onClick={() => showModal("Question", productId)}
        >
          New
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="support" title="Comming Soon..." disabled={true}>
        <Menu.Item key="supportView">View</Menu.Item>
        <Menu.Item
          key="supportNew"
          onClick={() => showModal("Support", productId)}
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

  return (
    <div>
      <p>
        <strong>Order ID:</strong> {selectedOrder.orders.ordersID}
      </p>
      <p>
        <strong>Address:</strong> {selectedOrder.orders.address},{" "}
        {addressDetails.ward}, {addressDetails.district},{" "}
        {addressDetails.province}
      </p>
      <p>
        <strong>Note:</strong> {selectedOrder.orders.note}
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
  );
};

export default OrderDetails;
