import { useState } from "react";

function useModal(defaultValue = false) {
  const [isOpen, setIsOpen] =
    useState(defaultValue);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  };
}

export default useModal;