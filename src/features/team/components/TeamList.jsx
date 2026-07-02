import RoleBadge from "./RoleBadge";
import Button from "../../../components/common/Button";

function TeamList({ members, onEdit, onDelete }) {
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
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)]">
            {members.map((member) => (
              <tr key={member.id} className="transition-colors hover:bg-[var(--bg-panel-hover)]/50">
                <td className="px-6 py-4 font-medium">{member.name}</td>
                <td className="px-6 py-4 text-[var(--text-muted)]">{member.email}</td>
                <td className="px-6 py-4">
                  <RoleBadge role={member.role} />
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    {member.role !== "INVITED" && (
                      <Button size="sm" onClick={() => onEdit(member)}>
                        Edit
                      </Button>
                    )}
                    <Button size="sm" variant="danger" className="!bg-red-600 !text-white" onClick={() => onDelete(member.id)}>
                      {member.role === "INVITED" ? "Remove" : "Delete"}
                    </Button>
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