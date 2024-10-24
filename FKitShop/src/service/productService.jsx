import { Button, message, Upload } from "antd";
import api from "../config/axios";
import { GET, POST, PUT, DELETE } from "../constants/httpMethod";
import { LoadingOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";

export const updateImage = async (productID, imageID) => {
  try {
    const response = await api[PUT](`/product/${productID}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const updateProduct = async (productID, formData) => {
  try {
    const response = await api[PUT](`/product/${productID}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// -------------------------------GET------------------------------------
export const getAllProducts = async () => {
  try {
    const response = await api[GET]("/product/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await api[GET](`/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

// -------------------------------POST------------------------------------

export const addProduct = async (formData) => {
  try {
    const response = await api[POST]("/product/add", formData);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const ProductUploadImage = ({
  mode,
  fileList,
  setFileList,
  uploading,
  setUploading,
}) => {
  const handleUpload = async (options) => {
    const { onSuccess, onError, file } = options;
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result;
        onSuccess({ url: base64, originFileObj: file });
        message.success(`${file.name} uploaded successfully.`);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Upload failed:", error);
      message.error(`${file.name} upload failed.`);
      onError(error);
    }
    setUploading(false);
  };

  const uploadProps = {
    customRequest: handleUpload,
    onChange: ({ fileList: newFileList }) => {
      if (typeof setFileList === "function") {
        setFileList(newFileList);
      } else {
        console.error("setFileList is not a function");
      }
    },
    onRemove: (file) => {
      if (typeof setFileList === "function") {
        setFileList((prevFileList) =>
          prevFileList.filter((item) => item.uid !== file.uid)
        );
      } else {
        console.error("setFileList is not a function");
      }
    },
    fileList,
    multiple: true,
    listType: "picture-card",
  };

  return (
    <Upload {...uploadProps} loading={uploading} disabled={mode==="view"}>
      <button style={{ border: 0, background: "none" }} type="button">
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </button>
    </Upload>
  );
};

export const deleteProduct = async (productId) => {
  try {
    const response = await api[DELETE](`/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const deleteImages = async (productId, imageIDs) => {
  try {
    const response = await api[DELETE](`/product/images/`, data);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
