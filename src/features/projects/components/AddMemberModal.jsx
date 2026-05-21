import { useState } from "react";

import Modal from "../../../components/common/Modal";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";

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

  const handleSubmit = async (e) => {
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
  };

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
          <label className="text-sm font-medium text-gray-700">
            Project Role
          </label>

          <select
            name="projectRole"
            value={formData.projectRole}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="CONTRIBUTOR">CONTRIBUTOR</option>

            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Adding..." : "Add Member"}
        </Button>
      </form>
    </Modal>
  );
}

export default AddMemberModal;
