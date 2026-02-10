import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useUpdateResources from "../../../hooks/educationalresources/useUpdateResources";
import useGetSingleResource from "../../../hooks/educationalresources/useGetSingleResources";
import FormInput from "../../FormInput";
import LoadingSpinner from "../../LoadingSpinner";

export default function EditResourceForm() {
  const { id } = useParams();

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [fact, setFact] = useState("");
  const [type, setType] = useState("");

  const { loading: fetching, resource } = useGetSingleResource(id);
  const { updateResources, loading: updating } = useUpdateResources();

  // Prefill form when resource loads
  useEffect(() => {
    if (!resource) return;
/* eslint-disable */
    setCategory(resource.category || "");
    setTitle(resource.title || "");
    setFact(resource.fact || "");
    setType(resource.tip || "");
  }, [resource]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateResources(id, {
      category: category.trim().toLowerCase(),
      title: title.trim(),
      fact: fact.trim(),
      tip: type.trim(),
    });
  };

  if (fetching) return <LoadingSpinner message="Loading resources..." />;

  return (
    <form onSubmit={handleSubmit} className="pt-4">
      <h4 className="text-[#4F4F4F] text-3xl p-6 font-semibold">
        Edit Resource
      </h4>

      <div className="max-w-[600px] py-6 px-6 space-y-4">
        <FormInput
          label="Category Name"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <FormInput
          label="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <FormInput
          label="Fact"
          type="text"
          value={fact}
          onChange={(e) => setFact(e.target.value)}
        />

        <FormInput
          label="Type"
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />

        <button
          type="submit"
          disabled={updating}
          className="mt-4 px-4 py-2 bg-green-900 text hover:bg-green-700 text-white font-semibold rounded disabled:opacity-50"
        >
          {updating ? "Updating..." : "Update Resource"}
        </button>
      </div>
    </form>
  );
}
//nice jlklfkglssdfdfsfsfsdfsdf