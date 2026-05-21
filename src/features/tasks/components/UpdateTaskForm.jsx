import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Input from "../../../components/common/Input";
import TextArea from "../../../components/common/TextArea";
import Button from "../../../components/common/Button";

import { editTask, updateTaskStatus } from "../redux/taskThunk";

import { TASK_PRIORITY, TASK_STATUS } from "../../../utils/constants";

function UpdateTaskForm({ task, onSuccess }) {
  const dispatch = useDispatch();

  const { selectedTask, isLoading } = useSelector((state) => state.tasks);

  const { selectedProject } = useSelector((state) => state.projects);

  const activeTask = task || selectedTask;
  const projectId = activeTask?.projectId || selectedProject?.id;

  const defaultValues = useMemo(
    () => ({
      title: activeTask?.title || "",
      description: activeTask?.description || "",
      assigneeEmail: activeTask?.assignee?.email || "",
      status: activeTask?.status || TASK_STATUS.TODO,
      priority:
        activeTask?.priority || TASK_PRIORITY.MEDIUM,
      dueDate: activeTask?.dueDate
        ? activeTask.dueDate.split("T")[0]
        : "",
      tags: activeTask?.tags?.join(", ") || "",
    }),
    [activeTask]
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

    if (!activeTask?.id || !projectId) {
      setFormError("Task is not available.");
      return;
    }

    const { status, ...rest } = formData;

    const payload = {
      ...rest,
      tags: rest.tags
        ? rest.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [],
    };

    // Update status separately via PATCH if it changed
    if (status !== activeTask?.status) {
      await dispatch(
        updateTaskStatus(projectId, activeTask.id, status)
      );
    }

    await dispatch(editTask(projectId, activeTask.id, payload));

    onSuccess?.();
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
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          >
            {Object.values(TASK_STATUS).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          >
            {Object.values(TASK_PRIORITY).map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Input
        label="Due Date"
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
      />

      <Input
        label="Tags"
        name="tags"
        value={formData.tags}
        onChange={handleChange}
        placeholder="frontend, backend, api"
      />

      {formError && <p className="text-sm text-red-500">{formError}</p>}

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Updating..." : "Update Task"}
      </Button>
    </form>
  );
}

export default UpdateTaskForm;
