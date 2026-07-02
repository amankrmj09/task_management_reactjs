import { useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Input from "../../../components/common/Input";
import TextArea from "../../../components/common/TextArea";
import ActionButton from "../../../components/shared/ActionButton";
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

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setFormError("");

    if (!activeProject?.id) {
      setFormError("Project not found.");
      return;
    }

    await dispatch(editProject(activeProject.id, formData));

    onSuccess?.();
  }, [dispatch, activeProject, formData, onSuccess]);

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

      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--text-main)]">Status</label>

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

      <div className="flex justify-end mt-4">
        <ActionButton
          type="submit"
          text={isLoading ? "Updating..." : "Update Project"}
          className="w-max px-8 h-[48px]"
          disabled={isLoading}
        />
      </div>
    </form>
  );
}

export default UpdateProjectForm;
