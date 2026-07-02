export const isAdmin = (user) => {
  return user?.role?.toUpperCase() === "ADMIN";
};

export const isMember = (user) => {
  return user?.role?.toUpperCase() === "MEMBER";
};

export const hasRole = (
  user,
  roles = []
) => {
  if (!user?.role) return false;
  const userRole = user.role.toUpperCase();
  return roles.map(r => r.toUpperCase()).includes(userRole);
};