import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProjects, deleteProject } from "../redux/projectThunk";
import { requestJoinProjectApi } from "../api/projectApi";

import Modal from "../../../components/common/Modal";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";

import PaginationControls from "../../../components/common/PaginationControls";

import ProjectHeader from "../components/ProjectHeader";
import ProjectList from "../components/ProjectList";
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

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleDeleteProject = async (projectId) => {
    await dispatch(deleteProject(projectId));
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
              <Button className="!px-4 !py-2 h-[42px]" onClick={() => setIsCreateOpen(true)}>
                New Project
              </Button>
            ) : (
              <Button
                variant="secondary"
                className="!px-4 !py-2 h-[42px]"
                onClick={() => setIsJoinOpen(true)}
              >
                Request to Join
              </Button>
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
          <ProjectList projects={projects} />
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

          <Button
            type="submit"
            className="w-full"
            disabled={joinLoading || !joinProjectId.trim()}
          >
            {joinLoading ? "Requesting..." : "Request to Join"}
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export default ProjectsPage;
