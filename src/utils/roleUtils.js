export const isAdmin = (user) => {
  return user?.role === "ADMIN";
};

export const isMember = (user) => {
  return user?.role === "MEMBER";
};

export const hasRole = (
  user,
  roles = []
) => {
  return roles.includes(user?.role);
};