import { useState, useCallback, useEffect, useRef } from "react";

interface UseModalProps {
  initialState?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

const useModal = ({
  initialState = false,
  onOpen,
  onClose,
}: UseModalProps = {}) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>(null);

  const openModal = useCallback(() => {
    setIsOpen(true);
    onOpen?.();
  }, [onOpen]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const toggleModal = useCallback(() => {
    setIsOpen((prev) => {
      const newState = !prev;
      newState ? onOpen?.() : onClose?.();
      return newState;
    });
  }, [onOpen, onClose]);

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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [handleClickOutside, handleEscapeKey]);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
    modalRef,
    triggerRef,
  };
};

export default useModal;