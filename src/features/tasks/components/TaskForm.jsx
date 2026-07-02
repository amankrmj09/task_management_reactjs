import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Input from "../../../components/common/Input";
import TextArea from "../../../components/common/TextArea";
import ActionButton from "../../../components/shared/ActionButton";
import Dropdown from "../../../components/common/Dropdown";
import DatePicker from "../../../components/common/DatePicker";

import { createTask } from "../redux/taskThunk";

function TaskForm({ onSuccess }) {
  const dispatch = useDispatch();

  const { selectedProject } = useSelector((state) => state.projects);

  const { isLoading, error } = useSelector((state) => state.tasks);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assigneeEmail: "",
    priority: "MEDIUM",
    dueDate: "",
    tags: "",
  });

  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!selectedProject?.id) {
      setFormError("Please select a project first.");
      return;
    }

    const payload = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    const result = await dispatch(createTask(selectedProject.id, payload));

    if (result?.success) {
      onSuccess?.();

      setFormData({
        title: "",
        description: "",
        assigneeEmail: "",
        priority: "MEDIUM",
        dueDate: "",
        tags: "",
      });
    }
  }, [dispatch, selectedProject?.id, formData, onSuccess]);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <Input
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Task title"
      />

      <TextArea
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Task description"
      />

      <Input
        label="Assignee Email"
        name="assigneeEmail"
        type="email"
        value={formData.assigneeEmail}
        onChange={handleChange}
        placeholder="Enter assignee email"
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--text-main)]">Priority</label>

          <Dropdown
            fullWidth
            label={formData.priority}
            onSelect={(val) => handleChange({ target: { name: "priority", value: val } })}
            items={[
              { label: "LOW", value: "LOW" },
              { label: "MEDIUM", value: "MEDIUM" },
              { label: "HIGH", value: "HIGH" },
              { label: "CRITICAL", value: "CRITICAL" },
            ]}
          />
        </div>

        <DatePicker
          label="Due Date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>

      <Input
        label="Tags"
        name="tags"
        value={formData.tags}
        onChange={handleChange}
        placeholder="frontend, backend, api"
      />

      {(formError || error) && (
        <p className="text-sm text-red-500">{formError || error}</p>
      )}

      <div className="flex justify-end mt-4">
        <ActionButton
          type="submit"
          text={isLoading ? "Creating..." : "Create Task"}
          className="w-max px-8 h-[48px]"
          disabled={isLoading}
        />
      </div>
    </form>
  );
}

export default TaskForm;
