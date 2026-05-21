function RoleBadge({ role }) {
  const styles = {
    ADMIN: "bg-purple-100 text-purple-700",

    MEMBER: "bg-green-100 text-green-700",

    INVITED: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[role]}`}
    >
      {role}
    </span>
  );
}

export default RoleBadge;
