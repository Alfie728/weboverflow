import { useState, useCallback, useEffect, useRef } from "react";

interface UseGlobalSearchModalProps {
  initialState?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

const useGlobalSearchModal = ({
  initialState = false,
  onOpen,
  onClose,
}: UseGlobalSearchModalProps = {}) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLInputElement>(null);

  const openModal = useCallback(() => {
    setIsOpen(true);
    onOpen?.();
    // Focus the input field when opening the modal
    setTimeout(() => triggerRef.current?.focus(), 0);
  }, [onOpen]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const toggleModal = useCallback(() => {
    if (isOpen) {
      closeModal();
    } else {
      openModal();
    }
  }, [isOpen, openModal, closeModal]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    },
    [closeModal]
  );

  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    },
    [closeModal]
  );

  const handleCommandK = useCallback(
    (event: KeyboardEvent) => {
      if (event.metaKey && event.key === "k") {
        event.preventDefault();
        toggleModal();
      }
    },
    [toggleModal]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("keydown", handleCommandK);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("keydown", handleCommandK);
    };
  }, [handleClickOutside, handleEscapeKey, handleCommandK]);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
    modalRef,
    triggerRef,
  };
};

export default useGlobalSearchModal;
