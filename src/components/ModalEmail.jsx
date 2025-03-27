const ModalEmail = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold text-center text-blue-700">
          Xác nhận <span className="text-red-500">Email</span> của bạn
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Vui lòng nhập email để xác nhận.
        </p>
        <input
          type="email"
          placeholder="Nhập email"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          onClick={onClose}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default ModalEmail;
