import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Input from "../../../components/common/Input";
import TextArea from "../../../components/common/TextArea";
import ActionButton from "../../../components/shared/ActionButton";

import { createProject } from "../redux/projectThunk";

import { ROUTES } from "../../../routes/routeConstants";

function CreateProjectForm({ onSuccess }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state) => state.projects);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    const result = await dispatch(createProject(formData));

    if (result?.success) {
      onSuccess?.();
      navigate(ROUTES.PROJECTS);
    }
  }, [dispatch, formData, onSuccess, navigate]);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl glass-card p-6 shadow-sm"
    >
      <Input
        label="Project Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter project name"
      />

      <TextArea
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Enter project description"
      />

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <div className="flex justify-end mt-4">
        <ActionButton
          type="submit"
          text={isLoading ? "Creating..." : "Create Project"}
          className="w-max px-8 h-[48px]"
          disabled={isLoading}
        />
      </div>
    </form>
  );
}

export default CreateProjectForm;
