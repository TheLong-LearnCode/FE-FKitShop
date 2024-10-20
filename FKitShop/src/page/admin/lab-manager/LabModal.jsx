import React from 'react';
import { Modal } from 'antd';
import LabForm from './LabForm';

const LabModal = ({ visible, onCancel, onOk, form, products, onFileChange, editingLabId }) => {
  return (
    <Modal
      title={editingLabId ? "Edit Lab" : "Add New Lab"}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <LabForm form={form} products={products} onFileChange={onFileChange} />
    </Modal>
  );
};

export default LabModal;