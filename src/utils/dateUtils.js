export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const formatDateTime = (
  date
) => {
  return new Date(date).toLocaleString();
};

export const isOverdue = (date) => {
  return new Date(date) < new Date();
};