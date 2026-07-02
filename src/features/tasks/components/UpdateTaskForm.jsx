import { useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Input from "../../../components/common/Input";
import TextArea from "../../../components/common/TextArea";
import ActionButton from "../../../components/shared/ActionButton";
import Dropdown from "../../../components/common/Dropdown";
import DatePicker from "../../../components/common/DatePicker";

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

  const handleSubmit = useCallback(async (e) => {
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
  }, [dispatch, activeTask, projectId, formData, onSuccess]);

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
          <label className="text-sm font-medium text-[var(--text-main)]">Status</label>
          <Dropdown
            fullWidth
            label={formData.status}
            onSelect={(val) => handleChange({ target: { name: "status", value: val } })}
            items={Object.values(TASK_STATUS).map((status) => ({
              label: status,
              value: status,
            }))}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--text-main)]">Priority</label>
          <Dropdown
            fullWidth
            label={formData.priority}
            onSelect={(val) => handleChange({ target: { name: "priority", value: val } })}
            items={Object.values(TASK_PRIORITY).map((priority) => ({
              label: priority,
              value: priority,
            }))}
          />
        </div>
      </div>

      <DatePicker
        label="Due Date"
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

      <div className="flex justify-end mt-4">
        <ActionButton
          type="submit"
          text={isLoading ? "Updating..." : "Update Task"}
          className="w-max px-8 h-[48px]"
          disabled={isLoading}
        />
      </div>
    </form>
  );
}

export default UpdateTaskForm;
