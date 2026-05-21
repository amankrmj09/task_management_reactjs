import { useState } from "react";

function MemberList({ members = [], onRemove }) {
  const [removingId, setRemovingId] = useState(null);

  if (!members.length) {
    return (
      <p className="text-gray-500">
        No members found
      </p>
    );
  }

  const handleRemove = async (memberId) => {
    setRemovingId(memberId);

    try {
      await onRemove?.(memberId);
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="space-y-3">
      {members.map((member) => (
        <div
          key={member.id}
          className="flex items-center justify-between rounded-xl border p-4 gap-2"
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              {member.name?.charAt(0)?.toUpperCase() || "?"}
            </div>

            <div className="min-w-0">
              <h3 className="truncate font-semibold text-gray-800">
                {member.name}
              </h3>

              <p className="truncate text-sm text-gray-500">
                {member.email}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <span className="shrink-0 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              {member.projectRole || member.role}
            </span>

            {onRemove && (
              <button
                type="button"
                onClick={() => handleRemove(member.email)}
                disabled={removingId === member.id}
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
              >
                {removingId === member.id
                  ? "Removing..."
                  : "Remove"}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MemberList;