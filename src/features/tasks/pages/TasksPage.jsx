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

function TasksPage() {
  const dispatch = useDispatch();

  const { tasks, filters, isLoading } = useSelector(
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
      dispatch(fetchTasks(selectedProject.id, filters));
    }
  }, [dispatch, selectedProject, filters]);

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

            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-1">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
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
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Kanban
              </button>
            </div>

            <Button
              onClick={() => setIsCreateOpen(true)}
              disabled={!selectedProject?.id}
            >
              New Task
            </Button>
          </>
        }
      />

      {!selectedProject?.id ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700">
            No Project Selected
          </h2>

          <p className="mt-2 text-gray-500">
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
            <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
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
