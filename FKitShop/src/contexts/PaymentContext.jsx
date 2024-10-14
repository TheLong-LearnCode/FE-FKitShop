import React, { createContext, useState, useContext } from 'react';

const PaymentContext = createContext();

export const usePaymentContext = () => useContext(PaymentContext);

export const PaymentProvider = ({ children }) => {
  const [paymentStatus, setPaymentStatus] = useState(null);

  return (
    <PaymentContext.Provider value={{ paymentStatus, setPaymentStatus }}>
      {children}
    </PaymentContext.Provider>
  );
};