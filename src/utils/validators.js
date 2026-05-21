export const isValidEmail = (
  email
) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
  );
};

export const isStrongPassword = (
  password
) => {
  return password.length >= 6;
};

export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    value === ""
  );
};