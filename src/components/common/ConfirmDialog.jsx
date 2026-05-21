import Modal from "./Modal";
import Button from "./Button";

function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      <p className="text-gray-600">
        {description}
      </p>

      <div className="mt-6 flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="danger"
          onClick={onConfirm}
        >
          Confirm
        </Button>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;