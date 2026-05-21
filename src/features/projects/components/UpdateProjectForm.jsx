import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Input from "../../../components/common/Input";
import TextArea from "../../../components/common/TextArea";
import Button from "../../../components/common/Button";
import Dropdown from "../../../components/common/Dropdown";

import { editProject } from "../redux/projectThunk";

function UpdateProjectForm({ project, onSuccess }) {
  const dispatch = useDispatch();

  const { selectedProject, isLoading } = useSelector((state) => state.projects);

  const activeProject = project || selectedProject;

  const defaultValues = useMemo(
    () => ({
      name: activeProject?.name || "",
      description: activeProject?.description || "",
      status: activeProject?.status || "ACTIVE",
    }),
    [activeProject]
  );

  const [overrides, setOverrides] = useState({});

  const formData = {
    ...defaultValues,
    ...overrides,
  };

  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setOverrides((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!activeProject?.id) {
      setFormError("Project not found.");
      return;
    }

    await dispatch(editProject(activeProject.id, formData));

    onSuccess?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl bg-white p-6 shadow-sm"
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

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Status</label>

        <Dropdown
          label={formData.status}
          items={[
            { label: "ACTIVE", value: "ACTIVE" },
            { label: "ARCHIVED", value: "ARCHIVED" },
          ]}
          onSelect={(value) => handleChange({ target: { name: "status", value } })}
          fullWidth
        />
      </div>

      {formError && <p className="text-sm text-red-500">{formError}</p>}

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Updating..." : "Update Project"}
      </Button>
    </form>
  );
}

export default UpdateProjectForm;
