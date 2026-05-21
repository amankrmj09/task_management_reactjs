import { useState } from "react";

import Modal from "../../../components/common/Modal";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";

function AssignTaskModal({
  isOpen,
  onClose,
  members = [],
  onAssign,
}) {
  const [assigneeEmail, setAssigneeEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!assigneeEmail.trim()) return;

    onAssign?.(assigneeEmail);

    setAssigneeEmail("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Assign Task"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {members.length > 0 ? (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Select Member
            </label>

            <select
              value={assigneeEmail}
              onChange={(e) => setAssigneeEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="">
                Select member
              </option>

              {members.map((member) => (
                <option
                  key={member.id || member.email}
                  value={member.email}
                >
                  {member.name} ({member.email})
                </option>
              ))}
            </select>
          </div>
        ) : (
          <Input
            label="Assignee Email"
            type="email"
            value={assigneeEmail}
            onChange={(e) => setAssigneeEmail(e.target.value)}
            placeholder="Enter assignee email"
          />
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={!assigneeEmail.trim()}
        >
          Assign
        </Button>
      </form>
    </Modal>
  );
}

export default AssignTaskModal;