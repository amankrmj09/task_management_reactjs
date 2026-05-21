import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Input from "../../../components/common/Input";
import TextArea from "../../../components/common/TextArea";
import Button from "../../../components/common/Button";

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

  const handleSubmit = async (e) => {
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
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl bg-white p-6 shadow-sm"
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
          <label className="text-sm font-medium text-gray-700">Priority</label>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="LOW">LOW</option>

            <option value="MEDIUM">MEDIUM</option>

            <option value="HIGH">HIGH</option>

            <option value="CRITICAL">CRITICAL</option>
          </select>
        </div>

        <Input
          label="Due Date"
          type="date"
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

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Task"}
      </Button>
    </form>
  );
}

export default TaskForm;
