import React, { useState, useEffect } from "react";
import { Button, Input, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import BlogTable from "./BlogTable";
import BlogModal from "./BlogModal";
import { createBlog, deleteBlog, getAllBlogs, updateBlog } from "../../../service/blogService";
import { getAllTags } from "../../../service/tagService";

const { Search } = Input;

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [tags, setTags] = useState([]);

  const fetchAllBlogs = async () => {
    const response = await getAllBlogs();
    const blogList = response.map(item=>item.blog);
    setBlogs(blogList);
  };

  const fetchAllTags = async () => {
    const response = await getAllTags();
    const tagList = response.flatMap(item=>item.tag);
    console.log("tagList: ", tagList);
    
    setTags(tagList);
  };

  useEffect(() => {
    fetchAllBlogs();
    fetchAllTags();
  }, []);

  const showModal = (mode, blog = null) => {
    setModalMode(mode);
    setSelectedBlog(blog);
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedBlog(null);
  };

  const handleModalOk = async (values) => {
    if (modalMode === "add") {
      // const response = await createBlog(values);
      // message.success(response.message);
    } else if (modalMode === "edit") {
      const response = await updateBlog(selectedBlog.blogID, values);
      setBlogs(
        blogs.map((blog) =>
          blog.blogID === selectedBlog.blogID ? { ...blog, ...values } : blog
        )
      );
      message.success(response.message);
    }
    fetchAllBlogs();
    setIsModalVisible(false);
  };

  const handleDelete = async (blog) => {
    const response = await deleteBlog(blog.blogID);
    Modal.confirm({
      title: "Are you sure you want to delete this blog?",
      content: "This action cannot be undone.",
      onOk() {
        fetchAllBlogs();
        message.success(response.message);
      },
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex align-center mb-3">
        <h2><strong>Blogs</strong></h2>
        <Button
          className="ml-auto"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal("add")}
        >
          Add New
        </Button>
      </div>
      <BlogTable
        blogs={blogs}
        tags={tags}
        onView={(blog) => showModal("view", blog)}
        onEdit={(blog) => showModal("edit", blog)}
        onDelete={handleDelete}
      />
      <BlogModal
        visible={isModalVisible}
        mode={modalMode}
        tags={tags}
        blog={selectedBlog}
        onCancel={handleModalCancel}
        onOk={handleModalOk}
      />
    </div>
  );
};

export default BlogManager;
