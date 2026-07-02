import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchMembers, deleteUser } from "../redux/teamThunk";
import { addMember } from "../redux/teamSlice";
import { fetchProjects } from "../../projects/redux/projectThunk";

import TeamHeader from "../components/TeamHeader";
import TeamList from "../components/TeamList";
import InviteMemberModal from "../components/InviteMemberModal";
import MemberDetailsDialog from "../components/MemberDetailsDialog";

import PaginationControls from "../../../components/common/PaginationControls";

import { showErrorToast, showSuccessToast } from "../../../lib/toast";

function TeamPage() {
  const dispatch = useDispatch();

  const { members, pagination, isLoading, error } = useSelector((state) => state.team);

  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    dispatch(fetchMembers(0, 10));
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleInvite = (email) => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      showErrorToast("Email is required");
      return;
    }

    const name = trimmedEmail.split("@")[0] || "Invited";
    const newMember = {
      id: `invite-${Date.now()}`,
      name: name
        .replace(/[._-]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase()),
      email: trimmedEmail,
      role: "INVITED",
    };

    dispatch(addMember(newMember));
    showSuccessToast("Invitation sent");
    setIsInviteOpen(false);
  };

  const handleDelete = (memberId) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      dispatch(deleteUser(memberId));
    }
  };

  return (
    <div className="space-y-6">
      <TeamHeader onInvite={() => setIsInviteOpen(true)} />

      {error && <p className="text-sm text-red-500">{error}</p>}

      {isLoading ? (
        <p>Loading members...</p>
      ) : (
        <div className="space-y-4">
          <TeamList 
            members={members} 
            onEdit={setSelectedMember} 
            onDelete={handleDelete}
          />
          <div className="flex justify-end mt-4">
            <PaginationControls
              pageNumber={pagination?.page || 0}
              totalPages={pagination?.totalPages || 0}
              isLast={pagination?.page >= (pagination?.totalPages || 1) - 1}
              onPrevious={() => dispatch(fetchMembers(pagination.page - 1, 10))}
              onNext={() => dispatch(fetchMembers(pagination.page + 1, 10))}
            />
          </div>
        </div>
      )}

      <InviteMemberModal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        onInvite={handleInvite}
      />

      <MemberDetailsDialog
        member={selectedMember}
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  );
}

export default TeamPage;
