import { useState, useCallback } from "react";

import Modal from "../../../components/common/Modal";
import Input from "../../../components/common/Input";
import ActionButton from "../../../components/shared/ActionButton";

import { addProjectMemberApi } from "../api/projectApi";

function AddMemberModal({ isOpen, onClose, projectId, onSuccess }) {
  const [formData, setFormData] = useState({
    email: "",
    projectRole: "CONTRIBUTOR",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      await addProjectMemberApi(projectId, formData);

      onSuccess?.();

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [projectId, formData, onSuccess, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Member">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Member Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter member email"
        />

        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--text-main)]">
            Project Role
          </label>

          <select
            name="projectRole"
            value={formData.projectRole}
            onChange={handleChange}
            className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-panel)] text-[var(--text-main)] px-4 py-3 outline-none transition focus:border-[var(--color-primary)]"
          >
            <option value="CONTRIBUTOR">CONTRIBUTOR</option>

            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <div className="flex justify-end mt-4">
          <ActionButton
            type="submit"
            disabled={isLoading}
            text={isLoading ? "Adding..." : "Add Member"}
            className="w-max px-8 h-[48px]"
          />
        </div>
      </form>
    </Modal>
  );
}

export default AddMemberModal;
