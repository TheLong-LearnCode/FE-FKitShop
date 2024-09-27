import React, { useState } from 'react';
import Modal from 'react-modal';

const products = [
    { id: 1, name: 'Sản phẩm 1', price: '$10' },
    { id: 2, name: 'Sản phẩm 2', price: '$20' },
    { id: 3, name: 'Sản phẩm 3', price: '$30' },
];

Modal.setAppElement('#root');

export default function ProductPopup() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Mở popup
    const openModal = () => {
        setModalIsOpen(true);
    };

    // Đóng popup
    const closeModal = () => {
        setModalIsOpen(false);
    };
    return (
        <>
            <h1>Danh sách sản phẩm</h1>
            <button onClick={openModal}>Xem danh sách sản phẩm</button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Danh sách sản phẩm"
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        padding: '20px',
                        width: '400px',
                    },
                }}
            >
                <h2>Danh sách sản phẩm</h2>
                <ul>
                    {products.map(product => (
                        <li key={product.id}>
                            {product.name} - {product.price}
                        </li>
                    ))}
                </ul>
                <button onClick={closeModal}>Đóng</button>
            </Modal>
        </>
    )
}
