import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  value: string | number;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  type = "text",
  onChange,
}) => {
  return (
    <div className="flex flex-col mb-3">
      <label className="font-medium capitalize mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="border rounded p-2"
      />
    </div>
  );
};

export default InputField;