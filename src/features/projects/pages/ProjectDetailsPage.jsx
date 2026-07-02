import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { fetchProject, deleteProject } from "../redux/projectThunk";
import { fetchTasks } from "../../tasks/redux/taskThunk";
import { removeProjectMemberApi } from "../api/projectApi";

import ActionButton from "../../../components/shared/ActionButton";
import { Edit, UserPlus, Plus, Trash2 } from "lucide-react";
import Modal from "../../../components/common/Modal";

import ProjectDetails from "../components/ProjectDetails";
import UpdateProjectForm from "../components/UpdateProjectForm";
import AddMemberModal from "../components/AddMemberModal";
import { ConfirmDialog } from "../../../components/ui/ConfirmDialog";
import TaskForm from "../../tasks/components/TaskForm";
import ProjectJoinRequests from "../components/ProjectJoinRequests";

import { isAdmin } from "../../../utils/roleUtils";

import { showSuccessToast, showErrorToast } from "../../../lib/toast";

function ProjectDetailsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const projectId = id;

  const { selectedProject, isLoading } = useSelector((state) => state.projects);
  const { tasks } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);
  const admin = isAdmin(user);

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProject(projectId));
      dispatch(fetchTasks(projectId));
    }
  }, [dispatch, projectId]);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const handleOpenEdit = useCallback(() => setIsEditOpen(true), []);
  const handleOpenAddMember = useCallback(() => setIsAddMemberOpen(true), []);
  const handleOpenAddTask = useCallback(() => setIsAddTaskOpen(true), []);
  const handleOpenDelete = useCallback(() => setIsDeleteConfirmOpen(true), []);

  const handleRemoveMember = async (email) => {
    try {
      await removeProjectMemberApi(projectId, email);
      showSuccessToast("Member removed");
      dispatch(fetchProject(projectId));
    } catch (error) {
      showErrorToast(
        error.response?.data?.message || "Failed to remove member"
      );
    }
  };

  if (isLoading) {
    return <p>Loading project...</p>;
  }

  if (!selectedProject) {
    return <p>Project not found</p>;
  }

  const actions = (
    <>
      {admin && (
        <>
          <ActionButton
            text="Edit Project"
            icon={Edit}
            bgClass="bg-[var(--bg-panel-hover)]"
            textClass="text-[var(--text-main)]"
            borderClass="border border-[var(--border-color)]"
            hoverBgClass="hover:bg-[var(--bg-panel)]"
            iconColor="text-[var(--text-main)]"
            onClick={handleOpenEdit}
            roundedClass="rounded-xl"
            className="px-4 h-full shadow-md"
          />

          <ActionButton
            text="Add Member"
            icon={UserPlus}
            bgClass="bg-[var(--bg-panel-hover)]"
            textClass="text-[var(--text-main)]"
            borderClass="border border-[var(--border-color)]"
            hoverBgClass="hover:bg-[var(--bg-panel)]"
            iconColor="text-[var(--text-main)]"
            onClick={handleOpenAddMember}
            roundedClass="rounded-xl"
            className="px-4 h-full shadow-md"
          />
        </>
      )}

      <ActionButton
        text="Add Task"
        icon={Plus}
        onClick={handleOpenAddTask}
        roundedClass="rounded-xl"
        className="px-4 h-full shadow-md"
      />

      {admin && (
        <ActionButton
          text="Delete"
          icon={Trash2}
          bgClass="bg-[var(--color-danger)]"
          hoverBgClass="hover:bg-red-600"
          onClick={handleOpenDelete}
          roundedClass="rounded-xl"
          className="px-4 h-full shadow-md"
        />
      )}
    </>
  );

  return (
    <div className="space-y-6">
      <ProjectDetails
        project={{ ...selectedProject, tasks: tasks || [] }}
        actions={actions}
        onRemoveMember={admin ? handleRemoveMember : undefined}
        currentUserEmail={user?.email}
      />

      {admin && (
        <ProjectJoinRequests
          projectId={projectId}
          onMemberAdded={() => dispatch(fetchProject(projectId))}
        />
      )}

      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Update Project"
      >
        <UpdateProjectForm
          project={selectedProject}
          onSuccess={() => {
            setIsEditOpen(false);
            if (projectId) {
              dispatch(fetchProject(projectId));
            }
          }}
        />
      </Modal>

      <AddMemberModal
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
        projectId={projectId}
        onSuccess={() => {
          if (projectId) {
            dispatch(fetchProject(projectId));
          }
        }}
      />

      <Modal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        title="Add Task"
      >
        <TaskForm
          onSuccess={() => {
            setIsAddTaskOpen(false);
            dispatch(fetchProject(projectId));
            dispatch(fetchTasks(projectId));
          }}
        />
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        title="Delete Project"
        message={`Are you sure you want to delete "${selectedProject?.name}"? This action cannot be undone.`}
        onConfirm={async () => {
          await dispatch(deleteProject(projectId));
          navigate("/projects");
        }}
      />
    </div>
  );
}

export default ProjectDetailsPage;
