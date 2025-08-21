import React, { useState } from "react";
import FormStep from "../molecules/FormStep";
import type { Product } from "../../features/products/types/product.types";
import { useDispatch } from "react-redux";
import { addProduct } from "../../features/products/slices/productSlice";

// Doubly Linked List Node
class StepNode {
  step: string;
  fields: (keyof Product)[];
  next: StepNode | null;
  prev: StepNode | null;
  constructor(step: string, fields: (keyof Product)[]) {
    this.step = step;
    this.fields = fields;
    this.next = null;
    this.prev = null;
  }
}

// Linked list steps
const step1 = new StepNode("Basic Info", ["name", "sku", "category"]);
const step2 = new StepNode("Stock Details", ["status", "stock"]);
const step3 = new StepNode("Pricing", ["price", "discount"]);
const step4 = new StepNode("Expiry & Sales", ["expiryDate", "salesCount"]);

// Link them (both directions)
step1.next = step2;
step2.prev = step1;
step2.next = step3;
step3.prev = step2;
step3.next = step4;
step4.prev = step3;

const FormStepper: React.FC = () => {
  const dispatch = useDispatch();

  const [product, setProduct] = useState<Product>({
    id: Date.now(),
    name: "",
    sku: "",
    status: "in-stock",
    stock: 0,
    price: 0,
    category: "",
    expiryDate: "",
    salesCount: 0,
    discount: 0,
  });

  const [currentStep, setCurrentStep] = useState<StepNode | null>(step1);
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]:
        ["stock", "price", "salesCount", "discount"].includes(name)
          ? Number(value)
          : value,
    }));
    setError(""); // clear error when typing
  };

  const validateStep = (): boolean => {
    if (!currentStep) return false;
    for (const field of currentStep.fields) {
      const value = product[field];
      if (value === "" || value === null || value === undefined) {
        setError(`⚠️ Please fill ${field} before proceeding.`);
        return false;
      }
    }
    return true;
  };

  const goNext = () => {
    if (validateStep() && currentStep?.next) {
      setCurrentStep(currentStep.next);
    }
  };

  const goPrev = () => {
    if (currentStep?.prev) {
      setError(""); // clear previous error if any
      setCurrentStep(currentStep.prev);
    }
  };

  const handleSubmit = () => {
    if (validateStep()) {
      dispatch(addProduct(product));
      alert("✅ Product added successfully!");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        Add Product - {currentStep?.step}
      </h2>

      <FormStep
        step={currentStep?.step || ""}
        fields={currentStep?.fields || []}
        product={product}
        onChange={handleChange}
      />

      {error && <p className="text-red-600 mt-2">{error}</p>}

      <div className="flex justify-between mt-6">
        {/* Previous button */}
        <button
          onClick={goPrev}
          disabled={!currentStep?.prev}
          type="button"
          className={`px-4 py-2 rounded text-white ${
            currentStep?.prev
              ? "bg-gray-600 hover:bg-gray-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          ← Previous
        </button>

        {/* Next or Submit */}
        {currentStep?.next ? (
          <button
            onClick={goNext}
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            type="button"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit ✅
          </button>
        )}
      </div>
    </div>
  );
};

export default FormStepper;
