import React, { useState } from "react";
import FormInput from "../../FormInput";
import useAddResources from "../../../hooks/educationalresources/useAddResources";

export const AddResourceForm = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [fact, setFact] = useState("");
  const [type, setType] = useState(""); // maps to tip

  const { addResources, loading } = useAddResources();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addResources({
      category: category.trim().toLowerCase(), // ✅ IMPORTANT
      title: title.trim(),
      fact: fact.trim(),
      tip: type.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="pt-4">
      <h4 className="text-[#4F4F4F] text-3xl p-6 font-semibold">
        Add Resource
      </h4>

      <div className="max-w-[600px] py-6 px-6 space-y-4">
        <FormInput
          label="Category Name"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="food | energy | transport | general"
        />

        <FormInput
          label="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
        />

        <FormInput
          label="Fact"
          type="text"
          value={fact}
          onChange={(e) => setFact(e.target.value)}
          placeholder="Enter fact"
        />

        <FormInput
          label="Type"
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Enter tip"
        />

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Resource"}
        </button>
      </div>
    </form>
  );
};
