// src/components/TextArea.tsx
import React from 'react';

interface TextAreaProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ label, value, onChange }) => (
    <div className="mb-4">
        <label className="block text-gray-400 text-sm mb-2">{label}</label>
        <textarea
            value={value}
            onChange={onChange}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
        />
    </div>
);

export default TextArea;
