import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import {
  addTaskComment,
  fetchTask,
  editTask,
  updateTaskStatus,
  deleteTask,
} from "../redux/taskThunk";

import Button from "../../../components/common/Button";
import Modal from "../../../components/common/Modal";

import TaskDetails from "../components/TaskDetails";
import UpdateTaskForm from "../components/UpdateTaskForm";
import AssignTaskModal from "../components/AssignTaskModal";

const STATUS_FLOW = ["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"];

const STATUS_CONFIG = {
  TODO: {
    label: "To Do",
    color: "bg-slate-500",
    activeColor: "bg-slate-600 ring-2 ring-slate-300",
    icon: "○",
  },
  IN_PROGRESS: {
    label: "In Progress",
    color: "bg-yellow-500",
    activeColor: "bg-yellow-600 ring-2 ring-yellow-300",
    icon: "◐",
  },
  IN_REVIEW: {
    label: "In Review",
    color: "bg-blue-500",
    activeColor: "bg-blue-600 ring-2 ring-blue-300",
    icon: "◑",
  },
  DONE: {
    label: "Done",
    color: "bg-green-500",
    activeColor: "bg-green-600 ring-2 ring-green-300",
    icon: "●",
  },
};

function TaskDetailsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const taskId = id;

  const [comment, setComment] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);

  const { selectedTask, isLoading } = useSelector((state) => state.tasks);

  const { selectedProject } = useSelector((state) => state.projects);

  useEffect(() => {
    if (selectedProject?.id && taskId) {
      dispatch(fetchTask(selectedProject.id, taskId));
    }
  }, [dispatch, selectedProject, taskId]);

  const currentStatusIndex = STATUS_FLOW.indexOf(
    selectedTask?.status
  );

  const handleStatusChange = async (status) => {
    if (!selectedProject?.id || !taskId) return;

    setStatusLoading(true);
    await dispatch(updateTaskStatus(selectedProject.id, taskId, status));
    await dispatch(fetchTask(selectedProject.id, taskId));
    setStatusLoading(false);
  };

  const handleAddComment = async () => {
    if (!comment.trim()) return;
    if (!selectedProject?.id || !taskId) return;

    await dispatch(
      addTaskComment(selectedProject.id, taskId, {
        text: comment,
      })
    );

    setComment("");
    dispatch(fetchTask(selectedProject.id, taskId));
  };

  const handleAssign = (assigneeEmail) => {
    if (!selectedProject?.id || !taskId) return;

    dispatch(
      editTask(selectedProject.id, taskId, {
        assigneeEmail,
      })
    );
  };

  if (isLoading) {
    return <p>Loading task...</p>;
  }

  if (!selectedTask) {
    return <p>Task not found</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Task Details</h1>
          <p className="mt-1 text-gray-500">Review and update task progress</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={() => setIsAssignOpen(true)}>
            Assign Task
          </Button>
          <Button onClick={() => setIsEditOpen(true)}>Edit Task</Button>
          <button
            type="button"
            onClick={async () => {
              if (!window.confirm(`Delete "${selectedTask.title}"? This cannot be undone.`)) return;
              if (!selectedProject?.id) return;
              await dispatch(deleteTask(selectedProject.id, taskId));
              navigate("/tasks");
            }}
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      </div>

      <TaskDetails task={selectedTask} />

      {/* Status Pipeline */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Status
        </h2>

        <div className="flex flex-wrap items-center gap-2">
          {STATUS_FLOW.map((status, index) => {
            const config = STATUS_CONFIG[status];
            const isCurrent = selectedTask?.status === status;
            const isNext = index === currentStatusIndex + 1;
            const isPrev = index === currentStatusIndex - 1;
            const isPast = index < currentStatusIndex;
            const canClick = (isNext || isPrev) && !statusLoading;

            return (
              <div key={status} className="flex items-center gap-2">
                {index > 0 && (
                  <div
                    className={`hidden h-0.5 w-6 sm:block ${
                      isPast || isCurrent ? "bg-green-400" : "bg-gray-200"
                    }`}
                  />
                )}

                <button
                  type="button"
                  disabled={!canClick}
                  onClick={() => canClick && handleStatusChange(status)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition ${
                    isCurrent
                      ? config.activeColor + " scale-105"
                      : isPast
                      ? "bg-green-400"
                      : canClick
                      ? config.color +
                        " opacity-80 hover:opacity-100 hover:scale-105 cursor-pointer"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                  title={
                    isCurrent
                      ? "Current status"
                      : canClick
                      ? `Move to ${config.label}`
                      : `Cannot jump to ${config.label}`
                  }
                >
                  <span className="mr-1.5">{config.icon}</span>
                  {config.label}
                </button>
              </div>
            );
          })}
        </div>

        {statusLoading && (
          <p className="mt-3 text-sm text-gray-500">Updating status...</p>
        )}
      </div>

      {/* Comments */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-2xl font-semibold text-gray-800">Comments</h2>

        <div className="space-y-4">
          {selectedTask.comments?.length > 0 ? (
            selectedTask.comments.map((c) => (
              <div key={c.id} className="rounded-xl border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                      {c.authorName?.charAt(0)?.toUpperCase() ||
                        c.user?.name?.charAt(0)?.toUpperCase() ||
                        c.author?.name?.charAt(0)?.toUpperCase() ||
                        "?"}
                    </div>

                    <h3 className="font-semibold text-gray-800">
                      {c.authorName || c.user?.name || c.author?.name || "Unknown"}
                    </h3>
                  </div>

                  <p className="text-sm text-gray-500">
                    {c.createdAt
                      ? new Date(c.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </p>
                </div>

                <p className="mt-3 text-gray-700">{c.content || c.text}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet</p>
          )}
        </div>

        <div className="mt-6">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="min-h-[120px] w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-blue-500"
          />

          <button
            onClick={handleAddComment}
            className="mt-4 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Add Comment
          </button>
        </div>
      </div>

      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Update Task"
      >
        <UpdateTaskForm
          task={selectedTask}
          onSuccess={() => {
            setIsEditOpen(false);
            if (selectedProject?.id && taskId) {
              dispatch(fetchTask(selectedProject.id, taskId));
            }
          }}
        />
      </Modal>

      <AssignTaskModal
        isOpen={isAssignOpen}
        onClose={() => setIsAssignOpen(false)}
        members={selectedProject?.members || []}
        onAssign={handleAssign}
      />
    </div>
  );
}

export default TaskDetailsPage;
