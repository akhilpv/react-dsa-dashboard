import React from "react";
import InputField from "../atoms/InputField";
import SelectField from "../atoms/SelectField";
import type { Product } from "../../features/products/types/product.types";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

interface FormStepProps {
  step: string;
  fields: (keyof Product)[];
  product: Product;
  onChange: (e: React.ChangeEvent<any>) => void;
}

const FormStep: React.FC<FormStepProps> = ({ step, fields, product, onChange }) => {
  const categories = useSelector((state: RootState) => state.categories.list);
  return (
    <div className="p-4 border rounded bg-gray-50">
      <h3 className="text-lg font-semibold mb-3">{step}</h3>
      {fields.map((field) => {
        if (field === "status") {
          return (
            <SelectField
              key={field}
              label={field}
              name={field}
              value={product[field] as string}
              options={[
                { label: "In Stock", value: "in-stock" },
                { label: "Out of Stock", value: "out-of-stock" },
              ]}
              onChange={onChange}
            />
          );
        }

        if (field === "category") {
          return (
            <SelectField
              key={field}
              label={field}
              name={field}
              value={product[field] as string}
              options={categories.map((cat) => ({ label: cat?.name, value: cat?.id }))}
              onChange={onChange}
            />
          );
        }

        return (
          <InputField
            key={field}
            label={field}
            name={field}
            value={product[field] as any}
            type={field === "expiryDate" ? "date" : "text"}
            onChange={onChange}
          />
        );
      })}
    </div>
  );
};

export default FormStep;
