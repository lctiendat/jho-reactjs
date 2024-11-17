import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#1E2A38] p-6 rounded-lg shadow-lg w-[400px] relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-500 rounded-full p-1"
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
