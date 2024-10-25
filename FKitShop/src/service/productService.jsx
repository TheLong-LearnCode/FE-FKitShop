import { Button, message, Upload } from "antd";
import api from "../config/axios";
import { GET, POST, PUT, DELETE } from "../constants/httpMethod";
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";

export const addImages = async(productID, formData) => {
  try {
    const response = await api[PUT](`/product/add-images/${productID}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error adding images to product:", error);
    throw error;
  }
}

export const updateImage = async (productID, imageID, formData) => {
  try {
    const response = await api[PUT](
      `/product/image/${productID}/${imageID}`,
      formData
    );
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
  setDeletedImages,
  setUpdatedImages,

}) => {
  // const handleUpload = async (options) => {
  //   const { onSuccess, onError, file } = options;
  //   setUploading(true);
  //   try {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const base64 = e.target.result;
  //       onSuccess({ url: base64, originFileObj: file });
  //       message.success(`${file.name} uploaded successfully.`);
  //     };
  //     reader.readAsDataURL(file);
  //   } catch (error) {
  //     console.error("Upload failed:", error);
  //     message.error(`${file.name} upload failed.`);
  //     onError(error);
  //   }
  //   setUploading(false);
  // };
  const handleUpload = async (options) => {
    const { onSuccess, onError, file } = options;
    setUploading(true);
  
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result;
        onSuccess({ url: base64, originFileObj: file });
        message.success(`${file.name} marked for update.`);
        
        // Store updated images with their original UIDs
        setUpdatedImages((prev) => [...prev, { uid: file.uid, file }]);
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
    onPreview: (file) => {
      window.open(file.url); // Preview image in a new tab
    },
    beforeUpload: () => {
      false;
    },
    onChange: ({ fileList: newFileList }) => {
      if (typeof setFileList === "function") {
        setFileList(newFileList);
      } else {
        console.error("setFileList is not a function");
      }
    },
    // onRemove: async (file) => {
    //   try {
    //     const data = {
    //       productID: productID,
    //       imageIDs: `${file.uid}`,
    //     };
    //     console.log(data);

    //     const response = await deleteImages(data);
    //     message.success(response.message);

    //     setFileList(fileList.filter((item) => item.uid !== file.uid));
    //   } catch (error) {
    //     console.error("Error deleting image:", error);
    //     message.error(`${file.name} delete failed.`);
    //   }
    // },
    onRemove: async (file) => {
      // Store the deleted image UID in the deletedImages array
      setDeletedImages((prev) => [...prev, file.uid]);
      setFileList(fileList.filter((item) => item.uid !== file.uid));
      message.success(`${file.name} marked for deletion.`);
    },
    fileList,
    multiple: true,
    listType: "picture-card",
  };

  return (
    <Upload {...uploadProps} loading={uploading} disabled={mode === "view"}>
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

export const deleteImages = async (data) => {
  try {
    console.log("data: ", data);

    const response = await api[DELETE](`/product/images`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
