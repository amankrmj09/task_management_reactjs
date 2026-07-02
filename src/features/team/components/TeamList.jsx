import { useCallback } from "react";
import RoleBadge from "./RoleBadge";
import ActionButton from "../../../components/shared/ActionButton";
import { Edit, Trash2, UserMinus } from "lucide-react";

function TeamList({ members, onEdit, onDelete }) {
  const handleEditClick = useCallback((member) => {
    if (onEdit) onEdit(member);
  }, [onEdit]);

  const handleDeleteClick = useCallback((id) => {
    if (onDelete) onDelete(id);
  }, [onDelete]);

  if (!members?.length) {
    return (
      <div className="rounded-2xl glass-card p-10 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-[var(--text-main)]">
          No Members Found
        </h2>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl glass-card shadow-sm border border-[var(--border-color)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-[var(--text-main)]">
          <thead className="bg-[var(--bg-panel-hover)] text-xs uppercase text-[var(--text-muted)] border-b border-[var(--border-color)]">
            <tr>
              <th className="px-6 py-4 font-medium w-16">S.No.</th>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)]">
            {members.map((member, index) => (
              <tr key={member.id} className="transition-colors hover:bg-[var(--bg-panel-hover)]/50">
                <td className="px-6 py-4 text-[var(--text-muted)]">{index + 1}</td>
                <td className="px-6 py-4 font-medium">{member.name}</td>
                <td className="px-6 py-4 text-[var(--text-muted)]">{member.email}</td>
                <td className="px-6 py-4">
                  <RoleBadge role={member.role} />
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    {member.role !== "INVITED" && (
                      <ActionButton
                        text="Edit"
                        icon={Edit}
                        bgClass="bg-[var(--bg-panel-hover)]"
                        textClass="text-[var(--text-main)]"
                        borderClass="border border-[var(--border-color)]"
                        hoverBgClass="hover:bg-[var(--bg-panel)]"
                        iconColor="text-[var(--text-main)]"
                        className="px-4 h-[36px] text-sm shadow-sm inline-flex w-max"
                        onClick={() => handleEditClick(member)}
                      />
                    )}
                    <ActionButton
                      text={member.role === "INVITED" ? "Remove" : "Delete"}
                      icon={member.role === "INVITED" ? UserMinus : Trash2}
                      bgClass="bg-[var(--color-danger)]"
                      hoverBgClass="hover:bg-red-600"
                      className="px-4 h-[36px] text-sm shadow-sm inline-flex w-max"
                      onClick={() => handleDeleteClick(member.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeamList;