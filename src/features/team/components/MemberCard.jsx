import { useDispatch } from "react-redux";

import RoleBadge from "./RoleBadge";

import { changeUserRole, deleteUser } from "../redux/teamThunk";

function MemberCard({ member }) {
  const dispatch = useDispatch();

  const isInvited = member.role === "INVITED";

  const handleRoleChange = (role) => {
    dispatch(changeUserRole(member.id, role));
  };

  const handleDelete = () => {
    dispatch(deleteUser(member.id));
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{member.name}</h2>

          <p className="mt-1 text-sm text-gray-500">{member.email}</p>
        </div>

        <RoleBadge role={member.role} />
      </div>

      {isInvited ? (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Invitation pending
          </p>
          <button
            onClick={handleDelete}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white"
          >
            Remove
          </button>
        </div>
      ) : (
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => handleRoleChange("ADMIN")}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white"
          >
            Make Admin
          </button>

          <button
            onClick={() => handleRoleChange("MEMBER")}
            className="rounded-xl bg-gray-700 px-4 py-2 text-sm font-medium text-white"
          >
            Make Member
          </button>

          <button
            onClick={handleDelete}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default MemberCard;
