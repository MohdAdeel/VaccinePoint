import React from "react";

const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/50 flex justify-center items-center z-499">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm text-center animate-fadeIn">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        {message && <p className="mb-4 text-gray-600">{message}</p>}

        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
