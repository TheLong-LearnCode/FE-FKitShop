import React, { useState, useEffect } from "react";
import { Button, Modal, message, Image, Carousel } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById,
} from "../../../service/productService";
import "./index.css";
import ProductTable from "./ProductTable";
import ProductModal from "./ProductModal";
import { getAllCategories } from "../../../service/categoryService";
import { ProductUploadImage } from "../../../service/productService";

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [visibleImages, setVisibleImages] = useState([]);
  const [isImagesModalVisible, setIsImagesModalVisible] = useState(false);

  useEffect(() => {
    fetchAllCategories();
    fetchAllProducts();
    fetchProductById(selectedProduct?.productID);
  }, []);

  const fetchAllCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response);
      message.success("Categories fetched successfully");
    } catch (error) {
      message.error("Failed to fetch categories");
    }
  };

  const fetchAllProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response.data);
    } catch (error) {
      message.error("Failed to fetch products");
    }
  };

  const fetchProductById = async (productId) => {
    const response = await getProductById(productId);
    setSelectedProduct(response.data);
  };

  const showModal = (mode, product = null) => {
    setModalMode(mode);
    setSelectedProduct(fetchProductById(product.productID).data);
    setIsModalVisible(true);
  };

  const handleUpload = async (file) => {
    const response = await ProductUploadImage(file);
    setFileList([...fileList, response]);
    return response;
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  const handleModalOk = async (values) => {
    try {
      let response;
      if (modalMode === "add") {
        response = await addProduct(values);
      } else if (modalMode === "edit") {
        console.log(selectedProduct.productID);

        response = await updateProduct(selectedProduct.productID, values);
      }
      message.success(response.message);
      fetchAllProducts(); // Refresh the product list
    } catch (error) {
      message.error("Operation failed");
    }
    setIsModalVisible(false);
  };

  const handleDelete = async () => {
    try {
      Modal.confirm({
        title: "Confirm Delete",
        content: "Are you sure you want to delete this product?",
        onOk: async () => {
          await deleteProduct(selectedProduct.productID);
          message.success("Product deleted successfully");
          fetchAllProducts(); // Refresh the product list
        },
      });
    } catch (error) {
      message.error("Failed to delete product");
    }
  };

  const handleViewImages = (images) => {
    setVisibleImages(images);
    setIsImagesModalVisible(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showModal("add", null, categories)}
        style={{ marginBottom: "20px" }}
      >
        Add New Product
      </Button>
      <ProductTable
        products={products}
        onView={(product) => showModal("view", product)}
        onEdit={(product) => showModal("edit", product)}
        onDelete={handleDelete}
        onViewImages={handleViewImages}
      />
      <ProductModal
        visible={isModalVisible}
        mode={modalMode}
        product={selectedProduct}
        categories={categories}
        onCancel={handleModalCancel}
        onOk={handleModalOk}
        fileList={fileList}
        setFileList={setFileList}
        uploading={uploading}
        setUploading={setUploading}
      />
      <Modal
        title="All Images"
        visible={isImagesModalVisible}
        onCancel={() => setIsImagesModalVisible(false)}
        footer={null}
        style={{ alignItems: "center" }}
      >
        <Carousel autoplay>
          {visibleImages.map((image) => (
            <div key={image?.id} style={{ textAlign: "center" }}>
              <Image
                src={image?.url}
                alt="product image"
                width={300}
                height={300}
                style={{ objectFit: "cover", alignContent: "center" }}
                fallback="https://s3.ap-southeast-2.amazonaws.com/fkshop/Product/no-image.png"
              />
            </div>
          ))}
        </Carousel>
      </Modal>
    </div>
  );
};

export default ProductManager;
