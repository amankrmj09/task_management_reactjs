import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, Check } from "lucide-react";

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
import { ConfirmDialog } from "../../../components/ui/ConfirmDialog";

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
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(null);
  const [successStatus, setSuccessStatus] = useState(null);

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

    setLoadingStatus(status);
    try {
      await dispatch(updateTaskStatus(selectedProject.id, taskId, status));
      setSuccessStatus(status);
      await dispatch(fetchTask(selectedProject.id, taskId));
      setTimeout(() => setSuccessStatus(null), 1000);
    } finally {
      setLoadingStatus(null);
    }
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
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-main)] flex items-center gap-2 leading-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-primary)] shrink-0"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
            Task Details
          </h1>
          <p className="text-[var(--text-muted)] text-sm mt-1">Review and update task progress</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={() => setIsAssignOpen(true)}>
            Assign Task
          </Button>
          <Button onClick={() => setIsEditOpen(true)}>Edit Task</Button>
          <button
            type="button"
            onClick={() => setIsDeleteConfirmOpen(true)}
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      </div>

      <TaskDetails task={selectedTask} />

      {/* Status Pipeline */}
      <div className="rounded-2xl glass-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-[var(--text-main)]">
          Status
        </h2>

        <div className="flex flex-wrap items-center gap-2">
          {STATUS_FLOW.map((status, index) => {
            const config = STATUS_CONFIG[status];
            const isCurrent = selectedTask?.status === status;
            const isNext = index === currentStatusIndex + 1;
            const isPrev = index === currentStatusIndex - 1;
            const isPast = index < currentStatusIndex;
            const isLoadingThis = loadingStatus === status;
            const isSuccessThis = successStatus === status;
            const canClick = (isNext || isPrev) && !loadingStatus;

            return (
              <div key={status} className="flex items-center gap-2">
                {index > 0 && (
                  <div
                    className={`hidden h-0.5 w-6 sm:block ${
                      isPast || isCurrent || isSuccessThis ? "bg-green-400" : "bg-[var(--bg-panel-hover)]"
                    }`}
                  />
                )}

                <button
                  type="button"
                  disabled={!canClick && !isLoadingThis}
                  onClick={() => canClick && handleStatusChange(status)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition flex items-center ${
                    isSuccessThis
                      ? "bg-green-500 scale-105"
                      : isCurrent
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
                  {isLoadingThis ? (
                    <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                  ) : isSuccessThis ? (
                    <Check className="mr-1.5 h-4 w-4" />
                  ) : (
                    <span className="mr-1.5">{config.icon}</span>
                  )}
                  {config.label}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comments */}
      <div className="rounded-2xl glass-card p-6 shadow-sm">
        <h2 className="mb-5 text-2xl font-semibold text-[var(--text-main)]">Comments</h2>

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

                    <h3 className="font-semibold text-[var(--text-main)]">
                      {c.authorName || c.user?.name || c.author?.name || "Unknown"}
                    </h3>
                  </div>

                  <p className="text-sm text-[var(--text-muted)]">
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

                <p className="mt-3 text-[var(--text-main)]">{c.content || c.text}</p>
              </div>
            ))
          ) : (
            <p className="text-[var(--text-muted)]">No comments yet</p>
          )}
        </div>

        <div className="mt-6">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="min-h-[120px] w-full rounded-xl border border-[var(--border-color)] p-4 outline-none focus:border-[var(--color-primary)]"
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

      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        title="Delete Task"
        message={`Are you sure you want to delete "${selectedTask?.title}"? This action cannot be undone.`}
        onConfirm={async () => {
          if (!selectedProject?.id) return;
          await dispatch(deleteTask(selectedProject.id, taskId));
          navigate("/tasks");
        }}
      />
    </div>
  );
}

export default TaskDetailsPage;
