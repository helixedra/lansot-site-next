"use client";
import React, { useState, useEffect } from "react";

const Toast = ({ message, duration = 3500, onClose, status }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed z-[100] top-32 left-1/2 transform -translate-x-1/2 px-4 py-2 shadow-lg transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      } ${
        status === "success" ? "bg-green-600" : status === "pending" ? "bg-black" : "bg-red-500"
      } text-white`}
    >
      {message}
    </div>
  );
};

export default Toast;
