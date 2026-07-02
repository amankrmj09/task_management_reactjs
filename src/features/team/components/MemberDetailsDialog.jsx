import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/common/Modal";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import RoleBadge from "./RoleBadge";

import { changeUserRole } from "../redux/teamThunk";
import { removeProjectMemberApi } from "../../projects/api/projectApi";
import { fetchProjects } from "../../projects/redux/projectThunk";
import { showSuccessToast, showErrorToast } from "../../../lib/toast";

function MemberDetailsDialog({ member, isOpen, onClose }) {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);

  const [pendingRole, setPendingRole] = useState(member?.role);
  const [removedProjectIds, setRemovedProjectIds] = useState(new Set());
  const [isSaving, setIsSaving] = useState(false);

  // Sync state when modal opens with a new member
  useEffect(() => {
    if (member) {
      setPendingRole(member.role);
      setRemovedProjectIds(new Set());
    }
  }, [member]);

  if (!member) return null;

  // Filter projects where this member is part of the members array
  // Also, exclude projects that the user has marked for removal in this session
  const memberProjects = projects?.filter(
    (p) => 
      !removedProjectIds.has(p.id) && 
      p.members?.some((m) => m.id === member.id || m.email === member.email)
  ) || [];

  const handleToggleRole = () => {
    setPendingRole((prev) => (prev === "ADMIN" ? "MEMBER" : "ADMIN"));
  };

  const handleRemoveProject = (projectId) => {
    setRemovedProjectIds((prev) => {
      const newSet = new Set(prev);
      newSet.add(projectId);
      return newSet;
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // 1. Process role change if it was modified
      if (pendingRole !== member.role) {
        await dispatch(changeUserRole(member.id, pendingRole));
      }

      // 2. Process all project removals
      if (removedProjectIds.size > 0) {
        const removalPromises = Array.from(removedProjectIds).map((projectId) =>
          removeProjectMemberApi(projectId, member.email)
        );
        
        await Promise.allSettled(removalPromises);
        
        // Refresh global projects list to reflect the removals across the app
        dispatch(fetchProjects());
      }

      showSuccessToast("Member details updated successfully");
      onClose();
    } catch (error) {
      showErrorToast("Failed to save all changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Member Details">
      <div className="space-y-6">
        {/* Basic Info (Read-only) */}
        <div className="space-y-4">
          <Input 
            label="Name" 
            value={member.name} 
            readOnly 
            disabled 
          />
          <Input 
            label="Email" 
            value={member.email} 
            readOnly 
            disabled 
          />
        </div>

        {/* Role Section */}
        <div className="rounded-xl border border-[var(--border-color)] p-4 bg-[var(--bg-panel-hover)]/30">
          <h3 className="mb-3 font-semibold text-[var(--text-main)] text-sm uppercase tracking-wider">Role</h3>
          <div className="flex items-center justify-between">
            <RoleBadge role={pendingRole} />
            <Button size="sm" variant="secondary" onClick={handleToggleRole}>
              Make {pendingRole === "ADMIN" ? "Member" : "Admin"}
            </Button>
          </div>
        </div>

        {/* Projects Section */}
        <div className="rounded-xl border border-[var(--border-color)] p-4 bg-[var(--bg-panel-hover)]/30">
          <h3 className="mb-3 font-semibold text-[var(--text-main)] text-sm uppercase tracking-wider">Associated Projects</h3>
          
          {memberProjects.length === 0 ? (
            <p className="text-sm text-[var(--text-muted)] italic">
              This member is not part of any projects.
            </p>
          ) : (
            <div className="space-y-2">
              {memberProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="flex items-center justify-between rounded-lg border border-[var(--border-color)] bg-[var(--bg-panel)] p-3"
                >
                  <div className="truncate pr-4">
                    <p className="font-medium text-[var(--text-main)] truncate">{project.name}</p>
                    <p className="text-xs text-[var(--text-muted)] truncate">{project.description}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveProject(project.id)}
                    className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border-color)]">
          <Button variant="secondary" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default MemberDetailsDialog;
