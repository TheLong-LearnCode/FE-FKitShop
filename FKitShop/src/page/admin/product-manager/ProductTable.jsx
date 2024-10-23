import React from 'react';
import { Table, Space, Button, Image, Carousel } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, PictureOutlined } from '@ant-design/icons';
import { formatCurrency } from "../../../util/CurrencyUnit";

const ProductTable = ({ products, onView, onEdit, onDelete, onViewImages }) => {
  const columns = [
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "flex-end", gap: "10px" }}>
          <Carousel autoplay style={{ width: "70px", height: "70px" }}>
            {record.images?.slice(0, 3).map((image) => (
              <div key={image?.id} style={{ textAlign: "center" }}>
                <Image
                  src={image?.url}
                  alt={record.name}
                  width={70}
                  height={70}
                  style={{ objectFit: "cover", justifyContent: "center" }}
                  fallback="https://s3.ap-southeast-2.amazonaws.com/fkshop/Product/no-image.png"
                />
              </div>
            ))}
          </Carousel>
          <Button
            icon={<PictureOutlined />}
            onClick={() => onViewImages(record.images)}
          />
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => <span className="ellipsis-text">{name}</span>,
    },
    {
      title: "Stock",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price (VNĐ)",
      dataIndex: "price",
      key: "price",
      render: (_, record) => <span>{formatCurrency(record.price)}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (_, record) => <span>{record.category?.categoryName}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EyeOutlined />} onClick={() => onView(record)} />
          <Button icon={<EditOutlined />} onClick={() => onEdit(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => onDelete(record.id)} danger />
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={products} rowKey="id" pagination={{ pageSize: 4 }} />;
};

export default ProductTable;