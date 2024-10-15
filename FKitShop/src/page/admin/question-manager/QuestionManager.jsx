import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import QuestionTable from "./QuestionTable";
import QuestionFormModal from "./QuestionFormModal";
import { Notification } from "../../../component/UserProfile/UpdateAccount/Notification";
import { getAllQuestions, updateQuestionStatus, getQuestionByID } from "../../../service/questionService";

export default function QuestionManager() {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [mode, setMode] = useState("list");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const questionsPerPage = 5;

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  const fetchAllQuestions = async () => {
    try {
      const response = await getAllQuestions();
      if (response.data && Array.isArray(response.data)) {
        setQuestions(response.data);
      }
      console.log("RESPONSE.DATA: ", response.data);
      
      Notification(response.message, "", 4, "success");
    } catch (error) {
      console.error("Error fetching questions:", error);
      Notification("Error fetching questions", "", 4, "error");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedQuestion(null);
  };

  const handleUpdateQuestionStatus = async (question, status) => {
    try {
      const response = await updateQuestionStatus({
        questionID: question.questionID,
        status: status,
      });
      Notification(response.message, "", 4, "success");

      fetchAllQuestions();
    } catch (error) {
      console.log("Error updating question status:", error);
      Notification("Error updating question status", "", 4, "warning");
    }
  };

  const handleViewQuestionDetails = async (question) => {
    try {
      const response = await getQuestionByID(question.questionID);
      setSelectedQuestion(response);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching question details:", error);
      Notification("Error fetching question details", "", 4, "error");
    }
  };

  const handleDelete = async (question) => {
    try {
      // Implement the actual API call here
      // await deleteQuestion(question.questionID);
      fetchAllQuestions();
      Notification("Question deleted successfully", "", 4, "success");
    } catch (error) {
      console.error("Error deleting question:", error);
      Notification("Error deleting question", "", 4, "warning");
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Container fluid>
      <h2 className="my-4">
        <strong>Questions:</strong>
      </h2>
      <Row className="mb-3">
        <Col className="d-flex justify-content-end"></Col>
      </Row>

      <QuestionTable
        questions={questions}
        currentPage={currentPage}
        questionsPerPage={questionsPerPage}
        handleViewQuestionDetails={handleViewQuestionDetails}
        handleUpdateQuestionStatus={handleUpdateQuestionStatus}
        handleDelete={handleDelete}
        onPageChange={handlePageChange}
      />

      <QuestionFormModal
        mode={mode}
        selectedQuestion={selectedQuestion}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
      />
    </Container>
  );
}