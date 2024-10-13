import React from "react";
import { Modal, Button, Table, Row, Col } from "antd";
import { getModalHeaderMode } from "../../../util/GetModalHeaderMode";

export default function QuestionFormModal({
  mode,
  showModal,
  handleCloseModal,
  selectedQuestion,
}) {
  if (!selectedQuestion || !selectedQuestion.data) return null;

  const {
    questionID,
    userName,
    title,
    content,
    datePosted,
    status,
    answers,
  } = selectedQuestion.data;

  const columns = [
    {
      title: "Answer ID",
      dataIndex: "answerID",
      key: "answerID",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Date Posted",
      dataIndex: "datePosted",
      key: "datePosted",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
  ];

  return (
    <Modal
      open={showModal}
      onCancel={handleCloseModal}
      width="80%"
      title={<h4>Question Details</h4>}
      footer={null}
    >
      <Row gutter={16}>
        <Col span={12}>
          <p><strong>Question ID:</strong> {questionID}</p>
          <p><strong>User Name:</strong> {userName}</p>
          <p><strong>Title:</strong> {title}</p>
          <p><strong>Date Posted:</strong> {new Date(datePosted).toLocaleString()}</p>
          <p><strong>Status:</strong> {['Pending', 'Answered', 'Closed'][status]}</p>
        </Col>
        <Col span={12}>
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <img src="/img/user.png" alt="User Avatar" style={{ width: "100px", height: "100px" }}/>
          </div>
        </Col>
      </Row>

      <h4>Question Content:</h4>
      <p>{content}</p>

      <h4>Answers:</h4>
      <Table
        columns={columns}
        dataSource={answers}
        rowKey="answerID"
        pagination={false}
      />
    </Modal>
  );
}
