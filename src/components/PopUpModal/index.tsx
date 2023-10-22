import Modal from "react-modal";

interface PopUpModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  children: React.ReactNode;
  onRequestClose?: () => void;
}

const PopUpModal = ({
  show,
  setShow,
  onRequestClose,
  children,
}: PopUpModalProps) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#000",
      border: "none",
      maxWidth: 600,
      width: "100%",
      height: "80%",
      borderRadius: 16,
      padding: 0,
    },
    overlay: {
      zIndex: 999,
      backgroundColor: "rgba(6,18,24,0.8)",
    },
  };

  const handleClose = () => {
    if (onRequestClose) {
      return onRequestClose();
    }
    return setShow(false);
  };

  return (
    <Modal isOpen={show} style={customStyles} onRequestClose={handleClose}>
      {children}
    </Modal>
  );
};

export default PopUpModal;
