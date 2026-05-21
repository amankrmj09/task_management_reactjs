import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchMembers } from "../redux/teamThunk";

import { addMember } from "../redux/teamSlice";

import TeamHeader from "../components/TeamHeader";
import TeamList from "../components/TeamList";
import InviteMemberModal from "../components/InviteMemberModal";

import { showErrorToast, showSuccessToast } from "../../../lib/toast";

function TeamPage() {
  const dispatch = useDispatch();

  const { members, isLoading, error } = useSelector((state) => state.team);

  const [isInviteOpen, setIsInviteOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchMembers());
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

  return (
    <div className="space-y-6">
      <TeamHeader onInvite={() => setIsInviteOpen(true)} />

      {error && <p className="text-sm text-red-500">{error}</p>}

      {isLoading ? <p>Loading members...</p> : <TeamList members={members} />}

      <InviteMemberModal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        onInvite={handleInvite}
      />
    </div>
  );
}

export default TeamPage;
