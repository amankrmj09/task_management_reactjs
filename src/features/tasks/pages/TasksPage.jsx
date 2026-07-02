import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTasks, deleteTask } from "../redux/taskThunk";
import {
  fetchProjects,
  fetchProject,
} from "../../projects/redux/projectThunk";

import Button from "../../../components/common/Button";
import Modal from "../../../components/common/Modal";
import Dropdown from "../../../components/common/Dropdown";

import TaskHeader from "../components/TaskHeader";
import TaskList from "../components/TaskList";
import TaskFilters from "../components/TaskFilters";
import TaskForm from "../components/TaskForm";
import KanbanBoard from "../components/KanbanBoard";

import PaginationControls from "../../../components/common/PaginationControls";

function TasksPage() {
  const dispatch = useDispatch();

  const { tasks, pagination, filters, isLoading } = useSelector(
    (state) => state.tasks
  );

  const { projects, selectedProject } = useSelector(
    (state) => state.projects
  );

  const [viewMode, setViewMode] = useState("list");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (selectedProject?.id) {
      if (viewMode === "kanban") {
        dispatch(fetchTasks(selectedProject.id, { ...filters, unpaginated: true }));
      } else {
        dispatch(fetchTasks(selectedProject.id, { ...filters, page: 0 }));
      }
    }
  }, [dispatch, selectedProject, filters, viewMode]);

  const handleProjectChange = (e) => {
    const projectId = e.target.value;

    if (projectId) {
      dispatch(fetchProject(projectId));
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!selectedProject?.id) return;
    await dispatch(deleteTask(selectedProject.id, taskId));
  };

  return (
    <div className="space-y-6">
      <TaskHeader
        actions={
          <>
            <Dropdown
              label={selectedProject ? selectedProject.name : "Select Project"}
              items={projects.map((project) => ({ label: project.name, value: project.id }))}
              onSelect={(value) => handleProjectChange({ target: { value } })}
            />

            <div className="flex items-center gap-2 rounded-xl border border-[var(--border-color)] glass-card p-1">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "text-[var(--text-muted)] hover:bg-[var(--bg-panel-hover)]"
                }`}
              >
                List
              </button>
              <button
                type="button"
                onClick={() => setViewMode("kanban")}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  viewMode === "kanban"
                    ? "bg-blue-600 text-white"
                    : "text-[var(--text-muted)] hover:bg-[var(--bg-panel-hover)]"
                }`}
              >
                Kanban
              </button>
            </div>

            <Button
              className="!px-4 !text-sm"
              onClick={() => setIsCreateOpen(true)}
              disabled={!selectedProject?.id}
            >
              New Task
            </Button>
          </>
        }
      />

      {!selectedProject?.id ? (
        <div className="rounded-2xl glass-card p-10 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-[var(--text-main)]">
            No Project Selected
          </h2>

          <p className="mt-2 text-[var(--text-muted)]">
            Select a project from the dropdown above to view its tasks.
          </p>
        </div>
      ) : (
        <>
          <TaskFilters />

          {isLoading ? (
            <p>Loading tasks...</p>
          ) : viewMode === "kanban" ? (
            <KanbanBoard tasks={tasks || []} />
          ) : (
            <div className="space-y-4">
              <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
              <div className="flex justify-end mt-4">
                <PaginationControls
                  pageNumber={pagination?.page || 0}
                  totalPages={pagination?.totalPages || 0}
                  isLast={pagination?.page >= (pagination?.totalPages || 1) - 1}
                  onPrevious={() =>
                    dispatch(fetchTasks(selectedProject.id, { ...filters, page: pagination.page - 1 }))
                  }
                  onNext={() =>
                    dispatch(fetchTasks(selectedProject.id, { ...filters, page: pagination.page + 1 }))
                  }
                />
              </div>
            </div>
          )}
        </>
      )}

      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create Task"
      >
        <TaskForm onSuccess={() => setIsCreateOpen(false)} />
      </Modal>
    </div>
  );
}

export default TasksPage;
