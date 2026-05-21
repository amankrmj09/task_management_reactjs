import { useState } from "react";

import Modal from "../../../components/common/Modal";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";

function InviteMemberModal({
  isOpen,
  onClose,
  onInvite,
}) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onInvite?.(email);

    setEmail("");

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Invite Member"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="member@example.com"
        />

        <Button
          type="submit"
          className="w-full"
        >
          Send Invite
        </Button>
      </form>
    </Modal>
  );
}

export default InviteMemberModal;