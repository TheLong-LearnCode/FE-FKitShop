import React from "react";
import { Modal, Button, Table, Row, Col } from "react-bootstrap";
import { getModalHeaderMode } from "../../../util/GetModalHeaderMode";

export default function SupportFormModal({
  mode,
  showModal,
  handleCloseModal,
  selectedSupport,
  selectedSupportDetails,
}) {
  if (!selectedSupport) return null;

  const {
    supportID,
    customerName,
    supportType,
    requestDate,
    status,
    description,
  } = selectedSupport;

  return (
    <Modal show={showModal} onHide={handleCloseModal} size="lg">
      <Modal.Header className={getModalHeaderMode(mode)}>
        <Modal.Title>
          <strong>View Support Request</strong>
        </Modal.Title>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <p><strong>Support ID:</strong> {supportID}</p>
            <p><strong>Customer Name:</strong> {customerName}</p>
            <p><strong>Support Type:</strong> {supportType}</p>
            <p><strong>Request Date:</strong> {new Date(requestDate).toLocaleString()}</p>
            <p><strong>Status:</strong> {status}</p>
          </Col>
          <Col md={6}>
            <p><strong>Description:</strong></p>
            <p>{description}</p>
          </Col>
        </Row>

        <h4>Support Details:</h4>
        {selectedSupportDetails && (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Detail ID</th>
                <th>Issue</th>
                <th>Resolution</th>
                <th>Staff Name</th>
              </tr>
            </thead>
            <tbody>
              {selectedSupportDetails.map((detail) => (
                <tr key={detail.detailID}>
                  <td>{detail.detailID}</td>
                  <td>{detail.issue}</td>
                  <td>{detail.resolution}</td>
                  <td>{detail.staffName}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Modal.Body>
    </Modal>
  );
}
