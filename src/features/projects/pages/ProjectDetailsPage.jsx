import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { fetchProject, deleteProject } from "../redux/projectThunk";
import { fetchTasks } from "../../tasks/redux/taskThunk";
import { removeProjectMemberApi } from "../api/projectApi";

import Button from "../../../components/common/Button";
import Modal from "../../../components/common/Modal";

import ProjectDetails from "../components/ProjectDetails";
import UpdateProjectForm from "../components/UpdateProjectForm";
import AddMemberModal from "../components/AddMemberModal";
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
          <Button variant="secondary" onClick={() => setIsEditOpen(true)}>
            Edit Project
          </Button>

          <Button onClick={() => setIsAddMemberOpen(true)}>Add Member</Button>
        </>
      )}

      <Button onClick={() => setIsAddTaskOpen(true)}>Add Task</Button>

      {admin && (
        <button
          type="button"
          onClick={async () => {
            if (!window.confirm(`Delete "${selectedProject.name}"? This cannot be undone.`)) return;
            await dispatch(deleteProject(projectId));
            navigate("/projects");
          }}
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
        >
          Delete
        </button>
      )}
    </>
  );

  return (
    <div className="space-y-6">
      <ProjectDetails
        project={{ ...selectedProject, tasks: tasks || [] }}
        actions={actions}
        onRemoveMember={admin ? handleRemoveMember : undefined}
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
    </div>
  );
}

export default ProjectDetailsPage;
