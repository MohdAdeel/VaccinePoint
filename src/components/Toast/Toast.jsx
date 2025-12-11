import { motion, AnimatePresence } from "framer-motion";

const Toast = ({ message, type, isVisible, onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.4 }}
          className={`fixed top-5 right-5 z-50 px-6 py-4 rounded-2xl shadow-lg text-white font-medium
            ${type === "success" ? "bg-green-600" : "bg-red-500"}
          `}
        >
          <div className="flex items-center justify-between gap-4">
            <span>{message}</span>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200"
            >
              ✖
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
