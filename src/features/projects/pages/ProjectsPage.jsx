import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProjects, deleteProject } from "../redux/projectThunk";
import { requestJoinProjectApi } from "../api/projectApi";

import Modal from "../../../components/common/Modal";
import ActionButton from "../../../components/shared/ActionButton";
import { Plus, UserPlus } from "lucide-react";
import Input from "../../../components/common/Input";

import PaginationControls from "../../../components/common/PaginationControls";

import ProjectHeader from "../components/ProjectHeader";
import ProjectList from "../components/ProjectList";
import { ConfirmDialog } from "../../../components/ui/ConfirmDialog";
import CreateProjectForm from "../components/CreateProjectForm";
import ProjectSearchDropdown from "../components/ProjectSearchDropdown";

import { isAdmin } from "../../../utils/roleUtils";
import { showSuccessToast, showErrorToast } from "../../../lib/toast";

function ProjectsPage() {
  const dispatch = useDispatch();

  const { projects, pagination, isLoading, error } = useSelector(
    (state) => state.projects
  );
  const { user } = useSelector((state) => state.auth);

  const admin = isAdmin(user);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [joinProjectId, setJoinProjectId] = useState("");
  const [joinLoading, setJoinLoading] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleOpenCreate = useCallback(() => setIsCreateOpen(true), []);
  const handleOpenJoin = useCallback(() => setIsJoinOpen(true), []);

  const handleDeleteProject = async () => {
    if (projectToDelete) {
      await dispatch(deleteProject(projectToDelete.id));
      setProjectToDelete(null);
    }
  };

  const handleJoinRequest = async (e) => {
    e.preventDefault();

    if (!joinProjectId.trim()) return;

    setJoinLoading(true);

    try {
      await requestJoinProjectApi(joinProjectId);

      showSuccessToast("Join request sent successfully!");
      setIsJoinOpen(false);
      setJoinProjectId("");
    } catch (err) {
      showErrorToast(
        err.response?.data?.message || "Failed to send join request"
      );
    } finally {
      setJoinLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <ProjectHeader
        title="Projects"
        subtitle="Manage all your projects"
        actions={
          <>
            {admin ? (
              <ActionButton 
                text="New Project" 
                icon={Plus} 
                onClick={handleOpenCreate} 
                roundedClass="rounded-xl"
                className="px-4 h-full shadow-md" 
              />
            ) : (
              <ActionButton
                text="Request to Join"
                icon={UserPlus}
                bgClass="bg-[var(--bg-panel-hover)]"
                textClass="text-[var(--text-main)]"
                borderClass="border border-[var(--border-color)]"
                hoverBgClass="hover:bg-[var(--bg-panel)]"
                iconColor="text-[var(--text-main)]"
                onClick={handleOpenJoin}
                roundedClass="rounded-xl"
                className="px-4 h-full shadow-md"
              />
            )}
          </>
        }
      />

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {isLoading ? (
        <p>Loading projects...</p>
      ) : (
        <div className="space-y-4">
          <ProjectList 
            projects={projects} 
            onDeleteProject={(id) => {
              const project = projects.find(p => p.id === id);
              if (project) setProjectToDelete(project);
            }} 
          />
          <div className="flex justify-end mt-4">
            <PaginationControls
              pageNumber={pagination?.page || 0}
              totalPages={pagination?.totalPages || 0}
              isLast={pagination?.page >= (pagination?.totalPages || 1) - 1}
              onPrevious={() => dispatch(fetchProjects({ page: pagination.page - 1 }))}
              onNext={() => dispatch(fetchProjects({ page: pagination.page + 1 }))}
            />
          </div>
        </div>
      )}

      {/* Admin: Create Project Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create Project"
      >
        <CreateProjectForm onSuccess={() => setIsCreateOpen(false)} />
      </Modal>

      {/* Member: Request to Join Modal */}
      <Modal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
        title="Request to Join Project"
      >
        <form onSubmit={handleJoinRequest} className="space-y-5">
          <ProjectSearchDropdown
            value={joinProjectId}
            onChange={setJoinProjectId}
          />

          <p className="text-sm text-[var(--text-muted)]">
            A request will be sent to the project administrators.
          </p>

          <div className="flex justify-end mt-4">
            <ActionButton
              type="submit"
              text={joinLoading ? "Requesting..." : "Request to Join"}
              disabled={joinLoading || !joinProjectId.trim()}
              className="w-max px-8 h-[48px]"
            />
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!projectToDelete}
        onClose={() => setProjectToDelete(null)}
        title="Delete Project"
        message={`Are you sure you want to delete "${projectToDelete?.name}"? This action cannot be undone.`}
        onConfirm={handleDeleteProject}
      />
    </div>
  );
}

export default ProjectsPage;
