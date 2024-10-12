import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SupportTable from "./SupportTable";
import SupportFormModal from "./SupportFormModal";
import { Notification } from "../../../component/UserProfile/UpdateAccount/Notification";
// Import các service cần thiết, ví dụ:
// import { getAllSupports, getSupportDetailsBySupportID, updateSupportStatus, deleteSupport } from "../../../service/supportService";

export default function SupportManager() {
  const [supports, setSupports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [mode, setMode] = useState("list");
  const [selectedSupport, setSelectedSupport] = useState(null);
  const [selectedSupportDetails, setSelectedSupportDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const supportsPerPage = 5;

  useEffect(() => {
    fetchAllSupports();
  }, []);

  const fetchAllSupports = async () => {
    try {
      // Thay thế bằng cuộc gọi API thực tế
      // const response = await getAllSupports();
      // setSupports(response.data);
      setSupports([]); // Placeholder
    } catch (error) {
      console.error("Error fetching supports:", error);
      Notification("Error fetching supports", "", 4, "error");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSupport(null);
    setSelectedSupportDetails(null);
  };

  const handleUpdateSupportStatus = async (support, status) => {
    try {
      // Thay thế bằng cuộc gọi API thực tế
      // await updateSupportStatus(support.id, status);
      Notification("Support status updated successfully", "", 4, "success");
      fetchAllSupports();
    } catch (error) {
      console.error("Error updating support status:", error);
      Notification("Error updating support status", "", 4, "warning");
    }
  };

  const handleViewSupportDetails = async (support) => {
    try {
      // Thay thế bằng cuộc gọi API thực tế
      // const response = await getSupportDetailsBySupportID(support.id);
      // setSelectedSupportDetails(response.data);
      setSelectedSupport(support);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching support details:", error);
      Notification("Error fetching support details", "", 4, "warning");
    }
  };

  const handleDelete = async (support) => {
    try {
      // Thay thế bằng cuộc gọi API thực tế
      // await deleteSupport(support.id);
      fetchAllSupports();
      Notification("Support deleted successfully", "", 4, "success");
    } catch (error) {
      console.error("Error deleting support:", error);
      Notification("Error deleting support", "", 4, "warning");
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Container fluid>
      <h2 className="my-4">
        <strong>Support:</strong>
      </h2>
      <Row className="mb-3">
        <Col className="d-flex justify-content-end"></Col>
      </Row>

      <SupportTable
        supports={supports}
        currentPage={currentPage}
        supportsPerPage={supportsPerPage}
        handleViewSupportDetails={handleViewSupportDetails}
        handleUpdateSupportStatus={handleUpdateSupportStatus}
        handleDelete={handleDelete}
        onPageChange={handlePageChange}
      />

      <SupportFormModal
        mode={mode}
        selectedSupport={selectedSupport}
        selectedSupportDetails={selectedSupportDetails}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
      />
    </Container>
  );
}
